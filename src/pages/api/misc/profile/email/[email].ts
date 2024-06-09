import { db, sql } from "astro:db";
//import { sql } from 'drizzle-orm' 

import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET: APIRoute = async ({ params }) => {
	const {email} = params

  const query = sql`
  SELECT id, 'Clients' AS tableName FROM Clients WHERE email = ${sql.param(email)}
  UNION
  SELECT id, 'Teachers' AS tableName FROM Teachers WHERE email = ${sql.param(email)}
  UNION
  SELECT id, 'Students' AS tableName FROM Students WHERE email = ${sql.param(email)};
`;
  //@ts-ignore
  const sqlResult: Data = await db.run(query) as Data;
  console.log(sqlResult)

  const data = {id: sqlResult.rows[0].id, tableName: sqlResult.rows[0].tableName};

  let status: number = 404;
  let result: Result = {
    data: sqlResult ? data : "undefined" as string | any[],
    table: sqlResult.rows[0][1] as string,
    count: sqlResult.rows.length as number,
  };
  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  result.count == 1 && (status = 200);


  // Retorna la respuesta con el resultado de la consulta
  return new Response(JSON.stringify({result}), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const PUT: APIRoute = async ({ params }) => {
  const { email } = params;

  // Actualiza la columna 'active' en cada tabla
  const queryClients = sql`UPDATE Clients SET active = false WHERE email = ${sql.param(email)}`;
  const queryTeachers = sql`UPDATE Teachers SET active = false WHERE email = ${sql.param(email)}`;
  const queryStudents = sql`UPDATE Students SET active = false WHERE email = ${sql.param(email)}`;

  // Ejecuta las consultas
  await db.run(queryClients);
  await db.run(queryTeachers);
  await db.run(queryStudents);

  // Retorna una respuesta indicando que la operación fue exitosa
  return new Response(JSON.stringify({ message: 'User deactivated successfully' }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};