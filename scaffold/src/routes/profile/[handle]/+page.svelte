<script lang="ts">
	let { data } = $props();

	let isFollowing = $state(false);

	function toggleFollow() {
		isFollowing = !isFollowing;
	}
</script>

{#if data.user}
	<div class="mb-6">
		<h1 data-test="profile-display-name" class="text-xl font-bold">{data.user.displayName}</h1>
		<p class="text-sm text-gray-500 dark:text-gray-400">@{data.user.handle}</p>
		<p data-test="profile-bio" class="mt-2 text-gray-700 dark:text-gray-300">{data.user.bio}</p>
		<div class="mt-2 flex items-center gap-4">
			<span data-test="profile-follower-count" class="text-sm text-gray-500 dark:text-gray-400">
				{isFollowing ? data.user.followerCount + 1 : data.user.followerCount} followers
			</span>
			<span class="text-sm text-gray-500 dark:text-gray-400">{data.user.followingCount} following</span>
			<button
				data-test="follow-button"
				onclick={toggleFollow}
				class="rounded px-4 py-1.5 text-sm font-medium transition-colors {isFollowing
					? 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'
					: 'bg-blue-600 text-white hover:bg-blue-700'}"
			>
				{isFollowing ? 'Unfollow' : 'Follow'}
			</button>
		</div>
	</div>

	<h2 class="mb-2 font-bold">Posts</h2>
	{#each data.posts as post}
		<div data-test="profile-post-item" class="border-b border-gray-200 py-3 dark:border-gray-700">
			<a href="/demos/scaffold/post/{post.id}" class="block">
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
