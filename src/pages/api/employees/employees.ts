import { sql ,db, eq, Employees, Teachers, Students, ServiceConsumption, Courses, Subjects, StudentSubjectEnrolments, countDistinct, alias } from "astro:db";
import type { APIRoute } from "astro";
import type { Result, Client_type } from "@/consts/types";

export const GET = async () => {
  const Subjects2 = alias(Subjects, "Subjects2")
  const Courses2 = alias(Courses, "Courses2")

  const employees
  = 
  await db.select({
    id: Employees.id,
    teacher_id: Employees.teacher_id,
    student_id: Employees.student_id,
    social_security: Employees.social_security,
    salary: Employees.salary,
    rating: sql`ROUND(AVG(ServiceConsumption.rating))`,
      teacher: {
      id: Teachers.id,
      is_admin: Teachers.is_admin,
      name: Teachers.name,
      surname: Teachers.surname,
      email: Teachers.email,
      phone_number: Teachers.phone_number,
      address: Teachers.address,
      city: Teachers.city,
      bornDate: Teachers.bornDate,
      created_at: Teachers.created_at,
      updated_at: Teachers.updated_at,
      username: Teachers.username,
      confirmed: Teachers.confirmed,
      image: Teachers.image,
      active: Teachers.active,
      disciplines: sql`GROUP_CONCAT(DISTINCT ${Courses.discipline})`,
      turns: sql`GROUP_CONCAT(DISTINCT ${Courses.turn})`,
    },
    student: {
      id: Students.id,
      matriculation_number: Students.matriculation_number,
      DNI: Students.DNI,
      employed: Students.employed,
      educational_level: Students.educational_level,
      name: Students.name,
      surname: Students.surname,
      email: Students.email,
      phone_number: Students.phone_number,
      address: Students.address,
      city: Students.city,
      bornDate: Students.bornDate,
      created_at: Students.created_at,
      updated_at: Students.updated_at,
      username: Students.username,
      confirmed: Students.confirmed,
      image: Students.image,
      active: Students.active,
      disciplines: sql`GROUP_CONCAT(DISTINCT ${Courses2.discipline})`,
      turns: sql`GROUP_CONCAT(DISTINCT ${Courses2.turn})`,
      count: countDistinct(Subjects2.acronym),
    }
  })
  .from(Employees)
  .leftJoin(ServiceConsumption, eq(Employees.id, ServiceConsumption.employee_id))
  .leftJoin(Teachers, eq(Employees.teacher_id, Teachers.id))
  .leftJoin(Subjects, eq(Teachers.id, Subjects.teacher_id))
  .leftJoin(Courses, eq(Subjects.course_id, Courses.acronym))
  .leftJoin(Students, eq(Employees.student_id, Students.id))
  .leftJoin(StudentSubjectEnrolments, eq(Students.id, StudentSubjectEnrolments.student_id))
  .leftJoin(Subjects2, eq(Subjects2.acronym, StudentSubjectEnrolments.subject_acronym))
  .leftJoin(Courses2, eq(Subjects2.course_id, Courses2.acronym))
  .groupBy(Employees.id)
  .orderBy(Employees.id)

  const combinedEmployees = employees.map(employee => {
    let role = employee.teacher_id ? "teacher" : (employee.student_id ? "student" : null);
    return {
      ...employee,
      role: role,
      rating: employee.rating,
    teacher: employee.teacher ? {
      ...employee.teacher,
      disciplines: typeof employee.teacher.disciplines === 'string' ? employee.teacher.disciplines.split(",") : [],
      turns: typeof employee.teacher.turns === 'string' ? employee.teacher.turns.split(",") : [],
    } : null,
    student: employee.student ? {
      ...employee.student,
      disciplines: typeof employee.student.disciplines === 'string' ? employee.student.disciplines.split(",") : [],
      turns: typeof employee.student.turns === 'string' ? employee.student.turns.split(",") : [],
    } : null,
    };
  });

  combinedEmployees

  let status: number = 404;
  let result: Result = {
    data: "undefined",
    table: "Employees",
    count: 0,
  };

  if (employees.length > 0) {
    result.data = combinedEmployees;
    result.count = combinedEmployees.length;
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
