import { db, Students, Subjects, Employees, eq } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const students = await db.select().from(Students)
  .leftJoin(Employees, eq(Students.id, Employees.teacher_id))

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof students,
    table: "Students" as string,
    count: students.length as number,
  };

  students.length > 0 && ((result.data = students), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const POST = async (request: Request) => {
  const { body } = await request.json();
  
  // Assuming the body contains the necessary data for creating a new course

  const student = await db.insert(Students).values(body).onConflictDoUpdate({
    target: Students.id,
    set: body,
  });

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof student,
    table: "Students" as string,
    count: 0,
  };

  if (student) {
    status = 201;
    result.data = student;
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};