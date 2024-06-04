import { db, Disciplines } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const disciplines = await db.select().from(Disciplines);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof disciplines,
    table: "Disciplines" as string,
    count: disciplines.length as number,
  };

  disciplines.length > 0 && ((result.data = disciplines), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};