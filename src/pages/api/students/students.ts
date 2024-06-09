import { db, eq, Students } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const students = await db.select().from(Students);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof Students,
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
  const body = await request.request.json();

  body.created_at = new Date();
  body.updated_at = new Date();
  body.bornDate && (body.bornDate = new Date(body.bornDate));
  
  const student = await db.insert(Students).values(body).onConflictDoUpdate({
    target: Students.id,
    set: body,
  });


  let status: number = 404;
  let result: Result = {
    data: student as string | typeof student,
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

export const PUT = async (request: Request) => {
  const body = await request.request.json();
  
  const student = await db.update(Students)
  .set(body)
  .where(eq(body.id, Students.id));

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