import type { Post, User } from '$lib/types';
import posts from '$lib/data/posts.json';
import users from '$lib/data/users.json';

export function load({ params }: { params: { id: string } }) {
	const allPosts = posts as Post[];
	const allUsers = users as User[];
	const post = allPosts.find((p) => p.id === params.id);
	const parent = post?.parentId ? allPosts.find((p) => p.id === post.parentId) : undefined;
	const replies = allPosts
		.filter((p) => p.parentId === params.id)
		.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

	return { post, parent, replies, users: allUsers };
}
