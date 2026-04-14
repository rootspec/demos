<script lang="ts">
	import type { Post, Tag, User } from '$lib/types';

	let { data } = $props();

	let activeTag = $state<string | null>(null);

	let filteredPosts = $derived<Post[]>(
		activeTag
			? (data.posts as Post[]).filter((p: Post) => p.tags.includes(activeTag!))
			: []
	);

	function getAuthor(authorId: string) {
		return (data.users as User[]).find((u: User) => u.id === authorId);
	}

	function toggleTag(tagName: string) {
		activeTag = activeTag === tagName ? null : tagName;
	}
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-semibold">Trending Tags</h2>
<div data-test="trending-tags" class="mb-6 flex flex-wrap gap-2">
	{#each data.tags as tag (tag.name)}
		<button
			data-test="tag-item"
			data-active={activeTag === tag.name}
			onclick={() => toggleTag(tag.name)}
			class="rounded px-3 py-1 text-sm transition-colors {activeTag === tag.name
				? 'bg-blue-600 text-white'
				: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'}"
		>
			#{tag.name} <span class="opacity-70">({tag.postCount})</span>
		</button>
	{/each}
</div>

{#if activeTag}
	<div data-test="filtered-posts" class="mb-6">
		<h2 class="mb-2 font-semibold">Posts tagged #{activeTag}</h2>
		{#each filteredPosts as post (post.id)}
			{@const author = getAuthor(post.authorId)}
			<div data-test="post-card" class="border-b border-gray-200 py-3 dark:border-gray-700">
				<div class="mb-1 text-sm text-gray-500">
					<a href="/demos/scaffold/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
				</div>
				<a href="/demos/scaffold/post/{post.id}">
					<p data-test="post-content">{post.content}</p>
				</a>
			</div>
		{/each}
		{#if filteredPosts.length === 0}
			<p class="text-sm text-gray-400">No posts with this tag.</p>
		{/if}
	</div>
{/if}

<h2 class="mb-2 font-semibold">Suggested Users</h2>
<div data-test="suggested-users">
	{#each data.users as user (user.id)}
		<div data-test="user-item" class="border-b border-gray-200 py-3 dark:border-gray-700">
			<a href="/demos/scaffold/profile/{user.handle}" class="font-medium">{user.displayName}</a>
			<span class="text-sm text-gray-500 dark:text-gray-400">@{user.handle}</span>
			<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
		</div>
	{/each}
</div>
