import { db, Students } from "astro:db";
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