import { db, eq, Employees, Teachers, Students, StudentSubjectEnrolments, Courses, Subjects, alias } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {


  const employees
  = 
  await db.select()
  .from(Employees)
  .leftJoin(Teachers, eq(Employees.teacher_id, Teachers.id))
  .leftJoin(Subjects, eq(Teachers.id, Subjects.teacher_id))
  .leftJoin(alias(Courses, 'TeacherCourses'), eq(Subjects.course_id, 'TeacherCourses.acronym'))
  .leftJoin(Students, eq(Employees.student_id, Students.id))
  .leftJoin(StudentSubjectEnrolments, eq(Students.id, StudentSubjectEnrolments.student_id))
  .leftJoin(alias(Subjects, 'StudentSubjects'), eq(StudentSubjectEnrolments.subject_acronym, 'Subjects2.acronym'))
  .leftJoin(alias(Courses, 'StudentCourses'), eq('StudentSubjects.course_id', 'StudentCourses.acronym'))
  .orderBy(Employees.id);

  const combinedEmployees = employees.map(employee => {
    return {
      ...employee.Employees,
      teacher: {
        ...employee.Teachers,
        subject: employee.Subjects,
        course: employee.TeacherCourses
      },
      student: {
        ...employee.Students,
        subjectEnrolment: employee.StudentSubjectEnrolments,
        subject: employee.StudentSubjects,
        course: employee.StudentCourses
      }
    };
  });

  let status: number = 404;
  let result: Result = {
    data: "undefined",
    table: "Employees",
    count: 0,
  };

  if (employees.length > 0) {
    result.data = combinedEmployees;
    result.count = employees.length;
    status = 200;
  }
  
  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const POST: APIRoute = async (request) => {
  let result: Result = {
    data: "undefined" as string | Client_type,
    table: "Employees" as string,
    count: 0,
  };
  let status: number = 404;
  try {
    const employees: Client_type = await request.request.json();
    //@ts-ignore
    employees.bornDate = new Date(client.bornDate);
    //@ts-ignore
    employees.created_at = new Date();
    //@ts-ignore
    employees.updated_at = new Date();
    console.log(employees);
    const response = await db.insert(Employees).values(employees).onConflictDoUpdate({
      target: Employees.id,
      set: employees,
    });
    //@ts-ignore
    client.id = String(response.lastInsertRowid);

    if (employees) {
      status = 201;
      result.data = employees;
    }

    return new Response(JSON.stringify({ result }), {
      status: status,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    //@ts-ignore
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};
