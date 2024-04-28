import { defineDb, defineTable, column } from "astro:db";

const Clients = defineTable({
  columns: {
    ID: column.number({ primaryKey: true }),
    name: column.text({ default: "indefinido" }),
    surname: column.text({ default: "indefinido" }),
    email: column.text({ unique: true, optional: true }),
    phone_number: column.text({ unique: true, optional: true }),
    address: column.text({ optional: true }),
    city: column.text({ optional: true }),
    bornDate: column.date({ optional: true }),
    created_at: column.date({ optional: true }),
    username: column.text({ unique: true, optional: true }),
    password: column.text({ optional: true }),
    confirmed: column.boolean({ default: false }),
    image: column.text({ optional: true }),
    active: column.boolean({ default: false }),
  },
});

const Stundents = defineTable({
  columns: {
    ID: column.number({ primaryKey: true }),
    matriculation_number: column.text({ primaryKey: true }),
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
    username: column.text({ unique: true }),
    password: column.text(),
    confirmed: column.boolean(),
    image: column.text(),
    active: column.boolean({ default: false }),
  },
});

const Teachers = defineTable({
  columns: {
    ID: column.number({ primaryKey: true }),
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
    teacher_ID: column.number({ references: () => Teachers.columns.ID }),
    name: column.text(),
  },
});

const Employees = defineTable({
  columns: {
    ID: column.number({ primaryKey: true }),
    teacher_ID: column.number({ references: () => Teachers.columns.ID }),
    student_ID: column.number({ references: () => Stundents.columns.ID }),
    social_security: column.text({ unique: true }),
    salary: column.number({ default: 0 }),
  },
});

const Services = defineTable({
  columns: {
    ID: column.number({ primaryKey: true }),
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
    ID: column.number({ references: () => Clients.columns.ID }),
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

const ClientClientTexts = defineTable({
  columns: {
    sender: column.number({ references: () => Clients.columns.ID }),
    receiver: column.number({ references: () => Clients.columns.ID }),
    text: column.text(),
    date: column.date(),
  },
});

const ServiceConsumption = defineTable({
  columns: {
    consumer: column.number({ references: () => Clients.columns.ID }),
    service: column.number({ primaryKey: true, references: () => Services.columns.ID }),
    employee: column.number({ primaryKey:true, references: () => Employees.columns.ID }),
    rating: column.number(),
    date: column.date(),
    hour: column.text(),
  },
});

const ClientServerConnections = defineTable({
  columns: {
    client_ID: column.number({ references: () => Clients.columns.ID }),
    server_ID: column.number({ references: () => Servers.columns.ID }),
    estimated_client_location: column.text({ optional: true }),
    device_type: column.text({ optional: true }),
    file: column.text({ optional: true }),
    date: column.date({ optional: true }),
    client_IP: column.text({ optional: true }),
  },
});

const StudentSubjectEnrolments = defineTable({
  columns: {
    student_ID: column.text({ references: () => Stundents.columns.matriculation_number }),
    subject_acronym: column.text({
      references: () => Subjects.columns.acronym,
    }),
    date: column.date(),
  },
});

const ClientArticlePurchases = defineTable({
  columns: {
    client_ID: column.number({ references: () => Clients.columns.ID }),
    serial_number: column.text({ primaryKey: true }),
    delivery: column.text({ optional: true }),
    date: column.date(),
    discount: column.number({ optional: true }),
  },
});

const ClientArticleDelivery = defineTable({
  columns: {
    client_ID: column.number({ references: () => Clients.columns.ID }),
    serial_number: column.text({ primaryKey: true }),
    sent: column.boolean(),
    recieved: column.boolean({ optional: true }),
    recieving_date: column.date(),
    rending_date: column.date(),
    tracking_number: column.text(),
  },
});

// https://astro.build/db/config
// prettier-ignore
export default defineDb({
  tables:
   { Clients, Stundents, Employees, Services, Teachers, Subjects, Articles, Servers, Courses,
     ClientClientTexts, ServiceConsumption, ClientServerConnections, StudentSubjectEnrolments, ClientArticlePurchases, ClientArticleDelivery}
});
