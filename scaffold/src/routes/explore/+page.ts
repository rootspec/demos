import type { Post, Tag, User } from '$lib/types';
import posts from '$lib/data/posts.json';
import tags from '$lib/data/tags.json';
import users from '$lib/data/users.json';

export function load() {
	const sortedTags = (tags as Tag[]).sort((a, b) => b.postCount - a.postCount);
	return {
		tags: sortedTags,
		users: users as User[],
		posts: (posts as Post[]).filter((p) => p.parentId === null)
	};
}
