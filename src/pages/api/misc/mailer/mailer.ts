import type { APIRoute } from "astro";
import type { Result, ServicePredictionPost_type } from "@/consts/types";
import { mailer } from "@/services/mailer";


export const POST: APIRoute = async (params_raw) => {
  try {
    const params: ServicePredictionPost_type = await params_raw.request.json();
    const result: Result = await mailer(params);
    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};