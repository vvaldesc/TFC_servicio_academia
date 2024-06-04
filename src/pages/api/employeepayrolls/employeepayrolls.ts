import { db, Employees, EmployeePayrolls, eq, sql } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {

    const employeepayrolls = await db.select()
    .from(EmployeePayrolls);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof employeepayrolls,
    table: "Subjects" as string,
    count: 0 as number,
  };

  if (employeepayrolls) {
    status = 200;
    result = {
      data: employeepayrolls,
      table: "EmployeePayrolls" as string,
      count: employeepayrolls.length as number,
    };
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};