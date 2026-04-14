<script lang="ts">
	import { base } from '$app/paths';
	import type { Post, User } from '$lib/types';

	let { post, author }: { post: Post; author: User | undefined } = $props();

	let liked = $state(false);
	let bookmarked = $state(false);

	function formatTime(dateStr: string): string {
		const diff = Date.now() - new Date(dateStr).getTime();
		const mins = Math.floor(diff / 60000);
		if (mins < 60) return `${mins}m`;
		const hours = Math.floor(mins / 60);
		if (hours < 24) return `${hours}h`;
		const days = Math.floor(hours / 24);
		return `${days}d`;
	}
</script>

<div class="border-b border-gray-200 py-4 dark:border-gray-700" data-test="post-card">
	<div class="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
		{#if author}
			<img src={author.avatar} alt={author.displayName} class="h-8 w-8 rounded-full" />
			<a href="{base}/profile/{author.handle}" class="font-medium text-gray-900 dark:text-gray-100" data-test="post-author">{author.displayName}</a>
			<span>@{author.handle}</span>
		{/if}
		<span data-test="post-timestamp">{formatTime(post.createdAt)}</span>
	</div>
	<a href="{base}/post/{post.id}" class="block">
		<p class="text-gray-900 dark:text-gray-100" data-test="post-content">{post.content}</p>
	</a>
	<div class="mt-2 flex items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
		<button
			class="flex items-center gap-1 hover:text-red-500"
			class:active={liked}
			class:text-red-500={liked}
			data-test="like-button"
			onclick={() => { liked = !liked; }}
		>
			<svg class="h-4 w-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
			</svg>
			<span data-test="like-count">{post.likeCount + (liked ? 1 : 0)}</span>
		</button>
		<span data-test="repost-count">{post.repostCount} reposts</span>
		<button
			class="flex items-center gap-1 hover:text-amber-500"
			class:active={bookmarked}
			class:text-amber-500={bookmarked}
			data-test="bookmark-button"
			onclick={() => { bookmarked = !bookmarked; }}
		>
			<svg class="h-4 w-4" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
			</svg>
		</button>
	</div>
</div>
