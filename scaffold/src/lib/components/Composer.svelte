<script lang="ts">
	import { feed } from '$lib/stores/feed.svelte';

	let content = $state('');
	let error = $state('');

	function submit() {
		if (!content.trim()) {
			error = 'Post cannot be empty';
			return;
		}
		feed.addPost(content.trim());
		content = '';
		error = '';
	}
</script>

<div class="mb-6 border-b border-gray-200 pb-4 dark:border-gray-700" data-test="composer">
	<textarea
		bind:value={content}
		placeholder="What's on your mind?"
		class="w-full resize-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
		rows="3"
		data-test="composer-input"
	></textarea>
	{#if error}
		<p class="mt-1 text-sm text-red-500" data-test="composer-error">{error}</p>
	{/if}
	<div class="mt-2 flex items-center justify-between">
		<span class="text-xs text-gray-400">{content.length}/300</span>
		<button
			onclick={submit}
			class="rounded bg-blue-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
			data-test="composer-submit"
		>
			Post
		</button>
	</div>
</div>
