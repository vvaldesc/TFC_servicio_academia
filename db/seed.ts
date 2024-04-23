import { db, Cliente } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Cliente).values([
		{ id: 1, name: 'John Doe' },
	])
}
