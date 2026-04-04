<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import { profile } from '$lib/stores/profile.svelte';

	let { data } = $props();

	let isFollowing = $derived(data.user ? profile.isFollowing(data.user.id) : false);
	let displayFollowers = $derived(
		data.user ? data.user.followerCount + (isFollowing ? 1 : 0) : 0
	);
</script>

{#if data.user}
	<div class="mb-6">
		<div class="flex items-start gap-4">
			<img
				src={data.user.avatar}
				alt={data.user.displayName}
				class="h-16 w-16 rounded-full"
				data-test="profile-avatar"
			/>
			<div class="flex-1">
				<h1 class="text-xl font-bold" data-test="profile-display-name">{data.user.displayName}</h1>
				<p class="text-sm text-gray-500 dark:text-gray-400">@{data.user.handle}</p>
				<p class="mt-2" data-test="profile-bio">{data.user.bio}</p>
				<div class="mt-2 text-sm text-gray-400 dark:text-gray-500">
					<span data-test="follower-count">{displayFollowers} followers</span>
					&middot;
					<span data-test="following-count">{data.user.followingCount} following</span>
				</div>
			</div>
			<button
				onclick={() => data.user && profile.toggleFollow(data.user.id)}
				class="rounded-full px-4 py-1.5 text-sm font-medium {isFollowing
					? 'following border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300'
					: 'bg-blue-500 text-white hover:bg-blue-600'}"
				data-test="follow-button"
			>
				{isFollowing ? 'Following' : 'Follow'}
			</button>
		</div>
	</div>

	<h2 class="mb-2 font-bold">Posts</h2>
	{#each data.posts as post (post.id)}
		<PostCard {post} author={data.user} />
	{/each}
{:else}
	<p data-test="user-not-found">User not found.</p>
{/if}
