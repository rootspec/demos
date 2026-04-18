<script lang="ts">
	let { data } = $props();

	let following = $state(false);

	function toggleFollow() {
		following = !following;
	}
</script>

{#if data.user}
	<div class="mb-6">
		<div class="flex items-start justify-between">
			<div>
				<h1 data-test="profile-display-name" class="text-xl font-bold">{data.user.displayName}</h1>
				<p data-test="profile-handle" class="text-sm text-gray-500">@{data.user.handle}</p>
			</div>
			<button
				data-test="follow-btn"
				data-following={following ? 'true' : 'false'}
				onclick={toggleFollow}
				class="rounded px-4 py-1.5 text-sm {following ? 'bg-blue-600 text-white active' : 'border border-gray-300 dark:border-gray-600'}"
			>
				{following ? 'Unfollow' : 'Follow'}
			</button>
		</div>
		<p data-test="profile-bio" class="mt-2 text-gray-700 dark:text-gray-300">{data.user.bio}</p>
		<div class="mt-2 text-sm text-gray-400">
			{data.user.followerCount} followers &middot; {data.user.followingCount} following
		</div>
	</div>

	<h2 class="mb-2 font-semibold">Posts</h2>
	<div data-test="profile-posts">
		{#each data.posts as post}
			<div class="border-b border-gray-200 py-3 dark:border-gray-700">
				<a href="/demos/scaffold/post/{post.id}" class="block hover:underline">
					<p>{post.content}</p>
				</a>
				<div class="mt-1 text-xs text-gray-400">
					{post.likeCount} likes &middot; {post.repostCount} reposts
				</div>
			</div>
		{/each}
	</div>
{:else}
	<p>User not found.</p>
{/if}
