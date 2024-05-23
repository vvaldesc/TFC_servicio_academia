import { db, eq, Employees, ServiceConsumption, count, alias, ne } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const POST: APIRoute = async (request) => {
  let dateTime: Date = await request.request.json();
  console.log(new Date(dateTime.date));
  dateTime = new Date(dateTime.date);

  let status: number = 404;
  let result: Result = {
    data: "undefined",
    table: "Employees",
    count: 0,
  };

  const employees = await db
  .select({
      id: Employees.id,
      services_at_time: count(ServiceConsumption.created_at),
  })
  .from(Employees)
  .fullJoin(
    ServiceConsumption,
    eq(ServiceConsumption.employee_id, Employees.id)
  )
  .groupBy(Employees.id)
  .where(eq(ServiceConsumption.reserved_at, dateTime))
  .orderBy(Employees.id);

  if (employees.length > 0) {
    result.data = employees;
    result.count = employees.length;
    status = 200;
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};
