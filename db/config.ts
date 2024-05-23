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
    password: column.text({ optional: true }),
    confirmed: column.boolean({ default: false }),
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
    password: column.text(),
    confirmed: column.boolean(),
    image: column.text(),
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
    password: column.text(),
    confirmed: column.boolean(),
    image: column.text(),
    active: column.boolean({ default: false }),
  },
});

const Subjects = defineTable({
  columns: {
    acronym: column.text({ primaryKey: true }),
    teacher_id: column.number({ references: () => Teachers.columns.id }),
    course_id: column.text({ references: () => Courses.columns.acronym }),
    name: column.text(),
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

const Services = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    name: column.text({ unique: true }),
    price: column.number(),
    duration: column.number(),
    description: column.text({ optional: true }),
    discipline: column.text(),
    image: column.text({ optional: true }),
  },
});

const Articles = defineTable({
  columns: {
    serial_number: column.text({ primaryKey: true }),
    name: column.text({ unique: true }),
    price: column.number(),
    color: column.text(),
    description: column.text({ optional: true }),
    type: column.text({ optional: true }),
    volume: column.number({ optional: true }),
    weight: column.number({ optional: true }),
    IVA: column.number(),
    gross_price: column.number(),
    supplier: column.text({ optional: true }),
    stock: column.number(),
    image1: column.text(),
    image2: column.text({ optional: true }),
    image3: column.text({ optional: true }),
    image4: column.text({ optional: true }),
  },
});

const Servers = defineTable({
  columns: {
    nickname: column.text({ primaryKey: true }),
    IP: column.text(),
    Port: column.number(),
    id: column.number({ references: () => Clients.columns.id }),
  },
});

const Courses = defineTable({
  columns: {
    acronym: column.text({ primaryKey: true }),
    attendance_threshold: column.number(),
    educational_level: column.text(),
    duration: column.number(),
    practical_hours: column.number(),
  },
});

const ClientTeacherTexts = defineTable({
  columns: {
    client_id: column.number({ references: () => Clients.columns.id }),
    teacher_id: column.number({ references: () => Teachers.columns.id }),
    sent_from_client: column.boolean(),
    sent_from_teacher: column.boolean(),
    message: column.text(),
    date: column.date()
  },
});

const ServiceConsumption = defineTable({
  columns: {
    service_id: column.number({ references: () => Services.columns.id }),
    employee_id: column.number({ references: () => Employees.columns.id }),
    client_id: column.number({ references: () => Clients.columns.id }),
    rating: column.number({ optional: true }),
    price: column.number(),
    delay: column.number({ optional: true }),
    created_at: column.date(),
    updated_at: column.date({ optional: true }),
    reserved_at: column.date(),
    state: column.text({ default: 'pending' }),
  },
});

const Reservations = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    service_id: column.number({ references: () => Services.columns.id }),
    employee_id: column.number({ references: () => Employees.columns.id }),
    client_id: column.number({ references: () => Clients.columns.id }),
    reservation_date: column.date(),
    reservation_time: column.text(),
    status: column.text({ default: 'pending' }), // 'pending', 'confirmed', 'cancelled'
  },
});

const ClientServerConnections = defineTable({
  columns: {
    client_id: column.number({ references: () => Clients.columns.id }),
    server_nick: column.text({ references: () => Servers.columns.nickname }),
    estimated_client_location: column.text({ optional: true }),
    device_type: column.text({ optional: true }),
    file_download: column.text({ optional: true }),
    created_at: column.date(),
    client_IP: column.text({ optional: true }),
  },
});

const StudentSubjectEnrolments = defineTable({
  columns: {
    student_id: column.number({ references: () => Students.columns.id }),
    subject_acronym: column.text({ references: () => Subjects.columns.acronym }),
    date: column.date(),
  },
});

const StudentSubjectFaults = defineTable({
  columns: {
    student_id: column.number({ references: () => Students.columns.id }),
    subject_acronym: column.text({ references: () => Subjects.columns.acronym }),
    date: column.date(),
    justified: column.boolean(),
    justification: column.text({ optional: true }),
    description: column.text({ optional: true }),
  },
});

const ClientArticleInteractions = defineTable({
  columns: {
    client_id: column.number({ references: () => Clients.columns.id }),
    serial_number: column.text({ primaryKey: true, references: () => Articles.columns.serial_number }),
    interaction_type: column.text(), // 'booking' or 'pickup'
    date: column.date(),
    updated_at: column.date({ optional: true }),
    discount: column.number({ optional: true }),
    pickedup_date: column.date({ optional: true }),
    pickingup_date: column.date({ optional: true }),
    price: column.number({ optional: true }),
  },
});

// https://astro.build/db/config
// prettier-ignore
export default defineDb({
  tables:
   { Clients, Students, Employees, Services, Teachers, Subjects, Articles, Servers, Courses,
    ClientTeacherTexts, ServiceConsumption, Reservations, ClientServerConnections, StudentSubjectEnrolments, StudentSubjectFaults, ClientArticleInteractions}
});
