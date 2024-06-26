import { db, Teachers, Employees, eq } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const teachers = await db.select().from(Teachers)
  .leftJoin(Employees, eq(Teachers.id, Employees.teacher_id))

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof teachers,
    table: "Teachers" as string,
    count: teachers.length as number,
  };

  teachers.length > 0 && ((result.data = teachers), (status = 200));

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
  
  const teacher = await db.insert(Teachers).values(body).onConflictDoUpdate({
    target: Teachers.id,
    set: body,
  });

  let status: number = 404;
  let result: Result = {
    data: teacher as string | typeof teacher,
    table: "Teachers" as string,
    count: 0,
  };

  if (teacher) {
    status = 201;
    result.data = teacher;
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
  
  const teacher = await db.update(Teachers)
  .set(body)
  .where(eq(body.id, Teachers.id));

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof teacher,
    table: "Teachers" as string,
    count: 0,
  };

  if (teacher) {
    status = 201;
    result.data = teacher;
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};