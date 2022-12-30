<script lang="ts">
	import ArticlesWidget from '$lib/components/ArticlesWidget.svelte';

	import { showWeb3Modal, providerState } from '$lib/provider';

	const toggleModal = () => {
		showWeb3Modal.update((v) => !v);
	};
</script>

<div class="px-2">
	<div class="flex flex-col">
		<article class="prose text-center prose-sm">
			<h2>Articles on software, blockchains and web3.</h2>
		{#if $providerState.type === 'disconnected'}
			<p>Many of the articles are interactive and require a web3 wallet.</p>
		{/if}
		</article>
		{#if $providerState.type === 'disconnected'}
			<div class="my-4 flex gap-4 justify-center">
				<button class="btn btn-primary normal-case" on:click={toggleModal}>Connect Wallet</button>
				<a class="btn normal-case" href="/articles/web3/setup">Setup Wallet</a>
			</div>
		{/if}
    <ArticlesWidget/>
	</div>
</div>
