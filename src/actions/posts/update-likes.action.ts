import { z } from 'astro/zod';
import { actions, defineAction } from 'astro:actions';
import { db, Posts, eq } from 'astro:db';

export const updateLikes = defineAction({
	accept: 'json',
	input: z.object({
		postId: z.string(),
		increment: z.number(),
	}),
	handler: async ({ postId, increment }) => {
		// const posts = await db.select().from(Posts).where(eq(Posts.id, postId));

		const { data, error } = await actions.getPostLikes(postId);

		if (error) {
			console.log('🚀 ~ handler: ~ error:', error);
			throw new Error('error getting post likes');
		}

		const { exists, likes } = data;

		if (!exists) {
			const newPost = {
				id: postId,
				title: 'New Post',
				likes: 0,
			};

			await db.insert(Posts).values(newPost);
		}

		// post.likes += increment;

		await db
			.update(Posts)
			.set({
				likes: likes + increment,
			})
			.where(eq(Posts.id, postId));

		return true;
	},
});
