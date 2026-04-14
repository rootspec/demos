<script lang="ts">
	import { base } from '$app/paths';
	import { profile } from '$lib/stores/profile.svelte';

	let { data } = $props();

	let following = $derived(data.user ? profile.isFollowing(data.user.id) : false);

	function toggleFollow() {
		if (data.user) profile.toggleFollow(data.user.id);
	}
</script>

{#if data.user}
	<div class="mb-4 flex items-start justify-between">
		<div>
			<h1 class="text-xl font-bold" data-test="user-display-name">{data.user.displayName}</h1>
			<p class="text-sm text-gray-500" data-test="user-handle">@{data.user.handle}</p>
			<p class="mt-2" data-test="user-bio">{data.user.bio}</p>
			<div class="mt-2 flex gap-4 text-sm text-gray-500">
				<span data-test="follower-count"><strong class="text-gray-900 dark:text-gray-100">{data.user.followerCount}</strong> followers</span>
				<span data-test="following-count"><strong class="text-gray-900 dark:text-gray-100">{data.user.followingCount}</strong> following</span>
			</div>
		</div>
		<button
			onclick={toggleFollow}
			class="rounded border px-4 py-1.5 text-sm font-medium {following
				? 'border-blue-600 bg-blue-600 text-white'
				: 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'}"
			data-test="follow-button"
		>
			{following ? 'Following' : 'Follow'}
		</button>
	</div>

	<h2 class="mb-2 mt-6 font-bold">Posts</h2>
	{#each data.posts as post}
		<div class="border-b border-gray-200 py-3 dark:border-gray-700">
			<a href="{base}/post/{post.id}">
				<p class="text-gray-900 dark:text-gray-100">{post.content}</p>
			</a>
			<div class="mt-1 text-xs text-gray-400">
				{post.likeCount} likes &middot; {post.repostCount} reposts
			</div>
		</div>
	{/each}
{:else}
	<p>User not found.</p>
{/if}
