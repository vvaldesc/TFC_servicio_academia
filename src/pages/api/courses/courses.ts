import { db, Courses } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const courses = await db.select().from(Courses);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof courses,
    table: "Courses" as string,
    count: courses.length as number,
  };

  courses.length > 0 && ((result.data = courses), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const POST = async (request: Request) => {
  if (typeof request.request.json !== 'function') {
    throw new Error('request.json is not a function');
  }
  const body = await request.request.json();
  console.log(body);
  
  // Assuming the body contains the necessary data for creating a new course

  const newCourse = await db.insert(Courses).values(body).onConflictDoUpdate({
    target: Courses.acronym,
    set: body,
  });

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof newCourse,
    table: "Courses" as string,
    count: 0,
  };

  if (newCourse) {
    status = 201;
    result.data = newCourse;
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};