<script lang="ts">
	import { base } from '$app/paths';
	import { profile } from '$lib/stores/profile.svelte';

	let { data } = $props();
</script>

{#if data.user}
	<div class="mb-4">
		<h1 data-test="profile-name" class="text-xl font-bold">{data.user.displayName}</h1>
		<p data-test="profile-handle" class="text-sm text-gray-500">@{data.user.handle}</p>
		<p data-test="profile-bio" class="mt-2 text-gray-900 dark:text-gray-100">{data.user.bio}</p>
		<div class="mt-2 flex gap-4 text-sm text-gray-400">
			<span data-test="profile-follower-count">{data.user.followerCount} followers</span>
			<span data-test="profile-following-count">{data.user.followingCount} following</span>
		</div>
		<div class="mt-3">
			<button
				data-test="follow-btn"
				onclick={() => profile.toggleFollow(data.user.id)}
				class="rounded border px-4 py-1 text-sm {profile.isFollowing(data.user.id)
					? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
					: 'border-gray-400 text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'}"
			>
				{profile.isFollowing(data.user.id) ? 'Unfollow' : 'Follow'}
			</button>
		</div>
	</div>

	<h2 class="mb-2 mt-6 font-bold">Posts</h2>
	{#each data.posts as post}
		<div data-test="profile-post" class="border-b border-gray-200 py-3 dark:border-gray-700">
			<a href="{base}/post/{post.id}" class="block text-gray-900 dark:text-gray-100">
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
