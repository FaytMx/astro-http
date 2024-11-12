import { getCollection } from 'astro:content';
import { db, Clients, Posts } from 'astro:db';

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

	const posts = await getCollection('blog');
	console.log("🚀 ~ seed ~ posts:", posts)

	

	await db.insert(Posts).values(
		posts.map(p => ({
			id: p.id,
			title: p.data.title,
			likes: Math.round(Math.random() * 100),
		}))
	);
}
