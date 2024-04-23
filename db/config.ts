import { defineDb, defineTable, column } from 'astro:db';

const Clients = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
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
    'matriculation number': column.number({primaryKey: true}),
  },
});

const Employee = defineTable({
  columns: {
    'social security': column.text({primaryKey: true}),
  },
});

const Services = defineTable({
  columns: {
    ID: column.number({primaryKey: true}),
    'social security': column.date({ references: () => Employee.columns['social security'] }),
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
  tables: { Clients, Stundents, Employee, Services}
});