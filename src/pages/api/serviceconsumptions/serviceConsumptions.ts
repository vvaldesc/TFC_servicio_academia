import { db, ServiceConsumption } from "astro:db";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const serviceConsumptions = await db.select().from(ServiceConsumption);
  
  let status: number = 404;
  let result : Result = {
    data: "No hay clientes" as string | typeof serviceConsumptions,
    table: "ServiceConsumption" as string,
    count: serviceConsumptions.length as number,
  };  
  serviceConsumptions.length > 0 && ((result.data = serviceConsumptions), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};