import { db, Employees, EmployeePayrolls, eq, sql } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {

    const details = await db.select()
    .from(EmployeePayrolls);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof details,
    table: "Subjects" as string,
    count: 0 as number,
  };

  if (details) {
    status = 200;
    result = {
      data: details,
      table: "details" as string,
      count: details.length as number,
    };
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};