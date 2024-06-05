import { db, Teachers, eq } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET: APIRoute = async ({ params }) => {
	const { id } = params

  const teacher = await db
    .select()
    .from(Teachers)
    .where(eq(Teachers.id, Number(id)));

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof teacher,
    table: "Teachers" as string,
    count: teacher.length as number,
  };
  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  teacher.length == 1 && ((result.data = teacher), (status = 200));


  // Retorna la respuesta con el resultado de la consulta
  return new Response(JSON.stringify({result}), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ params }) => {
	const { id } = params

  // const teacher = await db
  //   .delete(Teachers)
  //   .where(eq(Teachers.id, Number(id)));

  const teacher = await db.update(Teachers)
  .set({active: false})

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof teacher,
    table: "Teachers" as string,
    count: teacher.rowsAffected as number,
  };
  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  teacher.rowsAffected == 1 && ((result.data = teacher), (status = 200));

  // Retorna la respuesta con el resultado de la consulta
  return new Response(JSON.stringify({result}), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};