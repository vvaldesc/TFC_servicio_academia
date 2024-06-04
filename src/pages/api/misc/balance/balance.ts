import {
  db,
  sum,
  StudentSubjectMensuality,
  ServiceConsumption,
  EmployeePayrolls,
  eq,
  sql,
} from "astro:db";
import type { APIRoute } from "astro";
import type { Result } from "@/consts/types";

export const GET = async () => {
  const mensualities = await db
    .select({
      monthAndYear: sql`strftime('%Y-%m', StudentSubjectMensuality.date)`,
      total_paid: sum(StudentSubjectMensuality.amount),
    })
    .from(StudentSubjectMensuality)
    .groupBy(sql`strftime('%m', StudentSubjectMensuality.date) + 0`);

  const payrolls = await db
    .select({
      month: EmployeePayrolls.month,
      total_paid: sum(EmployeePayrolls.amount),
    })
    .from(EmployeePayrolls)
    .groupBy(EmployeePayrolls.month);

  const details = await db
    .select({
      year: sql`strftime('%Y-%m', ServiceConsumption.reserved_at) + 0`,
      month: sql`strftime('%m', ServiceConsumption.reserved_at) + 0`,
      details_income: sql`sum(ServiceConsumption.price)`,
    })
    .from(ServiceConsumption)
    .where(
      sql`ServiceConsumption.reserved_at BETWEEN datetime('now', 'start of year')
   AND datetime('now') AND ServiceConsumption.state = 'Completed'`
    )
    .groupBy(sql`strftime('%m', ServiceConsumption.reserved_at) + 0`);

  const totalsArray = [];
  console.log(mensualities, payrolls, details);

  for (let month = 1; month <= 12; month++) {
    const formattedMonth = month.toString().padStart(2, "0");
    const key = `2024-${formattedMonth}`;
    const formattedMonthNumber = Number(formattedMonth);

    const mensualitie: number = isNaN(Number(mensualities.find((m) => m.monthAndYear === key)?.total_paid)) ? 0 : Number(mensualities.find((m) => m.monthAndYear === key)?.total_paid);
    const payroll: number = isNaN(Number(payrolls.find((p) => p.month === formattedMonthNumber)?.total_paid)) ? 0 : Number(payrolls.find((p) => p.month === formattedMonthNumber)?.total_paid);
    const detail: number = isNaN(Number(details.find((d) => d.month === formattedMonthNumber)?.details_income)) ? 0 : Number(details.find((d) => d.month === formattedMonthNumber)?.details_income);

    const total: number = mensualitie - payroll + detail;
    console.log(mensualitie, payroll, detail, total);


    totalsArray.push({
      month: key,
      totalBalance: total,
    });
  }

  let status: number = 404;
  let result: Result = {
    data: "undefined" as string | typeof subjects,
    table: "Subjects" as string,
    count: 0 as number,
  };

  if (mensualities && payrolls && details) {
    status = 200;
    result = {
      data: {
        mensualities: mensualities,
        payrolls: payrolls,
        details: details,
        total: totalsArray,
      },
      table: "Misc" as string,
      count: 3,
    };
  }

  return new Response(JSON.stringify({ result }), {
    status: status,
    headers: {
      "content-type": "application/json",
    },
  });
};
