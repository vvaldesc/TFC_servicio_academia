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
