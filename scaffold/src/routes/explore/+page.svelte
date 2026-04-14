<script lang="ts">
	import { base } from '$app/paths';

	let { data } = $props();

	let selectedTag = $state<string | null>(null);

	let filteredPosts = $derived(
		selectedTag
			? data.posts.filter((p: { tags: string[] }) => p.tags.includes(selectedTag!))
			: []
	);

	function getAuthor(authorId: string) {
		return data.users.find((u: { id: string }) => u.id === authorId);
	}

	function selectTag(name: string) {
		selectedTag = selectedTag === name ? null : name;
	}
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-bold">Trending Tags</h2>
<div class="mb-6 flex flex-wrap gap-2">
	{#each data.tags as tag}
		<button
			onclick={() => selectTag(tag.name)}
			class="rounded px-2 py-1 text-sm"
			class:selected={selectedTag === tag.name}
			class:bg-blue-600={selectedTag === tag.name}
			class:text-white={selectedTag === tag.name}
			class:bg-gray-100={selectedTag !== tag.name}
			class:text-gray-700={selectedTag !== tag.name}
			data-test="tag-chip"
		>
			#{tag.name} <span class="opacity-70">({tag.postCount})</span>
		</button>
	{/each}
</div>

{#if selectedTag}
	<h2 class="mb-2 font-bold">Posts tagged #{selectedTag}</h2>
	<div data-test="filtered-posts">
		{#each filteredPosts as post}
			{@const author = getAuthor(post.authorId)}
			<div class="border-b border-gray-200 py-3 dark:border-gray-700">
				<div class="mb-1 text-sm text-gray-500">
					<a href="{base}/profile/{author?.handle}" class="font-medium text-gray-900 dark:text-gray-100">{author?.displayName}</a>
				</div>
				<a href="{base}/post/{post.id}">
					<p class="text-gray-900 dark:text-gray-100">{post.content}</p>
				</a>
			</div>
		{/each}
	</div>
{/if}

<h2 class="mb-2 mt-6 font-bold">People</h2>
{#each data.users as user}
	<div class="border-b border-gray-200 py-3 dark:border-gray-700" data-test="suggested-user">
		<a href="{base}/profile/{user.handle}" class="font-medium">{user.displayName}</a>
		<span class="text-sm text-gray-500">@{user.handle}</span>
		<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
	</div>
{/each}
