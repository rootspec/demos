import type { Post, User } from '$lib/types';
import posts from '$lib/data/posts.json';
import users from '$lib/data/users.json';

export function load() {
	const topLevelPosts = (posts as Post[])
		.filter((p) => p.parentId === null)
		.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	return {
		posts: topLevelPosts,
		users: users as User[]
	};
}
