import { db, Students, eq } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET: APIRoute = async ({ params }) => {
	const { id } = params

  const student = await db
    .select()
    .from(Students)
    .where(eq(Students.id, Number(id)));

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof student,
    table: "Students" as string,
    count: student.length as number,
  };
  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  student.length == 1 && ((result.data = student), (status = 200));


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

  // const student = await db
  //   .delete(Students)
  //   .where(eq(Students.id, Number(id)));

  const student = await db.update(Students)
  .set({active: false})

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof student,
    table: "Students" as string,
    count: student.rowsAffected as number,
  };
  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  student.rowsAffected == 1 && ((result.data = student), (status = 200));

  // Retorna la respuesta con el resultado de la consulta
  return new Response(JSON.stringify({result}), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};