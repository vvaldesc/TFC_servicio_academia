import { defineDb, defineTable, column } from 'astro:db';

const Clients = defineTable({
  columns: {
    ID: column.number({primaryKey: true}),
    name: column.text({default: 'indefinido'}),
    surname: column.text({default: 'indefinido'}),
    email: column.text({unique: true, optional: true}),
    phoneNumber: column.text({unique: true , optional: true}),
    address: column.text({optional: true}),
    postalCode: column.text({optional: true}),
    city: column.text({optional: true}),
    bornDate: column.date({optional: true}),
    createdAt: column.date({optional: true}),
    username: column.text({optional: true}),
    password: column.text({optional: true}),
    confirmed: column.boolean({default: false}),
    image: column.text({optional: true}),
  },
});

const Stundents = defineTable({
  columns: {
    'matriculation number': column.text({primaryKey: true}),
    ID: column.number({ references: () => Clients.columns.ID }),
    DNI: column.text({  }),
    employed: column.boolean({default: false}),
  },
});

const Teacher = defineTable({
  columns: {
    NIP: column.number({primaryKey: true}),
    isAdmin: column.boolean({ default: false }),
    ID: column.number({ references: () => Clients.columns.ID }),
  },
});

const Subject = defineTable({
  columns: {
    name: column.text({primaryKey: true}),
    acronym: column.text({ }),
    ID: column.number({ references: () => Clients.columns.ID }),
  },
});

const Employee = defineTable({
  columns: {
    'social security': column.text({primaryKey: true}),
    Salary: column.number({ default: 0 }),
    'matriculation number': column.text({ references: () => Stundents.columns['matriculation number'] }),
    NIP: column.number({ references: () => Teacher.columns.NIP }),
  },
});

const Services = defineTable({
  columns: {
    ID: column.number({primaryKey: true}),
    'social security': column.text({ references: () => Employee.columns['social security'] }),
    name: column.text(),
    price: column.number(),
    duration: column.number(),
    description: column.text(),
    discipline: column.text(),
    image: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Clients, Stundents, Employee, Services, Teacher, Subject}
});