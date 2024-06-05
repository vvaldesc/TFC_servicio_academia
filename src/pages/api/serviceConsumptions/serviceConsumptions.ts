import { db, ServiceConsumption, Clients, Services, Employees, Teachers, Students, avg, eq, desc, lt, and, not } from "astro:db";
import type { APIRoute } from "astro";
import type { Result, ServiceConsumption_type, mailParams } from "@/consts/types";
 import mailer from "../../../services/mailer";

export const GET: APIRoute = async () => {
  const serviceConsumptions = await db.select({
    id: ServiceConsumption.id,
    client_id: Clients.id,
    teacher_id: Teachers.id,
    student_id: Students.id,
    employee_id: Employees.id,
    delay: ServiceConsumption.delay,
    service_id: ServiceConsumption.id,
    service_name: Services.name,
    service_price: Services.price,
    service_discipline: Services.discipline,
    created_at: ServiceConsumption.created_at,
    updated_at: ServiceConsumption.updated_at,
    reserved_at: ServiceConsumption.reserved_at,
    rating: avg(ServiceConsumption.rating),
    price: ServiceConsumption.price,
    weather: ServiceConsumption.weather,
    client_name: Clients.name,
    teacher_name: Teachers.name,
    student_name: Students.name,
    client_surname: Clients.surname,
    teacher_surname: Teachers.surname,
    student_surname: Students.surname,
    client_address: Clients.address,
    teacher_address: Teachers.address,
    student_address: Students.address,
    client_phone_number: Clients.phone_number,
    teacher_phone_number: Teachers.phone_number,
    student_phone_number: Students.phone_number,
    client_email: Clients.email,
    teacher_email: Teachers.email,
    student_email: Students.email,
    employee_salary: Employees.salary,
    state: ServiceConsumption.state,
  })
  .from(ServiceConsumption)
  .leftJoin(Clients, eq(ServiceConsumption.client_id, Clients.id))
  .leftJoin(Employees, eq(ServiceConsumption.employee_id, Employees.id))
  .leftJoin(Services, eq(ServiceConsumption.service_id, Services.id))
  .leftJoin(Teachers, eq(Employees.teacher_id, Teachers.id))
  .leftJoin(Students, eq(Employees.student_id, Students.id))
  .groupBy(ServiceConsumption.id)
  .orderBy(ServiceConsumption.id, desc(ServiceConsumption.id));

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof serviceConsumptions,
    table: "ServiceConsumption" as string,
    count: serviceConsumptions.length as number,
  };

  serviceConsumptions.length > 0 && ((result.data = serviceConsumptions), (status = 200));

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const POST: APIRoute = async (request) => {
  let result: Result = {
    data: "undefined" as string | ServiceConsumption_type,
    table: "ServiceConsumption" as string,
    count: 0,
  };
  let status: number = 404;
  try {
    const serviceConsumptions: ServiceConsumption_type = await request.request.json();
    console.log({'serviceConsumptions':serviceConsumptions});

    const dateActual = new Date();
    dateActual.setHours(dateActual.getHours() + 2);
    console.log({'dateActual':dateActual});

    //@ts-ignore
    serviceConsumptions.created_at = dateActual;
    //@ts-ignore
    serviceConsumptions.updated_at = dateActual;
    //@ts-ignore
    serviceConsumptions.reserved_at = new Date(serviceConsumptions.reserved_at); // Corregido aquí

    const response = await db.insert(ServiceConsumption).values(serviceConsumptions).onConflictDoUpdate({
      target: ServiceConsumption.id,
      set: serviceConsumptions,
    });
    //@ts-ignore
    // serviceConsumptions.id = String(response.columns);

    console.log({'response': response});

    if (response) {
      status = 201;
      result.data = response;
      result.table= "ServiceConsumption";
      result.count = 1;

      const mailParamsCliente: mailParams = {
        price: serviceConsumptions.price,
        reserved_at: serviceConsumptions.reserved_at,
        message: `Buenas ${serviceConsumptions.client_name} su cita con ${serviceConsumptions.employee_name} para ${serviceConsumptions.service_name} ha sido reservada para el día ${serviceConsumptions.reserved_at.toLocaleDateString()} a las ${serviceConsumptions.reserved_at.toLocaleTimeString()}`,
        subject: 'Tu reserva ha sido realizada con éxito',
        employee_name: serviceConsumptions.employee_name,
        employee_mail: serviceConsumptions.employee_mail,
        client_name: serviceConsumptions.client_email,
        client_email: serviceConsumptions.client_name,
        receptor_email: serviceConsumptions.client_email,
        feedback: true,
      };

      const mailParamsEployee: mailParams = {
        price: serviceConsumptions.price,
        reserved_at: serviceConsumptions.reserved_at,
        message: `Buenas ${serviceConsumptions.employee_name} tiene cita para ${serviceConsumptions.service_name} con ${serviceConsumptions.client_name} el día ${serviceConsumptions.reserved_at.toLocaleDateString()} a las ${serviceConsumptions.reserved_at.toLocaleTimeString()}`,
        subject: 'Tienes una nueva cita',
        employee_name: serviceConsumptions.employee_name,
        employee_mail: serviceConsumptions.employee_mail,
        client_name: serviceConsumptions.client_email,
        client_email: serviceConsumptions.client_name,
        receptor_email: serviceConsumptions.employee_mail,
        feedback: true,
      };

      console.log(mailParamsCliente);
      console.log(mailParamsEployee);

      mailer(mailParamsCliente);
      mailer(mailParamsEployee);
    }

    return new Response(JSON.stringify({ result }), {
      status: status,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    //@ts-ignore
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};

export const PUT: APIRoute = async (request) => {
  let result: Result = {
    data: "undefined" as string | ServiceConsumption_type,
    table: "ServiceConsumption" as string,
    count: 0,
  };
  let status: number = 404;
  try {
    const updateParams: any = await request.request.json();

    let dateISO = new Date();
    dateISO.setHours(dateISO.getHours() + 2);
    
    let datesISO_check = new Date(dateISO.getTime());
    datesISO_check.setMinutes(datesISO_check.getMinutes() - 30);

    let response;
    if (updateParams.cronUpdate) {
      response = await db.update(ServiceConsumption)
      .set({state: 'Completed',updated_at: dateISO as Date})
      .where(
        and(
          lt(ServiceConsumption.reserved_at, datesISO_check as Date),
          not(eq(ServiceConsumption.state, 'Completed'))
        )
      );
    } else if (updateParams.id) {
      console.log({'updateParams':updateParams});
      response = await db.update(ServiceConsumption)
      .set({state: updateParams.state, updated_at: dateISO as Date})
      .where(eq(ServiceConsumption.id, updateParams.id));

      console.log({'response':response});

      updateParams.reserved_at = new Date(updateParams.reserved_at);

      const mailParamsCliente: mailParams = {
        price: updateParams.price,
        reserved_at: updateParams.reserved_at,
        message: `Buenas ${updateParams.client_name} su cita con ${updateParams.employee_name} para ${updateParams.service_name} ha sido cancelada, reservada el día ${updateParams.reserved_at.toLocaleDateString()} a las ${updateParams.reserved_at.toLocaleTimeString()}`,
        subject: 'Cita cancelada',
        employee_name: updateParams.employee_name,
        employee_mail: updateParams.employee_mail,
        client_name: updateParams.client_email,
        client_email: updateParams.client_name,
        receptor_email: updateParams.client_email,
      };

      const mailParamsEployee: mailParams = {
        price: updateParams.price,
        reserved_at: updateParams.reserved_at,
        message: `Buenas ${updateParams.employee_name} su cita con ${updateParams.client_name} para ${updateParams.service_name} ha sido cancelada, reservada el día ${updateParams.reserved_at.toLocaleDateString()} a las ${updateParams.reserved_at.toLocaleTimeString()}`,
        subject: 'Cita cancelada',
        employee_name: updateParams.employee_name,
        employee_mail: updateParams.employee_mail,
        client_name: updateParams.client_email,
        client_email: updateParams.client_name,
        receptor_email: updateParams.employee_mail,
      };

      console.log(mailParamsCliente);
      console.log(mailParamsEployee);

      mailer(mailParamsCliente);
      mailer(mailParamsEployee);
    }

    if (response) {
      status = 200;
      result.data = response;
      result.table= "ServiceConsumption";
      result.count = 0;
    }

    return new Response(JSON.stringify({ result }), {
      status: status,
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    //@ts-ignore
    console.log({'error':error});
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
};