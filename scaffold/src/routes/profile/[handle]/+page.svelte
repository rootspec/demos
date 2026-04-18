<script lang="ts">
	import { base } from '$app/paths';
	import type { Post, User } from '$lib/types';

	let { data } = $props();

	let following = $state(false);
	let followerCount = $state(data.user?.followerCount ?? 0);

	function toggleFollow() {
		following = !following;
		followerCount = following ? followerCount + 1 : followerCount - 1;
	}

	function getAuthor(authorId: string): User | undefined {
		return data.users?.find((u: User) => u.id === authorId);
	}
</script>

{#if data.user}
	<div class="mb-6">
		<h1 data-test="profile-display-name" class="text-xl font-bold">{data.user.displayName}</h1>
		<p class="text-sm text-gray-500 dark:text-gray-400">@{data.user.handle}</p>
		<p data-test="profile-bio" class="mt-2 text-gray-700 dark:text-gray-300">{data.user.bio}</p>
		<div class="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
			<span><span data-test="profile-follower-count" class="font-semibold text-gray-900 dark:text-gray-100">{followerCount}</span> followers</span>
			<span><span data-test="profile-following-count" class="font-semibold text-gray-900 dark:text-gray-100">{data.user.followingCount}</span> following</span>
		</div>
		<button
			data-test="follow-button"
			onclick={toggleFollow}
			class="mt-3 rounded border px-4 py-1 text-sm {following ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300'}"
		>
			{following ? 'Unfollow' : 'Follow'}
		</button>
	</div>

	<h2 class="mb-2 font-semibold">Posts</h2>
	{#each data.posts as post (post.id)}
		<div data-test="post-item" class="border-b border-gray-200 py-3 dark:border-gray-700">
			<a href="{base}/post/{post.id}" class="text-gray-900 hover:underline dark:text-gray-100">
				<p>{post.content}</p>
			</a>
			<div class="mt-1 flex gap-4 text-xs text-gray-400">
				<span>♡ <span data-test="post-like-count">{post.likeCount}</span></span>
				<span>↻ <span data-test="post-repost-count">{post.repostCount}</span></span>
			</div>
		</div>
	{/each}
{:else}
	<p>User not found.</p>
{/if}
