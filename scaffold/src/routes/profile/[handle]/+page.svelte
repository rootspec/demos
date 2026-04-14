<script lang="ts">
	import { base } from '$app/paths';
	import { profile } from '$lib/stores/profile.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import type { User } from '$lib/types';

	let { data } = $props();

	let following = $derived(data.user ? profile.isFollowing(data.user.id) : false);

	function getAuthor(authorId: string) {
		return (data.users as User[]).find((u) => u.id === authorId);
	}
</script>

{#if data.user}
	<div data-test="profile-header" class="mb-6 border-b border-gray-200 pb-6 dark:border-gray-700">
		<div class="flex items-start justify-between">
			<div>
				<h1 class="text-xl font-bold text-gray-900 dark:text-gray-100" data-test="profile-displayname">{data.user.displayName}</h1>
				<p class="text-sm text-gray-500 dark:text-gray-400" data-test="profile-handle">@{data.user.handle}</p>
				<p class="mt-2 text-gray-700 dark:text-gray-300" data-test="profile-bio">{data.user.bio}</p>
				<div class="mt-3 flex gap-4 text-sm">
					<span class="text-gray-600 dark:text-gray-400" data-test="follower-count">
						<strong class="text-gray-900 dark:text-gray-100">{data.user.followerCount}</strong> followers
					</span>
					<span class="text-gray-600 dark:text-gray-400" data-test="following-count">
						<strong class="text-gray-900 dark:text-gray-100">{data.user.followingCount}</strong> following
					</span>
				</div>
			</div>
			<button
				onclick={() => profile.toggleFollow(data.user!.id)}
				class="rounded px-4 py-2 text-sm font-medium transition-colors"
				class:bg-blue-600={following}
				class:text-white={following}
				class:border={!following}
				class:border-gray-300={!following}
				class:dark:border-gray-600={!following}
				class:text-gray-700={!following}
				class:dark:text-gray-300={!following}
				data-test="follow-button"
				data-following={following ? 'true' : 'false'}
			>
				{following ? 'Unfollow' : 'Follow'}
			</button>
		</div>
	</div>

	<h2 class="mb-3 font-semibold">Posts</h2>
	{#each data.posts as post}
		<PostCard {post} author={getAuthor(post.authorId)} />
	{/each}
{:else}
	<div data-test="user-not-found">
		<p class="text-gray-500">User not found.</p>
	</div>
{/if}
