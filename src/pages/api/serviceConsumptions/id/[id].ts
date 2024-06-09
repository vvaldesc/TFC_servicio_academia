import { db, ServiceConsumption, eq } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET: APIRoute = async ({ params }) => {
	const { id } = params

  const serviceConsumption = await db
    .select()
    .from(ServiceConsumption)
    .where(eq(ServiceConsumption.id, Number(id)));

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof serviceConsumption,
    table: "ServiceConsumptions" as string,
    count: serviceConsumption.length as number,
  };
  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  serviceConsumption.length == 1 && ((result.data = serviceConsumption), (status = 200));


  // Retorna la respuesta con el resultado de la consulta
  return new Response(JSON.stringify({result}), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};