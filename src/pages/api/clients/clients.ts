import { db, eq, Clients } from "astro:db";
import type { APIRoute } from "astro";
import type { Result, Client_type } from "@/consts/types";

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
    data: "undefined" as string | Client_type,
    table: "Clients" as string,
    count: 0,
  };
  let status: number = 404;
  try {
    const client: Client_type = await request.request.json();
    //@ts-ignore
    client.bornDate = new Date(client.bornDate);
    //@ts-ignore
    client.created_at = new Date();
    //@ts-ignore
    client.updated_at = new Date();
    console.log(client);
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

export const PUT = async (request: Request) => {
  const body = await request.request.json();
  
  const client = await db.update(Clients)
  .set(body)
  .where(eq(body.id, Clients.id));

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof client,
    table: "Teachers" as string,
    count: 0,
  };

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
};