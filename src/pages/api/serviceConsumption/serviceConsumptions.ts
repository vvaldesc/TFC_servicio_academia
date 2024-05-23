import { db, ServiceConsumption } from "astro:db";
import type { APIRoute } from "astro";
import type { Result, ServiceConsumption_type } from "@/consts/types";

export const GET = async () => {
  const serviceConsumptions = await db.select().from(ServiceConsumption);
  console.log(serviceConsumptions);
  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof serviceConsumptions,
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

export const POST: APIRoute = async (request) => {
  let result: Result = {
    data: "undefined" as string | ServiceConsumption_type,
    table: "ServiceConsumption" as string,
    count: 0,
  };
  let status: number = 404;
  try {
    const serviceConsumptions: ServiceConsumption_type = await request.request.json();
    //@ts-ignore
    serviceConsumptions.created_at = new Date();
    //@ts-ignore
    serviceConsumptions.updated_at = new Date();
    //@ts-ignore
    serviceConsumptions.reserved_at = new Date(serviceConsumptions.reserved_at); // Corregido aquí
    console.log(serviceConsumptions);

    const response = await db.insert(ServiceConsumption).values(serviceConsumptions).onConflictDoUpdate({
      target: ServiceConsumption.id,
      set: serviceConsumptions,
    });
    //@ts-ignore
    // serviceConsumptions.id = String(response.columns);

    if (serviceConsumptions) {
      status = 201;
      result.data = response;
      result.table= "ServiceConsumption";
      result.count = 1;
    }

    return new Response(JSON.stringify({ result }), {
      status: status,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    //@ts-ignore
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};