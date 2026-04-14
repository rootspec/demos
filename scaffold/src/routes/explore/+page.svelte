<script lang="ts">
	import { base } from '$app/paths';

	let { data } = $props();

	let activeTag = $state<string | null>(null);

	let filteredPosts = $derived(
		activeTag
			? data.posts.filter((p: { tags: string[] }) => p.tags.includes(activeTag!))
			: data.posts
	);

	function toggleTag(tagName: string) {
		activeTag = activeTag === tagName ? null : tagName;
	}
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-bold">Trending Tags</h2>
<div class="mb-6 flex flex-wrap gap-2">
	{#each data.tags as tag}
		<button
			data-test="tag-chip"
			data-active={activeTag === tag.name}
			onclick={() => toggleTag(tag.name)}
			class="rounded px-2 py-1 text-sm {activeTag === tag.name
				? 'active bg-blue-600 text-white'
				: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200'}"
		>
			#{tag.name} <span data-test="tag-post-count" class="opacity-75">({tag.postCount})</span>
		</button>
	{/each}
</div>

<h2 class="mb-2 font-bold">{activeTag ? `Posts tagged #${activeTag}` : 'Posts'}</h2>
{#each filteredPosts as post}
	<div data-test="explore-post" class="border-b border-gray-200 py-3 dark:border-gray-700">
		<a href="{base}/post/{post.id}" class="block text-gray-900 dark:text-gray-100">{post.content}</a>
	</div>
{/each}

<h2 class="mb-2 font-bold">People</h2>
{#each data.users as user}
	<div data-test="suggested-user" class="border-b border-gray-200 py-3 dark:border-gray-700">
		<a
			data-test="suggested-user-link"
			href="{base}/profile/{user.handle}"
			class="font-medium text-gray-900 hover:underline dark:text-gray-100"
		>
			<span data-test="suggested-user-name">{user.displayName}</span>
		</a>
		<span data-test="suggested-user-handle" class="ml-1 text-sm text-gray-500">@{user.handle}</span>
		<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
	</div>
{/each}
