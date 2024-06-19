import { defineDb, defineTable, column } from "astro:db";

const Clients = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text({ default: "indefinido" }),
    surname: column.text({ default: "indefinido" }),
    email: column.text({ unique: true, optional: true }),
    phone_number: column.text({ unique: true, optional: true }),
    address: column.text({ optional: true }),
    city: column.text({ optional: true }),
    bornDate: column.date({ optional: true }),
    created_at: column.date({ optional: true }),
    updated_at: column.date({ optional: true }),
    username: column.text({ unique: true, optional: true }),
    image: column.text({ optional: true }),
    active: column.boolean({ default: false }),
  },
});

const Students = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    matriculation_number: column.text({ unique: true }),
    DNI: column.text(),
    employed: column.boolean({ default: false }),
    educational_level: column.text(),
    /*atributos de cliente*/
    name: column.text({ default: "indefinido" }),
    surname: column.text({ default: "indefinido" }),
    email: column.text({ unique: true }),
    phone_number: column.text({ unique: true }),
    address: column.text(),
    city: column.text(),
    bornDate: column.date(),
    created_at: column.date(),
    updated_at: column.date({ optional: true }),
    username: column.text({ unique: true }),
    image: column.text({ optional: true }),
    active: column.boolean({ default: false }),
  },
});

const Teachers = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    is_admin: column.boolean({ default: false }),
    /*atributos de cliente*/
    name: column.text({ default: "indefinido" }),
    surname: column.text({ default: "indefinido" }),
    email: column.text({ unique: true }),
    phone_number: column.text({ unique: true }),
    address: column.text(),
    city: column.text(),
    bornDate: column.date(),
    created_at: column.date(),
    updated_at: column.date({ optional: true }),
    username: column.text({ unique: true }),
    image: column.text(),
    active: column.boolean({ default: false }),
  },
});

const Disciplines = defineTable({
  columns: {
    name: column.text({ primaryKey: true }),
  },
});

const Courses = defineTable({
  columns: {
    acronym: column.text({ primaryKey: true }),
    name: column.text(),
    turn: column.text(),
    attendance_threshold: column.number(),
    educational_level: column.text(),
    duration: column.number(),
    practical_hours: column.number(),
    discipline: column.text({ references: () => Disciplines.columns.name }),
  },
});

const Subjects = defineTable({
  columns: {
    acronym: column.text({ primaryKey: true }),
    teacher_id: column.number({ references: () => Teachers.columns.id }),
    course_id: column.text({ references: () => Courses.columns.acronym }),
    name: column.text(),
    price: column.number({default: 0}),
  },
});

const Employees = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    teacher_id: column.number({ optional: true, references: () => Teachers.columns.id }),
    student_id: column.number({ optional: true, references: () => Students.columns.id }),
    social_security: column.text({ unique: true }),
    salary: column.number({ default: 0 }),
  },
});

const EmployeePayrolls = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    employee_id: column.number({ references: () => Employees.columns.id }),
    month: column.number(),
    amount: column.number(),
  },
});

const Services = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text({ unique: true }),
    price: column.number(),
    description: column.text({ optional: true }),
    discipline: column.text({ references: () => Disciplines.columns.name }),
  },
});

const Servers = defineTable({
  columns: {
    nickname: column.text({ primaryKey: true }),
    IP: column.text(),
    Port: column.number(),
  },
});

const ServiceConsumption = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    service_id: column.number({ references: () => Services.columns.id }),
    employee_id: column.number({ references: () => Employees.columns.id }),
    client_id: column.number({ references: () => Clients.columns.id }),
    rating: column.number({ optional: true }),
    price: column.number(),
    delay: column.number({ optional: true }),
    created_at: column.date(),
    updated_at: column.date({ optional: true }),
    reserved_at: column.date(),
    state: column.text({ default: 'Pending' }),
    weather: column.text({ optional: true }),
  },
});

const ClientServerConnections = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    server_nick: column.text({ references: () => Servers.columns.nickname }),
    estimated_client_location: column.text({ optional: true }),
    device_type: column.text({ optional: true }),
    file_download: column.text({ optional: true }),
    created_at: column.date({ optional: true }),
    client_IP: column.text({ optional: true }),
  },
});

const StudentSubjectEnrolments = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    student_id: column.number({ references: () => Students.columns.id }),
    subject_acronym: column.text({ references: () => Subjects.columns.acronym }),
    enrolled_at: column.date(),
  },
});

const StudentSubjectMensuality = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    student_id: column.number({ references: () => Students.columns.id }),
    amount: column.number(),
    date: column.date(),
  },
});

const StudentSubjectFaults = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    student_id: column.number({ references: () => Students.columns.id }),
    subject_acronym: column.text({ references: () => Subjects.columns.acronym }),
    date: column.date(),
    justified: column.boolean(),
    justification: column.text({ optional: true }),
    description: column.text({ optional: true }),
  },
});

// https://astro.build/db/config
// prettier-ignore
export default defineDb({
  tables:
   {Clients, Students, Employees, Services, Teachers, Subjects,
    Servers, Courses, Disciplines,
    ServiceConsumption, ClientServerConnections,
    StudentSubjectEnrolments, StudentSubjectFaults,
    EmployeePayrolls, StudentSubjectMensuality}
});
