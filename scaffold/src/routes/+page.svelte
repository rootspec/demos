<script lang="ts">
	let { data } = $props();

	const PAGE_SIZE = 10;
	let visibleCount = $state(PAGE_SIZE);
	let likedPosts = $state<Set<string>>(new Set());
	let bookmarkedPosts = $state<Set<string>>(new Set());
	let composerText = $state('');
	let localPosts = $state([...data.posts]);

	let visiblePosts = $derived(localPosts.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < localPosts.length);

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
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

	function loadMore() {
		visibleCount = visibleCount + PAGE_SIZE;
	}

	function submitPost() {
		if (!composerText.trim()) return;
		const newPost = {
			id: `local-${Date.now()}`,
			authorId: 'u1',
			content: composerText,
			createdAt: new Date().toISOString(),
			likeCount: 0,
			repostCount: 0,
			parentId: null,
			tags: []
		};
		localPosts = [newPost, ...localPosts];
		composerText = '';
	}
</script>

<h1 class="mb-4 text-xl font-bold">Home Feed</h1>

<!-- Composer -->
<div data-test="composer" class="mb-6 rounded border border-gray-200 p-3 dark:border-gray-700">
	<textarea
		data-test="composer-input"
		bind:value={composerText}
		placeholder="What's on your mind?"
		class="w-full resize-none rounded border border-gray-200 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
		rows="2"
	></textarea>
	<div class="mt-2 flex justify-end">
		<button
			data-test="composer-submit"
			onclick={submitPost}
			class="rounded bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
		>
			Post
		</button>
	</div>
</div>

{#each visiblePosts as post}
	{@const author = getAuthor(post.authorId)}
	{@const isLiked = likedPosts.has(post.id)}
	{@const isBookmarked = bookmarkedPosts.has(post.id)}
	<div data-test="post-item" class="border-b border-gray-200 py-4 dark:border-gray-700">
		<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
			<a data-test="post-author" href="/demos/scaffold/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
			<span>@{author?.handle}</span>
		</div>
		<a href="/demos/scaffold/post/{post.id}" class="block">
			<p>{post.content}</p>
		</a>
		<div class="mt-2 flex items-center gap-4 text-xs text-gray-400">
			<span data-test="post-like-count">{isLiked ? post.likeCount + 1 : post.likeCount} likes</span>
			<span>{post.repostCount} reposts</span>
			<button
				data-test="like-button"
				data-liked={isLiked}
				onclick={() => toggleLike(post.id)}
				class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800 {isLiked ? 'text-red-500' : ''}"
				aria-label="Like"
			>
				{isLiked ? '❤️' : '🤍'}
			</button>
			<button
				data-test="bookmark-button"
				data-bookmarked={isBookmarked}
				onclick={() => toggleBookmark(post.id)}
				class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800 {isBookmarked ? 'text-amber-500' : ''}"
				aria-label="Bookmark"
			>
				{isBookmarked ? '🔖' : '🏷️'}
			</button>
		</div>
	</div>
{/each}

{#if hasMore}
	<div class="mt-4 flex justify-center">
		<button
			data-test="load-more"
			onclick={loadMore}
			class="rounded border border-gray-300 px-6 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
		>
			Load more
		</button>
	</div>
{/if}
