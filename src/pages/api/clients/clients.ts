import { db, Clients } from "astro:db";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const clients = await db.select().from(Clients);

  let status: number = 404;
  let result: Result = {
    data: "No hay clientes" as string | typeof clients,
    table: "Clients" as string,
    count: clients.length as number,
  };
  
  clients.length > 0 && ((result.data = clients), (status = 200));

  return new Response(JSON.stringify({result}), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};