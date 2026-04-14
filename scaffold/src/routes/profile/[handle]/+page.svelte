<script lang="ts">
	import { base } from '$app/paths';
	import { profile } from '$lib/stores/profile.svelte';

	let { data } = $props();

	let isFollowing = $derived(data.user ? profile.isFollowing(data.user.id) : false);
</script>

{#if data.user}
	<div class="mb-6">
		<h1 class="text-xl font-bold" data-test="profile-name">{data.user.displayName}</h1>
		<p class="text-sm text-gray-500" data-test="profile-handle">@{data.user.handle}</p>
		<p class="mt-2 text-gray-700 dark:text-gray-300">{data.user.bio}</p>
		<div class="mt-2 text-sm text-gray-400">
			{data.user.followerCount} followers &middot; {data.user.followingCount} following
		</div>
		<button
			onclick={() => profile.toggleFollow(data.user!.id)}
			class="mt-3 rounded border px-4 py-1.5 text-sm font-medium"
			class:bg-blue-600={isFollowing}
			class:text-white={isFollowing}
			class:border-blue-600={isFollowing}
			class:border-gray-300={!isFollowing}
			class:text-gray-700={!isFollowing}
			data-test="follow-button"
		>
			{isFollowing ? 'Following' : 'Follow'}
		</button>
	</div>

	<h2 class="mb-2 mt-6 font-bold">Posts</h2>
	{#each data.posts as post}
		<div class="border-b border-gray-200 py-3 dark:border-gray-700" data-test="post-card">
			<a href="{base}/post/{post.id}">
				<p class="text-gray-900 dark:text-gray-100" data-test="post-content">{post.content}</p>
			</a>
			<div class="mt-1 text-xs text-gray-400">
				{post.likeCount} likes &middot; {post.repostCount} reposts
			</div>
		</div>
	{/each}
{:else}
	<p class="text-gray-500" data-test="profile-not-found">User not found.</p>
{/if}
