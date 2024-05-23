import { db, eq, Employees, Teachers, Students } from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const employees
  = 
  await db.select()
  .from(Employees)
  .leftJoin(Teachers, eq(Employees.teacher_id, Teachers.id))
  .leftJoin(Students, eq(Employees.student_id, Students.id))
  .orderBy(Employees.id);

  console.log(employees);

  const combinedEmployees = employees.map(employee => {
    let role = employee.Employees.teacher_id ? "teacher" : (employee.Employees.student_id ? "student" : null);
    return {
      ...employee.Employees,
      role: role,
      teacher: {
        ...employee.Teachers,
      },
      student: {
        ...employee.Students,
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
