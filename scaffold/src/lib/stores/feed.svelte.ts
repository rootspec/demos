import type { Post } from '$lib/types';

class FeedState {
	likedIds: string[] = $state([]);
	bookmarkedIds: string[] = $state([]);
	userPosts: Post[] = $state([]);

	isLiked(id: string): boolean {
		return this.likedIds.includes(id);
	}

	isBookmarked(id: string): boolean {
		return this.bookmarkedIds.includes(id);
	}

	toggleLike(postId: string) {
		if (this.likedIds.includes(postId)) {
			this.likedIds = this.likedIds.filter((x) => x !== postId);
		} else {
			this.likedIds = [...this.likedIds, postId];
		}
	}

	toggleBookmark(postId: string) {
		if (this.bookmarkedIds.includes(postId)) {
			this.bookmarkedIds = this.bookmarkedIds.filter((x) => x !== postId);
		} else {
			this.bookmarkedIds = [...this.bookmarkedIds, postId];
		}
	}

	addPost(content: string): Post {
		const post: Post = {
			id: `user-${Date.now()}`,
			authorId: 'u1',
			content,
			createdAt: new Date().toISOString(),
			likeCount: 0,
			repostCount: 0,
			parentId: null,
			tags: []
		};
		this.userPosts = [post, ...this.userPosts];
		return post;
	}
}

export const feed = new FeedState();
