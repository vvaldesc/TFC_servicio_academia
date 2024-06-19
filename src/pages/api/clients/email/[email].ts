import { db, Clients, eq } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET: APIRoute = async ({ params }) => {
	const { email } = params

  const client = await db
    .select()
    .from(Clients)
    .where(eq(Clients.email, email as string));

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof client,
    table: "Clients" as string,
    count: client.length as number,
  };
  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  client.length == 1 && ((result.data = client), (status = 200));


  // Retorna la respuesta con el resultado de la consulta
  return new Response(JSON.stringify({result}), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
	const { email } = params

  const client = await db
    .delete(Clients)
    .where(eq(Clients.email, email as string));

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof client,
    table: "Clients" as string,
    count: 1 as number,
  };
  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  1 == 1 && ((result.data = client), (status = 200));


  // Retorna la respuesta con el resultado de la consulta
  return new Response(JSON.stringify({result}), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};