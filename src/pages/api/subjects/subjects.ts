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