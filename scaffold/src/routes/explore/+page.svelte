<script lang="ts">
	import { base } from '$app/paths';
	import type { Tag, User, Post } from '$lib/types';

	let { data } = $props();

	let activeTag = $state<string | null>(null);

	let filteredPosts = $derived(
		activeTag
			? (data.posts as Post[]).filter((p: Post) => p.tags.includes(activeTag!))
			: (data.posts as Post[])
	);

	function getAuthor(authorId: string) {
		return (data.users as User[]).find((u) => u.id === authorId);
	}

	function toggleTag(tagName: string) {
		activeTag = activeTag === tagName ? null : tagName;
	}
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-semibold">Trending Tags</h2>
<div class="mb-6 flex flex-wrap gap-2" data-test="trending-tags">
	{#each data.tags as tag}
		<button
			onclick={() => toggleTag(tag.name)}
			class="rounded-full px-3 py-1 text-sm transition-colors"
			class:bg-blue-600={activeTag === tag.name}
			class:text-white={activeTag === tag.name}
			class:bg-gray-100={activeTag !== tag.name}
			class:dark:bg-gray-700={activeTag !== tag.name}
			class:text-gray-700={activeTag !== tag.name}
			class:dark:text-gray-300={activeTag !== tag.name}
			data-test="tag-chip"
			data-active={activeTag === tag.name ? 'true' : 'false'}
		>
			#{tag.name} <span class="opacity-70">({tag.postCount})</span>
		</button>
	{/each}
</div>

{#if activeTag}
	<h2 class="mb-2 font-semibold">Posts tagged #{activeTag}</h2>
	<div data-test="popular-posts">
		{#each filteredPosts as post}
			{@const author = getAuthor(post.authorId)}
			<div class="border-b border-gray-200 py-3 dark:border-gray-700" data-test="post-card">
				<div class="mb-1 text-sm text-gray-500 dark:text-gray-400">
					<a href="{base}/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100" data-test="post-author">{author?.displayName}</a>
					<span>@{author?.handle}</span>
				</div>
				<a href="{base}/post/{post.id}" class="block">
					<p class="text-gray-900 dark:text-gray-100" data-test="post-content">{post.content}</p>
				</a>
			</div>
		{/each}
	</div>
{/if}

<h2 class="mb-2 font-semibold">Suggested Users</h2>
<div data-test="suggested-users">
	{#each data.users as user}
		<div class="flex items-center gap-3 border-b border-gray-200 py-3 dark:border-gray-700" data-test="user-card">
			<img src={user.avatar} alt={user.displayName} class="h-10 w-10 rounded-full" />
			<div class="flex-1">
				<a href="{base}/profile/{user.handle}" class="font-medium text-gray-900 dark:text-gray-100">{user.displayName}</a>
				<p class="text-sm text-gray-500 dark:text-gray-400">@{user.handle}</p>
				<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
			</div>
		</div>
	{/each}
</div>
