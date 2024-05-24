import nodemailer from "nodemailer";
import type { APIRoute } from "astro";
import type { Result, ServicePredictionPost_type } from "@/consts/types";

const MAIL_PASS = import.meta.env.VITE_GOOGLE_MAIL_PASS;
const MAIL_HOST = import.meta.env.VITE_GOOGLE_MAIL_HOST;
const HOST = import.meta.env.VITE_GOOGLE_HOST;

export const POST: APIRoute = async (params_raw) => {
  try {
    const params: ServicePredictionPost_type = await params_raw.request.json();

    // Datos del POST
    let postData = {
      price: params.price,
      reserved_at: params.reserved_at,
      employee_name: params.teacher_name || params.student_name,
      message: 'hola mundo',
      receptor_email: params.client_email,
    };

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAIL_HOST,
        pass: MAIL_PASS,
      },
    });

    let mailOptions = {
      from: MAIL_HOST,
      to: postData.receptor_email,
      subject: "Asunto del correo",
      html: `<p>Nombre del empleado: ${postData.employee_name}</p>
             <p>Precio: ${postData.price}</p>
             <p>Reservado en: ${postData.reserved_at}</p>
             <p>Mensaje: ${postData.message}</p>
             <a href="${HOST}/profile">Mira tus reservas</a>
             <a href="${HOST}/courses">Algún problema? contacta con el admin</a>`,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8',
      },
    };

    await transporter.sendMail(mailOptions);

    console.log("Email enviado");

    let result: Result = {
      data: "undefined" as string,
      table: "Mailer" as string,
      count: 0,
    };

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