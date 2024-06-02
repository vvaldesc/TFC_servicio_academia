import { db, StudentSubjectMensuality, StudentSubjectEnrolments, EmployeePayrolls, Subjects, eq, sql } from "astro:db";
import type { APIRoute } from "astro";
import type { Result, mailParams } from "@/consts/types";

export const POST: APIRoute = async (request) => {
    let result: Result = {
      data: "undefined" as string | any,
      table: "StudentSubjectMensuality" as string,
      count: 0,
    };
    let status: number = 404;
    try {
      const updateParams: any = await request.request.json();
  
      // Inserta un nuevo registro en StudentSubjectMensuality para cada matrícula
      const response = sql`
        INSERT INTO StudentSubjectMensuality (amount, date, enrolment_id)
        SELECT Subjects.price, NOW(), StudentSubjectEnrolments.id
        FROM StudentSubjectEnrolments
        INNER JOIN Subjects ON StudentSubjectEnrolments.subject_acronym = Subjects.acronym
      `;

      console.log({'response': response});
  
      if (response) {
        status = 200;
        result.data = response;
        result.table= "StudentSubjectMensuality";
        result.count = 1; // El número de filas insertadas
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