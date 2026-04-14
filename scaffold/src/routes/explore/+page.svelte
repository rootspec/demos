<script lang="ts">
	let { data } = $props();
	let activeTag = $state('');

	let filteredPosts = $derived(
		activeTag
			? data.posts?.filter((p: { tags: string[] }) => p.tags.includes(activeTag)) ?? []
			: []
	);

	function toggleTag(tagName: string) {
		activeTag = activeTag === tagName ? '' : tagName;
	}
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-bold">Trending</h2>
<div class="mb-6 flex flex-wrap gap-2">
	{#each data.tags as tag}
		<button
			data-test="tag-chip"
			onclick={() => toggleTag(tag.name)}
			class="rounded px-3 py-1 text-sm transition-colors {activeTag === tag.name
				? 'active bg-blue-600 text-white'
				: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}"
		>
			#{tag.name} <span class="opacity-70">({tag.postCount})</span>
		</button>
	{/each}
</div>

{#if activeTag && filteredPosts.length > 0}
	<div class="mb-6">
		<h3 class="mb-2 font-semibold text-sm text-gray-500">Posts tagged #{activeTag}</h3>
		{#each filteredPosts as post}
			<div class="border-b border-gray-200 py-3 dark:border-gray-700">
				<a href="/post/{post.id}">
					<p class="text-sm">{post.content}</p>
				</a>
			</div>
		{/each}
	</div>
{/if}

<h2 class="mb-2 font-bold">People</h2>
{#each data.users as user}
	<div class="border-b border-gray-200 py-3 dark:border-gray-700">
		<a href="/profile/{user.handle}" class="font-medium">{user.displayName}</a>
		<span class="text-sm text-gray-500 dark:text-gray-400">@{user.handle}</span>
		<p class="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
	</div>
{/each}
