import { db, Employees, StudentSubjectMensuality, StudentSubjectEnrolments, EmployeePayrolls, Students, Subjects, eq, sql } from "astro:db";

import type { APIRoute } from "astro";
import type { Result, mailParams } from "@/consts/types";

export const POST: APIRoute = async () => {
    let result: Result = {
      data: "undefined" as string | any,
      table: "StudentSubjectMensuality" as string,
      count: 0,
    };
    let status: number = 404;
    try {
      // Inserta un nuevo registro en StudentSubjectMensuality para cada matrícula


    // const response = sql`
    //   INSERT INTO StudentSubjectMensuality (amount, date, student_id)
    //   SELECT SUM(Subjects.price), NOW(), StudentSubjectEnrolments.student_id
    //   FROM StudentSubjectEnrolments
    //   INNER JOIN Subjects ON StudentSubjectEnrolments.subject_acronym = Subjects.acronym
    //   GROUP BY StudentSubjectEnrolments.student_id
    // `;

      const subjects = await db.select().from(Subjects);
      const enrolments = await db.select().from(StudentSubjectEnrolments);
      const students = await db.select().from(Students);
      const employeepayrolls = await db.select().from(EmployeePayrolls);
      const employees = await db.select().from(Employees);

      let querys = [];
      console.log({'querys': querys.length});

      students.map(student => {
        let amount = 0;
        enrolments.map(enrolment => {
          if (student.id === enrolment.student_id) {
            subjects.map(subject => {
              if (enrolment.subject_acronym === subject.acronym) {
                amount += subject.price;
              }
            });
          };
        });
        const date = new Date().setHours(new Date().getHours() + 2);
        const date2 = new Date(date) as Date
        querys.push(db.insert(StudentSubjectMensuality).values({
          amount: amount,
          date: date2,
          student_id: student.id
        }));
      });

      console.log({'querys': querys.length});

      employees.map(employee => {
        const month = new Date().getMonth() + 1;
        employee.salary > 0 && querys.push(db.insert(EmployeePayrolls).values({
          employee_id: employee.id,
          month: month,
          amount: employee.salary
        }));
        });

      console.log({'querys': querys.length});

        
        const response = await db.batch(querys)        

  
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