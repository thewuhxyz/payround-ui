<script lang="ts">
	import { goto } from '$app/navigation';
	import AppLayout from '$lib/components/AppLayout.svelte';
	import type { LayoutData } from './$types';

	import { Modal, storePopup } from '@skeletonlabs/skeleton';
	import { WalletMultiButton, WalletProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import { getLocalStorage, walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
	import { browser } from '$app/environment';
	import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
	import { payroundClientStore } from '$lib/stores/payroundClientStore';
	import PayroundClientProvider from '$lib/components/PayroundClientProvider.svelte';
	import { balanceStore, balancesStore } from '$lib/stores/balance-store';
	import { get } from 'svelte/store';
	import { truncate } from '$lib/helpers';
	import { PayroundClient } from '$lib/payround/protocol';

	// export let data: LayoutData;

	const localStorageKey = 'walletAdapter';
	// const endpoint = WalletAdapterNetwork.Devnet;
	const network = clusterApiUrl('devnet');
	// const network = 'http://localhost:8899';

	let wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

	let balances: number = 0;
	let address: string = '';
	let pubkey: string = '';
	let credits: number = 0;

	$: autoConnect = browser && Boolean(getLocalStorage('autoconnect', true));

	$: walletStore;
	$: balances;
	$: address;
	$: credits;
	$: pubkey;

	$: ({ connected } = $walletStore);
	$: ({ sendTransaction, signTransaction, signAllTransactions, signMessage, publicKey } =
		$walletStore);

	// Create some variables to react to Stores' state
	$: hasWorkspaceProgramReady =
		$payroundClientStore && $payroundClientStore.userId == $walletStore.publicKey;

	$: hasWalletReadyForFetch =
		$walletStore.connected && !$walletStore.connecting && !$walletStore.disconnecting;

	$: if (hasWalletReadyForFetch && hasWorkspaceProgramReady) {
		console.log('Wallet and Workspace ready!');

		// balanceStore.getUserUSDCBalance($walletStore.publicKey as PublicKey, $payroundClientStore.connection);
		balancesStore.getUserBalances(
			$payroundClientStore.usdcAddress as PublicKey,
			$payroundClientStore.pubkey,
			$payroundClientStore.connection
		);

		address = $payroundClientStore.pubkey.toBase58();
		pubkey = $payroundClientStore.userId.toBase58();
		// balances =  $balancesStore.balance;
		// credits =  $balancesStore.credit;
	}

	$: balance =  $balancesStore.balance;
	$: credit =  $balancesStore.credit;

	// balance = $balancesStore.balance.toLocaleString()
	// credit = ($balancesStore.credit - PayroundClient.ACCOUNT_RENT)/PayroundClient.MSOL
	// $: balance = connected && data.balance
	// $: account = connected && data.user
	// $: credit = connected && data.credit

	// $: console.log("credit:", credit)
</script>

<WalletProvider {localStorageKey} {wallets} {autoConnect} />
<PayroundClientProvider {network} />
<AppLayout
	route={'w3'}
	show={true}
	address={address || ''}
	balance={balance.toFixed(2) || "0"}
	credit={credit.toFixed(2) || '0'}
	email={truncate(pubkey, 10) || ''}
	name={''}
>
	<slot />
</AppLayout>