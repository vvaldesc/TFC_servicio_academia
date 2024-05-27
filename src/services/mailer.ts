import type { Result } from "@/consts/types";
import nodemailer from "nodemailer";
import type { mailParams } from "@/consts/types";

export default async function mailer(mailParams: mailParams): Promise<Result> {
  const MAIL_PASS = import.meta.env.VITE_GOOGLE_MAIL_PASS;
  const MAIL_HOST = import.meta.env.VITE_GOOGLE_MAIL_HOST;
  const HOST = import.meta.env.VITE_GOOGLE_HOST;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAIL_HOST,
        pass: MAIL_PASS,
      },
    });

    console.log({'receptor_email': mailParams.receptor_email, 'message': mailParams.message})

    let mailOptions = {
      from: MAIL_HOST,
      to: mailParams.receptor_email,
      subject: mailParams.subject,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #fff; border-radius: 5px; border: 1px solid #eee;">
          <h2 style="color: #b43e8f;">Hola,</h2>
          <p>${mailParams.message}</p>
          <div style="margin: 20px 0;">
              <a href="${HOST}/profile" style="background-color: #b43e8f; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Mira tus reservas</a>
          </div>
          <p>Si tienes algún problema, no dudes en contactar con nosotros:</p>
          <div>
              <a href="${HOST}/courses" style="background-color: #b43e8f; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Contacta con el admin</a>
          </div>
          <p style="color: #999; font-size: 0.8em;">Gracias por usar nuestro servicio.</p>
      </div>
      `,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    };

    await transporter.sendMail(mailOptions);

    console.log("Email enviado");

    let result: Result = {
      data: "undefined" as string,
      table: "Mailer" as string,
      count: 0,
    };

    return result;
  } catch (error) {
    console.error(error);

    let result: Result = {
      data: "error mailer" as string,
      table: "Mailer" as string,
      count: 0,
    };

    return result;
  }
  // Datos del POST
}
