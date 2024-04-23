import { defineDb, defineTable, column } from 'astro:db';

const Cliente = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    name: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Cliente }
});