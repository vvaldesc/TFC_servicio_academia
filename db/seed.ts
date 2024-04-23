import { db, Clients } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Clients).values([
		{ id: 2, name: 'Joel' },
	])
}
