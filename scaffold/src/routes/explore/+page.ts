import type { Tag, User } from '$lib/types';
import tags from '$lib/data/tags.json';
import users from '$lib/data/users.json';

export function load() {
	const sortedTags = (tags as Tag[]).sort((a, b) => b.postCount - a.postCount);
	return {
		tags: sortedTags,
		users: users as User[]
	};
}
