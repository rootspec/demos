<script lang="ts">
	let { data } = $props();
</script>

<h1 class="mb-4 text-xl font-bold">Explore</h1>

<h2 class="mb-2 font-bold">Trending Tags</h2>
<div class="mb-6 flex flex-wrap gap-2">
	{#each data.tags as tag}
		<span class="rounded bg-gray-100 px-2 py-1 text-sm">
			#{tag.name} <span class="text-gray-400">({tag.postCount})</span>
		</span>
	{/each}
</div>

<h2 class="mb-2 font-bold">People</h2>
{#each data.users as user}
	<div class="border-b border-gray-200 py-3">
		<a href="/profile/{user.handle}" class="font-medium">{user.displayName}</a>
		<span class="text-sm text-gray-500">@{user.handle}</span>
		<p class="text-sm text-gray-600">{user.bio}</p>
	</div>
{/each}
