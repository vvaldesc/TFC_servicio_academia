//import type { APIRoute } from "astro";
import { db, Cliente } from "astro:db";

//api/clientes/id
export const GET = async () => {
  const Clientes = await db.select().from(Cliente);
    return new Response(JSON.stringify({ msg: Clientes }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  };