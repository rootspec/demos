import type { Post, User } from '$lib/types';
import posts from '$lib/data/posts.json';
import users from '$lib/data/users.json';

export function load() {
	return {
		posts: posts as Post[],
		users: users as User[]
	};
}
