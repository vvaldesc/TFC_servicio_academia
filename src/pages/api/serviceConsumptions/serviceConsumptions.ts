import { db, ServiceConsumption, Clients, Employees, Teachers, Students, eq, desc, count } from "astro:db";
import type { APIRoute } from "astro";
import type { Result, ServiceConsumption_type } from "@/consts/types";

export const GET = async () => {
  const serviceConsumptions = await db.select({
    id: ServiceConsumption.id,
    client_id: Clients.id,
    teacher_id: Teachers.id,
    student_id: Students.id,
    delay: ServiceConsumption.delay,
    service_id: ServiceConsumption.id,
    created_at: ServiceConsumption.created_at,
    updated_at: ServiceConsumption.updated_at,
    reserved_at: ServiceConsumption.reserved_at,
    rating: ServiceConsumption.rating,
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
  })
  .from(ServiceConsumption)
  .leftJoin(Clients, eq(ServiceConsumption.client_id, Clients.id))
  .leftJoin(Employees, eq(ServiceConsumption.employee_id, Employees.id))
  .leftJoin(Teachers, eq(Employees.teacher_id, Teachers.id))
  .leftJoin(Students, eq(Employees.student_id, Students.id))
  .groupBy(ServiceConsumption.id)
  .orderBy(ServiceConsumption.id, desc(ServiceConsumption.id));

  console.log(serviceConsumptions);
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
    //@ts-ignore
    serviceConsumptions.created_at = new Date();
    //@ts-ignore
    serviceConsumptions.updated_at = new Date();
    //@ts-ignore
    serviceConsumptions.reserved_at = new Date(serviceConsumptions.reserved_at); // Corregido aquí
    console.log('serviceConsumptions');
    console.log(serviceConsumptions);

    const response = await db.insert(ServiceConsumption).values(serviceConsumptions).onConflictDoUpdate({
      target: ServiceConsumption.id,
      set: serviceConsumptions,
    });
    //@ts-ignore
    // serviceConsumptions.id = String(response.columns);

    if (serviceConsumptions) {
      status = 201;
      result.data = response;
      result.table= "ServiceConsumption";
      result.count = 1;
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