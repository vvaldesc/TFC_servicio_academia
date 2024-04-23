import { defineDb, defineTable, column } from 'astro:db';

const Clientes = defineTable({
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

/*
const Cliente = {
  id: column.text({primaryKey: true}),
  name: column.text(),
  email: column.text(),
  tlf: column.text(),
  address: column.text(),
  postalCode: column.text(),
  city: column.text(),
  bornDate: column.date(),
  createdAt: column.date(),
  DNI: column.date(),
  user: column.text(),
  password: column.text(),
};
*/

// https://astro.build/db/config
export default defineDb({
  tables: { Clientes }
});