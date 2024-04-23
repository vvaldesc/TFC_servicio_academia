import { db, Clientes } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Clientes).values([
		{ id: 2, name: 'Joel' },
	])
}
