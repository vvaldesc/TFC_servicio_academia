import { db, Clients } from "astro:db";
import type { APIRoute } from "astro";
import type { Result, Client } from "@/consts/types";

export const GET = async () => {
  const clients = await db.select().from(Clients);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof clients,
    table: "Clients" as string,
    count: clients.length as number,
  };

  clients.length > 0 && ((result.data = clients), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const POST: APIRoute = async (request) => {
  let result: Result = {
    data: "undefined" as string | Client,
    table: "Clients" as string,
    count: 0,
  };
  let status: number = 404;
  try {
    const client: Client = await request.request.json();
    console.log(client);
    //@ts-ignore
    client.bornDate = new Date(client.bornDate);
    //@ts-ignore
    client.created_at = new Date(client.created_at);
    //@ts-ignore
    client.updated_at = new Date(client.updated_at);
    const response = await db.insert(Clients).values(client).onConflictDoUpdate({
      target: Clients.id,
      set: client,
    });
    //@ts-ignore
    client.id = String(response.lastInsertRowid);

    if (client) {
      status = 201;
      result.data = client;
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
