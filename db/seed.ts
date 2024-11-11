import { db, Clients } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Clients).values([
		{ id: 1, name: 'Alice', age: 30, isActive: true },
		{ id: 2, name: 'Bob', age: 40, isActive: false },
		{ id: 3, name: 'Charlie', age: 50, isActive: true },
		{ id: 4, name: 'David', age: 60, isActive: false },
		{ id: 5, name: 'Eve', age: 70, isActive: true },
		{ id: 6, name: 'Frank', age: 80, isActive: false },
		{ id: 7, name: 'Grace', age: 90, isActive: true },
	]);
}
