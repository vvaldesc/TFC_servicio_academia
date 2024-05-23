import { db, eq, Employees, Teachers, Students, ServiceConsumption, count, avg } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const employees
  = 
  await db.select({
    id: Employees.id,
    teacher_id: Employees.teacher_id,
    student_id: Employees.student_id,
    social_security: Employees.social_security,
    salary: Employees.salary,
    rating: avg(ServiceConsumption.rating),
    teacher: {
      id: Teachers.id,
      is_admin: Teachers.is_admin,
      name: Teachers.name,
      surname: Teachers.surname,
      email: Teachers.email,
      phone_number: Teachers.phone_number,
      address: Teachers.address,
      city: Teachers.city,
      bornDate: Teachers.bornDate,
      created_at: Teachers.created_at,
      updated_at: Teachers.updated_at,
      username: Teachers.username,
      password: Teachers.password,
      confirmed: Teachers.confirmed,
      image: Teachers.image,
      active: Teachers.active
    },
    student: {
      id: Students.id,
      matriculation_number: Students.matriculation_number,
      DNI: Students.DNI,
      employed: Students.employed,
      educational_level: Students.educational_level,
      name: Students.name,
      surname: Students.surname,
      email: Students.email,
      phone_number: Students.phone_number,
      address: Students.address,
      city: Students.city,
      bornDate: Students.bornDate,
      created_at: Students.created_at,
      updated_at: Students.updated_at,
      username: Students.username,
      password: Students.password,
      confirmed: Students.confirmed,
      image: Students.image,
      active: Students.active
    }
  })
  .from(Employees)
  .leftJoin(ServiceConsumption, eq(Employees.id, ServiceConsumption.employee_id))
  .leftJoin(Teachers, eq(Employees.teacher_id, Teachers.id))
  .leftJoin(Students, eq(Employees.student_id, Students.id))
  .groupBy(Employees.id)
  .orderBy(Employees.id);

  console.log(employees);

  const combinedEmployees = employees.map(employee => {
    let role = employee.teacher_id ? "teacher" : (employee.student_id ? "student" : null);
    return {
      ...employee,
      role: role,
      rating: employee.rating,
      teacher: {
        ...employee.teacher,
      },
      student: {
        ...employee.student,
      }
    };
  });

  let status: number = 404;
  let result: Result = {
    data: "undefined",
    table: "Employees",
    count: 0,
  };

  if (employees.length > 0) {
    result.data = combinedEmployees;
    result.count = combinedEmployees.length;
    status = 200;
  }
  
  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};

export const POST: APIRoute = async (request) => {
  let result: Result = {
    data: "undefined" as string | Client_type,
    table: "Employees" as string,
    count: 0,
  };
  let status: number = 404;
  try {
    const employees: Client_type = await request.request.json();
    //@ts-ignore
    employees.bornDate = new Date(client.bornDate);
    //@ts-ignore
    employees.created_at = new Date();
    //@ts-ignore
    employees.updated_at = new Date();
    console.log(employees);
    const response = await db.insert(Employees).values(employees).onConflictDoUpdate({
      target: Employees.id,
      set: employees,
    });
    //@ts-ignore
    client.id = String(response.lastInsertRowid);

    if (employees) {
      status = 201;
      result.data = employees;
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
