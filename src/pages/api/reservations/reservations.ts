import { db, Reservations } from "astro:db";
import type { APIRoute } from "astro";
import type { Result, Reservations_type } from "@/consts/types";

export const GET = async () => {
  const reservations = await db.select().from(Reservations);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof reservations,
    table: "ServiceConsumption" as string,
    count: reservations.length as number,
  };

  reservations.length > 0 && ((result.data = reservations), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const POST: APIRoute = async (request) => {
  let result: Result = {
    data: "undefined" as string | Reservations_type,
    table: "ServiceConsumption" as string,
    count: 0,
  };
  let status: number = 404;
  try {
    const reservations: Reservations_type = await request.request.json();
    console.log(reservations);
    //@ts-ignore
    reservations.created_at = new Date(serviceConsumptions.created_at);
    //@ts-ignore
    reservations.updated_at = new Date(serviceConsumptions.updated_at);
    const response = await db.insert(Reservations).values(reservations).onConflictDoUpdate({
      target: Reservations.id,
      set: reservations,
    });
    //@ts-ignore
    // serviceConsumptions.id = String(response.columns);

    if (reservations) {
      status = 201;
      result.data = reservations;
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
