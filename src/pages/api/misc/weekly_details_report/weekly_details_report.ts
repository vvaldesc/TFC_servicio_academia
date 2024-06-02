import { db, Employees, ServiceConsumption, sum, eq, sql } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  
  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof details,
    table: "ServiceConsumption" as string,
    count: 0 as number,
  };

  const details = await db.select({
    day_of_week: sql`strftime('%w', ServiceConsumption.reserved_at)`,
    count: sql`COUNT(*)`
  })
  .from(ServiceConsumption)
  .where(sql`ServiceConsumption.reserved_at 
  BETWEEN datetime('now', 'weekday 1', '-7 days') 
  AND datetime('now', 'weekday 0', '+1 day') 
  AND ServiceConsumption.state <> 'Cancelled'`)
  .groupBy(sql`strftime('%w', ServiceConsumption.reserved_at)`);


  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const processedDetails = daysOfWeek.map((day, index) => {
    const detail = details.find(d => Number(d.day_of_week) === index);
    return {
      day_of_week: day,
      count: detail ? detail.count : 0
    };
  });
  
  if (processedDetails) {
    status = 200;
    result = {
      data: processedDetails,
      table: "details",
      count: processedDetails.length,
    };
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};