<script lang="ts">
	import { base } from '$app/paths';

	let { data } = $props();

	let activeTag = $state<string | null>(null);

	let filteredPosts = $derived(
		activeTag
			? data.posts?.filter((p: { tags: string[] }) => p.tags.includes(activeTag!)) ?? []
			: data.posts ?? []
	);

	function selectTag(name: string) {
		activeTag = activeTag === name ? null : name;
	}
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-bold">Trending Tags</h2>
<div class="mb-6 flex flex-wrap gap-2">
	{#each data.tags as tag}
		<button
			onclick={() => selectTag(tag.name)}
			class="rounded px-2 py-1 text-sm"
			class:bg-blue-600={activeTag === tag.name}
			class:text-white={activeTag === tag.name}
			class:active={activeTag === tag.name}
			class:bg-gray-100={activeTag !== tag.name}
			data-test="tag-chip"
		>
			#{tag.name} <span class="opacity-70">({tag.postCount})</span>
		</button>
	{/each}
</div>

{#if activeTag}
	<div class="mb-2 text-sm font-medium text-blue-600" data-test="active-tag">
		Showing posts tagged #{activeTag}
		<button onclick={() => { activeTag = null; }} class="ml-2 text-gray-400 hover:text-gray-600">✕</button>
	</div>
	{#if filteredPosts.length === 0}
		<p class="text-gray-400">No posts for this tag.</p>
	{:else}
		{#each filteredPosts as post}
			<div class="border-b border-gray-200 py-3 dark:border-gray-700" data-test="explore-post">
				<p class="text-gray-900 dark:text-gray-100">{post.content}</p>
			</div>
		{/each}
	{/if}
{/if}

<h2 class="mb-2 font-bold">People</h2>
{#each data.users as user}
	<div class="border-b border-gray-200 py-3 dark:border-gray-700" data-test="suggested-user">
		<a href="{base}/profile/{user.handle}" class="font-medium text-gray-900 hover:underline dark:text-gray-100" data-test="suggested-user-link">{user.displayName}</a>
		<span class="text-sm text-gray-500">@{user.handle}</span>
		<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
	</div>
{/each}
