import { db, Clients, Students,Teachers } from "astro:db";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const clients = await db.select().from(Teachers);

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof clients,
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