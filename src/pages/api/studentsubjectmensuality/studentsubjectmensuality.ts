import { db, StudentSubjectMensuality } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const studentSubjectMensuality = await db.select().from(StudentSubjectMensuality);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof studentSubjectMensuality,
    table: "studentSubjectMensuality" as string,
    count: studentSubjectMensuality.length as number,
  };

  studentSubjectMensuality.length > 0 && ((result.data = studentSubjectMensuality), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};