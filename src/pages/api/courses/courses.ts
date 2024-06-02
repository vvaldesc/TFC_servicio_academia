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