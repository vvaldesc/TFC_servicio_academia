import {
    db,
    StudentSubjectFaults,
    Subjects,
    Students,
    Courses,
    Teachers,
    eq,
  } from "astro:db";
  import type { APIRoute } from "astro";
  import type { Result } from "@/consts/types";
  
  export const GET = async () => {
    const studentsubjectfaults = await db
      .select()
      .from(StudentSubjectFaults)
      .leftJoin(Subjects, eq(StudentSubjectFaults.subject_acronym, Subjects.acronym))
      .leftJoin(Students, eq(StudentSubjectFaults.student_id, Students.id))
      .leftJoin(Courses, eq(Subjects.course_id, Courses.acronym))
      .leftJoin(Teachers, eq(Subjects.teacher_id, Teachers.id));
  
    let status: number = 404;
    let result: Result = {
      data: "undefined" as string | typeof studentsubjectfaults,
      table: "StudentSubjectFaults" as string,
      count: studentsubjectfaults.length as number,
    };
  
    studentsubjectfaults.length > 0 &&
      ((result.data = studentsubjectfaults), (status = 200));
  
    return new Response(JSON.stringify({ result }), {
      status: status,
      headers: {
        "content-type": "application/json",
      },
    });
  };
  