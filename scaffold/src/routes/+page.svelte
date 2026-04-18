<script lang="ts">
	import { base } from '$app/paths';
	import type { Post, User } from '$lib/types';

	let { data } = $props();

	const PAGE_SIZE = 5;

	// Mutable state for feed
	type PostState = Post & { liked: boolean; bookmarked: boolean };
	let allPosts = $state<PostState[]>(data.posts.map((p: Post) => ({ ...p, liked: false, bookmarked: false })));
	let visibleCount = $state(PAGE_SIZE);
	let visiblePosts = $derived(allPosts.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < allPosts.length);

	// Compose state
	let composerOpen = $state(false);
	let composerText = $state('');

	function getAuthor(authorId: string): User | undefined {
		return data.users.find((u: User) => u.id === authorId);
	}

	function toggleLike(postId: string) {
		allPosts = allPosts.map((p) =>
			p.id === postId
				? { ...p, liked: !p.liked, likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1 }
				: p
		);
	}

	function toggleBookmark(postId: string) {
		allPosts = allPosts.map((p) =>
			p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p
		);
	}

	function loadMore() {
		visibleCount = visibleCount + PAGE_SIZE;
	}

	function submitCompose() {
		if (!composerText.trim()) return;
		const newPost: PostState = {
			id: 'new-' + Date.now(),
			authorId: 'u1',
			content: composerText,
			createdAt: new Date().toISOString(),
			likeCount: 0,
			repostCount: 0,
			parentId: null,
			tags: [],
			liked: false,
			bookmarked: false
		};
		allPosts = [newPost, ...allPosts];
		composerText = '';
		composerOpen = false;
	}
</script>

<div>
	<!-- Compose button -->
	<div class="mb-4 flex items-center justify-between">
		<h1 class="text-xl font-bold">Home Feed</h1>
		<button
			data-test="compose-button"
			onclick={() => (composerOpen = !composerOpen)}
			class="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
		>
			Compose
		</button>
	</div>

	<!-- Composer -->
	{#if composerOpen}
		<div data-test="post-composer" class="mb-4 rounded border border-gray-200 p-3 dark:border-gray-700">
			<textarea
				data-test="composer-input"
				bind:value={composerText}
				placeholder="What's on your mind?"
				class="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
				rows="3"
			></textarea>
			<button
				data-test="composer-submit"
				onclick={submitCompose}
				class="rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
			>
				Post
			</button>
		</div>
	{/if}

	<!-- Feed posts -->
	{#each visiblePosts as post (post.id)}
		{@const author = getAuthor(post.authorId)}
		<div data-test="post-item" class="border-b border-gray-200 py-4 dark:border-gray-700">
			<div class="mb-1 flex items-center gap-2 text-sm text-gray-500">
				<a
					data-test="post-author-name"
					href="{base}/profile/{author?.handle}"
					class="font-medium text-gray-900 hover:underline dark:text-gray-100"
				>{author?.displayName}</a>
				<span data-test="post-author-handle" class="text-gray-500 dark:text-gray-400">@{author?.handle}</span>
			</div>
			<a data-test="post-link" href="{base}/post/{post.id}" class="block text-gray-900 hover:text-gray-700 dark:text-gray-100">
				<p>{post.content}</p>
			</a>
			<div class="mt-2 flex items-center gap-4">
				<!-- Like button -->
				<button
					data-test="like-button"
					data-liked={post.liked}
					onclick={() => toggleLike(post.id)}
					class="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 {post.liked ? 'text-red-500 active' : ''}"
				>
					{post.liked ? '♥' : '♡'}
					<span data-test="post-like-count">{post.likeCount}</span>
				</button>
				<!-- Repost count -->
				<span class="flex items-center gap-1 text-xs text-gray-400">
					↻ <span data-test="post-repost-count">{post.repostCount}</span>
				</span>
				<!-- Bookmark button -->
				<button
					data-test="bookmark-button"
					data-bookmarked={post.bookmarked}
					onclick={() => toggleBookmark(post.id)}
					class="flex items-center gap-1 text-xs text-gray-400 hover:text-amber-500 {post.bookmarked ? 'text-amber-500 active' : ''}"
				>
					{post.bookmarked ? '🔖' : '⊹'}
				</button>
			</div>
		</div>
	{/each}

	<!-- Load more -->
	{#if hasMore}
		<div class="mt-4 text-center">
			<button
				data-test="load-more-button"
				onclick={loadMore}
				class="rounded border border-gray-300 px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400"
			>
				Load more
			</button>
		</div>
	{/if}
</div>
