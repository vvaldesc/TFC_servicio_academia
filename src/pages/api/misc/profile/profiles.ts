import { db, sql } from "astro:db";
//import { sql } from 'drizzle-orm' 

import type { APIRoute } from "astro";
import type { Result, SqlProfileByEmail } from "@/consts/types";

export const GET: APIRoute = async ( ) => {

    const query = sql`
    SELECT id, name, surname, email, phone_number, address, city, borndate, created_at, updated_At, username, image, active, null as 'matriculation_number', null as 'employed', null as 'DNI', null as 'educational_level', null as 'is_admin', 'Clients' AS tableName FROM Clients
    UNION
    SELECT id, name, surname, email, phone_number, address, city, borndate, created_at, updated_At, username, image, active, null as 'matriculation_number', null as 'employed', null as 'DNI', null as 'educational_level', is_admin, 'Teachers' AS tableName FROM Teachers
    UNION
    SELECT id, name, surname, email, phone_number, address, city, borndate, created_at, updated_At, username, image, active, matriculation_number, employed, DNI, educational_level, null as 'is_admin', 'Students' AS tableName FROM Students;
  `;
  //@ts-ignore
  const sqlResult: Data = await db.run(query) as Data;

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | SqlProfileByEmail,
    table: "Clients_Teachers_Students" as string,
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
