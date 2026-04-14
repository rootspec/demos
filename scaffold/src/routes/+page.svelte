<script lang="ts">
	import { base } from '$app/paths';
	import { feed } from '$lib/stores/feed.svelte';
	import type { Post } from '$lib/types';

	let { data } = $props();

	const PAGE_SIZE = 5;
	let visibleCount = $state(PAGE_SIZE);
	let showComposer = $state(false);
	let composerText = $state('');

	let allPosts = $derived([...feed.userPosts, ...data.posts]);
	let visiblePosts = $derived(allPosts.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < allPosts.length);

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}

	function loadMore() {
		visibleCount += PAGE_SIZE;
	}

	function openComposer() {
		showComposer = true;
	}

	function submitPost() {
		if (composerText.trim()) {
			feed.addPost(composerText.trim());
			composerText = '';
			showComposer = false;
		}
	}
</script>

<div class="mb-4 flex items-center justify-between">
	<h1 class="text-xl font-bold">Home Feed</h1>
	<button
		data-test="compose-btn"
		onclick={openComposer}
		class="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
	>
		New Post
	</button>
</div>

{#if showComposer}
	<div class="mb-4 rounded border border-gray-200 p-4 dark:border-gray-700">
		<textarea
			data-test="composer-input"
			bind:value={composerText}
			placeholder="What's on your mind?"
			rows="3"
			class="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
		></textarea>
		<button
			data-test="composer-submit"
			onclick={submitPost}
			class="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
		>
			Post
		</button>
	</div>
{/if}

{#each visiblePosts as post (post.id)}
	{@const author = getAuthor(post.authorId)}
	<div data-test="post-card" class="border-b border-gray-200 py-4 dark:border-gray-700">
		<div class="mb-1 flex items-center gap-2 text-sm text-gray-500">
			<a
				data-test="post-author-link"
				href="{base}/profile/{author?.handle}"
				class="font-medium text-gray-900 dark:text-gray-100"
			>
				<span data-test="post-author-name">{author?.displayName}</span>
			</a>
			<span data-test="post-author-handle">@{author?.handle}</span>
		</div>
		<a data-test="post-card-link" href="{base}/post/{post.id}" class="block">
			<p class="text-gray-900 dark:text-gray-100">{post.content}</p>
		</a>
		<div class="mt-2 flex items-center gap-4 text-xs text-gray-400">
			<span data-test="post-like-count">{post.likeCount} likes</span>
			<span data-test="post-repost-count">{post.repostCount} reposts</span>
			<button
				data-test="like-btn"
				data-liked={feed.isLiked(post.id)}
				onclick={() => feed.toggleLike(post.id)}
				class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800 {feed.isLiked(post.id) ? 'active text-red-500' : ''}"
			>
				{feed.isLiked(post.id) ? '♥' : '♡'}
			</button>
			<button
				data-test="bookmark-btn"
				data-bookmarked={feed.isBookmarked(post.id)}
				onclick={() => feed.toggleBookmark(post.id)}
				class="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800 {feed.isBookmarked(post.id) ? 'active text-amber-500' : ''}"
			>
				{feed.isBookmarked(post.id) ? '🔖' : '🏷'}
			</button>
		</div>
	</div>
{/each}

{#if hasMore}
	<div class="py-4 text-center">
		<button
			data-test="load-more-btn"
			onclick={loadMore}
			class="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
		>
			Load more
		</button>
	</div>
{/if}
