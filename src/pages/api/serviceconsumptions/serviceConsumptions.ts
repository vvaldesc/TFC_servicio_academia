import { db, ServiceConsumption } from "astro:db";

export const GET = async () => {
  const serviceConsumption = await db.select().from(ServiceConsumption);
  
  let status: number = 404;
  let msg: string | typeof serviceConsumption = "";
  
  serviceConsumption.length == 0 ? msg = "No hay clientes" : (msg = serviceConsumption, status = 200);

  return new Response(JSON.stringify({ result: msg, count: serviceConsumption.length }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};
