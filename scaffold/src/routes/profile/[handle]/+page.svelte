<script lang="ts">
	import { profile } from '$lib/stores/profile.svelte';

	let { data } = $props();
</script>

{#if data.user}
	<div class="mb-4">
		<h1 data-test="profile-name" class="text-xl font-bold">{data.user.displayName}</h1>
		<p data-test="profile-handle" class="text-sm text-gray-500 dark:text-gray-400">@{data.user.handle}</p>
		<p data-test="profile-bio" class="mt-2">{data.user.bio}</p>
		<div class="mt-2 text-sm text-gray-400">
			<span data-test="follower-count">{data.user.followerCount}</span> followers &middot;
			{data.user.followingCount} following
		</div>
		<button
			data-test="follow-btn"
			data-following={profile.isFollowing(data.user.id)}
			onclick={() => profile.toggleFollow(data.user.id)}
			class="mt-3 rounded border px-4 py-1.5 text-sm {profile.isFollowing(data.user.id)
				? 'bg-blue-600 text-white border-blue-600'
				: 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300'}"
		>
			{profile.isFollowing(data.user.id) ? 'Unfollow' : 'Follow'}
		</button>
	</div>

	<h2 class="mb-2 mt-6 font-bold">Posts</h2>
	{#each data.posts as post (post.id)}
		<div data-test="post-card" class="border-b border-gray-200 py-3 dark:border-gray-700">
			<a href="/demos/scaffold/post/{post.id}">
				<p data-test="post-content">{post.content}</p>
			</a>
			<div class="mt-1 text-xs text-gray-400">
				{post.likeCount} likes &middot; {post.repostCount} reposts
			</div>
		</div>
	{/each}
{:else}
	<p>User not found.</p>
{/if}
