<script lang="ts">
	let { data } = $props();
</script>

{#if data.user}
	<h1 class="text-xl font-bold">{data.user.displayName}</h1>
	<p class="text-sm text-gray-500">@{data.user.handle}</p>
	<p class="mt-2">{data.user.bio}</p>
	<div class="mt-2 text-sm text-gray-400">
		{data.user.followerCount} followers &middot; {data.user.followingCount} following
	</div>

	<h2 class="mb-2 mt-6 font-bold">Posts</h2>
	{#each data.posts as post}
		<div class="border-b border-gray-200 py-3">
			<a href="/post/{post.id}">
				<p>{post.content}</p>
			</a>
			<div class="mt-1 text-xs text-gray-400">
				{post.likeCount} likes &middot; {post.repostCount} reposts
			</div>
		</div>
	{/each}
{:else}
	<p>User not found.</p>
{/if}
