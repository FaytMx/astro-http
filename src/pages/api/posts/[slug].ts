import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, getEntry } from 'astro:content';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
	const posts = await getCollection('blog');

	const { slug } = params;

	const post = await getEntry('blog', slug as any);

	if (!post) {
		return new Response('Not found', { status: 404 });
	}

	return new Response(JSON.stringify(post), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
};
