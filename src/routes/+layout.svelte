<script lang="ts">
	import '../theme.postcss';
	// import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { Modal, storePopup, Toast } from '@skeletonlabs/skeleton';
	import { WalletMultiButton, WalletProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import { getLocalStorage, walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
	import { browser } from '$app/environment';
	import { clusterApiUrl } from '@solana/web3.js';

	// export const prerender = false

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ supabase } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => subscription.unsubscribe();
	});
</script>

<!-- <WalletProvider  {localStorageKey} {wallets} {autoConnect} /> -->
<!-- <PayroundClientProvider {network} /> -->

<slot />
<Modal />
<Toast />
