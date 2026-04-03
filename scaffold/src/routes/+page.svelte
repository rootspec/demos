<script lang="ts">
	let { data } = $props();

	function getAuthor(authorId: string) {
		return data.users.find((u) => u.id === authorId);
	}
</script>

<h1 class="mb-4 text-xl font-bold">Home Feed</h1>

{#each data.posts as post}
	{@const author = getAuthor(post.authorId)}
	<div class="border-b border-gray-200 py-4">
		<div class="mb-1 text-sm text-gray-500">
			<a href="/profile/{author?.handle}" class="font-medium text-gray-900">{author?.displayName}</a>
			<span>@{author?.handle}</span>
		</div>
		<a href="/post/{post.id}" class="block">
			<p>{post.content}</p>
		</a>
		<div class="mt-2 text-xs text-gray-400">
			{post.likeCount} likes &middot; {post.repostCount} reposts
		</div>
	</div>
{/each}
