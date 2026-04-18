<script lang="ts">
	import { base } from '$app/paths';
	import type { Tag, User } from '$lib/types';

	let { data } = $props();

	let activeTag = $state<string | null>(null);
	type UserState = User & { following: boolean };
	let users = $state<UserState[]>(data.users.map((u: User) => ({ ...u, following: false })));

	let filteredPosts = $derived(
		activeTag
			? data.posts.filter((p: { tags: string[] }) => p.tags.includes(activeTag!))
			: data.posts
	);

	function toggleTag(tagName: string) {
		activeTag = activeTag === tagName ? null : tagName;
	}

	function toggleFollow(userId: string) {
		users = users.map((u) =>
			u.id === userId ? { ...u, following: !u.following } : u
		);
	}
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-semibold">Trending Tags</h2>
<div class="mb-6 flex flex-wrap gap-2">
	{#each data.tags as tag (tag.name)}
		<button
			data-test="tag-chip"
			data-active={activeTag === tag.name}
			onclick={() => toggleTag(tag.name)}
			class="rounded px-3 py-1 text-sm {activeTag === tag.name ? 'bg-blue-600 text-white active' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'}"
		>
			#{tag.name}
			<span data-test="tag-post-count" class="ml-1 text-xs opacity-75">({tag.postCount})</span>
		</button>
	{/each}
</div>

<!-- Posts section -->
{#if activeTag}
	<h2 class="mb-2 font-semibold">Posts tagged #{activeTag}</h2>
	<div data-test="filtered-posts">
		{#each filteredPosts as post (post.id)}
			<div class="border-b border-gray-200 py-3 dark:border-gray-700">
				<a href="{base}/post/{post.id}" class="text-sm text-gray-800 hover:underline dark:text-gray-200">{post.content}</a>
			</div>
		{/each}
	</div>
{:else}
	<h2 class="mb-2 font-semibold">Popular Posts</h2>
	<div data-test="popular-posts">
		{#each filteredPosts.slice(0, 5) as post (post.id)}
			<div class="border-b border-gray-200 py-3 dark:border-gray-700">
				<a href="{base}/post/{post.id}" class="text-sm text-gray-800 hover:underline dark:text-gray-200">{post.content}</a>
			</div>
		{/each}
	</div>
{/if}

<h2 class="mb-2 mt-6 font-semibold">Suggested People</h2>
{#each users as user (user.id)}
	<div data-test="suggested-user" class="flex items-center justify-between border-b border-gray-200 py-3 dark:border-gray-700">
		<div>
			<a href="{base}/profile/{user.handle}" class="font-medium hover:underline">{user.displayName}</a>
			<span class="ml-1 text-sm text-gray-500 dark:text-gray-400">@{user.handle}</span>
			<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
		</div>
		<button
			data-test="follow-button"
			onclick={() => toggleFollow(user.id)}
			class="ml-4 rounded border px-3 py-1 text-sm {user.following ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300'}"
		>
			{user.following ? 'Unfollow' : 'Follow'}
		</button>
	</div>
{/each}
