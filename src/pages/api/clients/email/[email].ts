// Importa db y Clients desde "astro:db"
import { db, Clients, eq } from "astro:db";
import type { APIRoute } from "astro";

// api/clientes/[id].ts
export const GET: APIRoute = async ({ params }) => {
	const { email } = params

  const client = await db
    .select()
    .from(Clients)
    .where(eq(Clients.email, String(email)));

  let status: number = 404;
  let msg: string | typeof client = "";

  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  if (client.length == 0) {
    msg = "No hay clientes";
  } else {
    msg = client;
    status = 200;
  }

  // Retorna la respuesta con el resultado de la consulta
  return new Response(JSON.stringify({ result: msg, count: client.length }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};
