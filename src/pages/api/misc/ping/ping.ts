import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET: APIRoute = async () => {
    let status: number = 200;
    let result: Result = {
      data: "ping",
      table: "Undefined",
      count: 0,
    };
  
    return new Response(JSON.stringify({ result }), {
      status: status,
      headers: {
        "content-type": "application/json",
      },
    });
  };