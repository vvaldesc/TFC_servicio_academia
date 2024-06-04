import { db, Subjects } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const subjects = await db.select().from(Subjects);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof subjects,
    table: "Subjects" as string,
    count: subjects.length as number,
  };

  subjects.length > 0 && ((result.data = subjects), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const POST = async (request: Request) => {
  const { body } = await request.request.json();
  
  // Assuming the body contains the necessary data for creating a new course

  const subjects = await db.insert(Subjects).values(body).onConflictDoUpdate({
    target: Subjects.acronym,
    set: body,
  });

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof subjects,
    table: "Subjects" as string,
    count: 0,
  };

  if (subjects) {
    status = 201;
    result.data = subjects;
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};