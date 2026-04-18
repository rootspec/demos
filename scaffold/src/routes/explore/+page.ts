import type { Tag, User, Post } from '$lib/types';
import tags from '$lib/data/tags.json';
import users from '$lib/data/users.json';
import posts from '$lib/data/posts.json';

export function load() {
	const sortedTags = (tags as Tag[]).sort((a, b) => b.postCount - a.postCount);
	const topPosts = (posts as Post[])
		.filter((p) => p.parentId === null)
		.sort((a, b) => b.likeCount - a.likeCount);
	return {
		tags: sortedTags,
		users: users as User[],
		posts: topPosts
	};
}
