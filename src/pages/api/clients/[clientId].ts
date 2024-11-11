import type { APIRoute } from 'astro';
import { db, Clients, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
	const clientID = params.clientId ?? '';

	const clients = await db
		.select()
		.from(Clients)
		.where(eq(Clients.id, +clientID));

	if (clients.length === 0) {
		return new Response(JSON.stringify({ msg: 'Client not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return new Response(JSON.stringify(clients.at(0)), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};

export const PATCH: APIRoute = async ({ params, request }) => {
	const clientID = params.clientId ?? '';
	try {
		const { id, ...body } = await request.json();

		const results = await db
			.update(Clients)
			.set(body)
			.where(eq(Clients.id, +clientID));

		const updatedClient = await db
			.select()
			.from(Clients)
			.where(eq(Clients.id, +clientID));

		return new Response(JSON.stringify(updatedClient.at(0)), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.log('🚀 ~ constPOST:APIRoute= ~ error:', error);

		return new Response(JSON.stringify({ msg: 'No Body Found' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};

export const DELETE: APIRoute = async ({ params, request }) => {
	const clientID = params.clientId ?? '';
	try {
		const { rowsAffected } = await db
			.delete(Clients)
			.where(eq(Clients.id, +clientID));

		if (rowsAffected > 0) {
			return new Response(JSON.stringify({ msg: 'Deleted' }), {
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(JSON.stringify({ msg: 'Client not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.log('🚀 ~ constPOST:APIRoute= ~ error:', error);

		return new Response(JSON.stringify({ msg: 'No Body Found' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
