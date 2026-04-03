export interface User {
	id: string;
	handle: string;
	displayName: string;
	bio: string;
	avatar: string;
	followerCount: number;
	followingCount: number;
}

export interface Post {
	id: string;
	authorId: string;
	content: string;
	createdAt: string;
	likeCount: number;
	repostCount: number;
	parentId: string | null;
	tags: string[];
}

export interface Tag {
	name: string;
	postCount: number;
}
