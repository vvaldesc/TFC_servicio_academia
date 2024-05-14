import { db, Clients,Students,Teachers , eq,sql } from "astro:db";
//import { sql } from 'drizzle-orm' 

import type { APIRoute } from "astro";
import type { Result, SqlProfileByEmail } from "@/consts/types";

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

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | SqlProfileByEmail,
    table: "Clients" as string,
    count: 1 as number,
  };
  // Verifica si se encontraron clientes y actualiza el mensaje y el estado correspondientemente
  result.count == 1 && ((result.data = sqlResult), (status = 200));


  // Retorna la respuesta con el resultado de la consulta
  return new Response(JSON.stringify({result}), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};
