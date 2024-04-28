//import type { APIRoute } from "astro";
import { db, Clients } from "astro:db";

//api/clientes/id
export const GET = async () => {
  const clients = await db.select().from(Clients);
  
  let status: number = 404;
  let msg: string | typeof clients = "";
  
  clients.length == 0 ? msg = "No hay clientes" : (msg = clients, status = 200);

  return new Response(JSON.stringify({ result: msg, count: clients.length }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};
