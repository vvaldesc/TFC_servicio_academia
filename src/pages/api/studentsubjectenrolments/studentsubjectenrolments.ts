import {
  db,
  StudentSubjectEnrolments,
  Subjects,
  Students,
  Courses,
  Teachers,
  eq,
} from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const stundentsubjectenrollments = await db
    .select()
    .from(StudentSubjectEnrolments)
    .leftJoin(Subjects, eq(StudentSubjectEnrolments.subject_acronym, Subjects.acronym))
    .leftJoin(Students, eq(StudentSubjectEnrolments.student_id, Students.id))
    .leftJoin(Courses, eq(Subjects.course_id, Courses.acronym))
    .leftJoin(Teachers, eq(Subjects.teacher_id, Teachers.id));

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof stundentsubjectenrollments,
    table: "StudentSubjectEnrolments" as string,
    count: stundentsubjectenrollments.length as number,
  };

  stundentsubjectenrollments.length > 0 &&
    ((result.data = stundentsubjectenrollments), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const POST = async (request: Request) => {
  const body = await request.request.json();
  console.log(body);
  body.date = new Date(body.date);
  
  // Assuming the body contains the necessary data for creating a new course

  const enrolment = await db.insert(StudentSubjectEnrolments).values(body).onConflictDoUpdate({
    target: StudentSubjectEnrolments.id,
    set: body,
  });

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof enrolment,
    table: "StudentSubjectFaults" as string,
    count: 0,
  };

  if (enrolment) {
    status = 201;
    result.data = enrolment;
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};
