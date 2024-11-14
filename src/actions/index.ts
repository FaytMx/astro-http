
import { getPostLikes } from './posts/get-post-likes.action';
import { updateLikes } from './posts/update-likes.action';

export const server = {
	getPostLikes,
	updateLikes
};
