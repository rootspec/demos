<script lang="ts">
	let { data } = $props();

	const PAGE_SIZE = 5;
	let visibleCount = $state(PAGE_SIZE);
	let composerText = $state('');
	let likedPosts = $state<Set<string>>(new Set());
	let bookmarkedPosts = $state<Set<string>>(new Set());
	let extraPosts = $state<Array<{ id: string; content: string; authorId: string; likeCount: number; repostCount: number; parentId: null; tags: string[]; createdAt: string }>>([]);

	let allPosts = $derived([...extraPosts, ...data.posts]);
	let visiblePosts = $derived(allPosts.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < allPosts.length);

	function getAuthor(authorId: string) {
		return data.users.find((u) => u.id === authorId);
	}

	function loadMore() {
		visibleCount = visibleCount + PAGE_SIZE;
	}

	function toggleLike(postId: string) {
		const next = new Set(likedPosts);
		if (next.has(postId)) {
			next.delete(postId);
		} else {
			next.add(postId);
		}
		likedPosts = next;
	}

	function toggleBookmark(postId: string) {
		const next = new Set(bookmarkedPosts);
		if (next.has(postId)) {
			next.delete(postId);
		} else {
			next.add(postId);
		}
		bookmarkedPosts = next;
	}

	function submitPost() {
		if (!composerText.trim()) return;
		const newPost = {
			id: `new-${Date.now()}`,
			content: composerText.trim(),
			authorId: data.users[0]?.id ?? 'u1',
			likeCount: 0,
			repostCount: 0,
			parentId: null,
			tags: [],
			createdAt: new Date().toISOString()
		};
		extraPosts = [newPost, ...extraPosts];
		composerText = '';
	}
</script>

<h1 class="mb-4 text-xl font-bold">Home Feed</h1>

<!-- Post Composer -->
<div data-test="post-composer" class="mb-6 rounded border border-gray-200 p-4 dark:border-gray-700">
	<textarea
		data-test="compose-textarea"
		bind:value={composerText}
		placeholder="What's on your mind?"
		rows="3"
		class="w-full resize-none rounded border border-gray-200 p-2 text-sm focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
	></textarea>
	<div class="mt-2 flex justify-end">
		<button
			data-test="compose-submit"
			onclick={submitPost}
			disabled={!composerText.trim()}
			class="rounded bg-blue-600 px-4 py-1.5 text-sm text-white disabled:opacity-40"
		>Post</button>
	</div>
</div>

<!-- Feed -->
{#each visiblePosts as post (post.id)}
	{@const author = getAuthor(post.authorId)}
	<div data-test="post-card" class="border-b border-gray-200 py-4 dark:border-gray-700">
		<div class="mb-1 text-sm text-gray-500">
			<a href="/demos/scaffold/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
			<span data-test="post-author-handle" class="ml-1">@{author?.handle}</span>
		</div>
		<a data-test="post-content-link" href="/demos/scaffold/post/{post.id}" class="block hover:underline">
			<p>{post.content}</p>
		</a>
		<div class="mt-2 flex items-center gap-4 text-xs text-gray-400">
			<button
				data-test="like-btn"
				data-liked={likedPosts.has(post.id) ? 'true' : 'false'}
				onclick={() => toggleLike(post.id)}
				class="flex items-center gap-1 hover:text-red-500 {likedPosts.has(post.id) ? 'text-red-500 active' : ''}"
			>
				{#if likedPosts.has(post.id)}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
				{/if}
				{post.likeCount + (likedPosts.has(post.id) ? 1 : 0)}
			</button>
			<button
				data-test="bookmark-btn"
				data-bookmarked={bookmarkedPosts.has(post.id) ? 'true' : 'false'}
				onclick={() => toggleBookmark(post.id)}
				class="flex items-center gap-1 hover:text-amber-500 {bookmarkedPosts.has(post.id) ? 'text-amber-500 active' : ''}"
			>
				{#if bookmarkedPosts.has(post.id)}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3-7 3V5z" /></svg>
				{/if}
			</button>
		</div>
	</div>
{/each}

{#if hasMore}
	<div class="mt-4 text-center">
		<button
			data-test="load-more-btn"
			onclick={loadMore}
			class="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
		>Load More</button>
	</div>
{/if}
