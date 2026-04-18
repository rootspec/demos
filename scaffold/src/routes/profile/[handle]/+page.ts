import type { Post, User } from '$lib/types';
import posts from '$lib/data/posts.json';
import users from '$lib/data/users.json';

export function load({ params }: { params: { handle: string } }) {
	const allUsers = users as User[];
	const user = allUsers.find((u) => u.handle === params.handle);
	const userPosts = user
		? (posts as Post[])
				.filter((p) => p.authorId === user.id)
				.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		: [];

	return { user, posts: userPosts, users: allUsers };
}
