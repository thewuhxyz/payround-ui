<script lang="ts">
	import { goto } from '$app/navigation';
	import { PayroundClient } from '$lib/payround/protocol';
	import { balanceStore } from '$lib/stores/balance-store';
	import { payroundClientStore } from '$lib/stores/payroundClientStore';
	import { AnchorProvider } from '@project-serum/anchor';
	import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
	import type {  PublicKey } from '@solana/web3.js';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';
	import { redirect } from '@sveltejs/kit';
	import { get } from 'svelte/store';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ connected } = $walletStore);
	$: ({ sendTransaction, signTransaction, signAllTransactions, signMessage } = $walletStore);

	$: isAccountCreated = connected && data.isAccountCreated;
	$: publickey = connected && $payroundClientStore.pubkey.toBase58();

	$: connected &&
		balanceStore.getUserUSDCBalance($payroundClientStore.usdcAddress as PublicKey, $payroundClientStore.connection);


	let createAccount = async () => {
		const tx = await $payroundClientStore.createAccountTx('some account 1');
		console.log('tx:', tx);
	};

	let acc;

	async function isAccountCreate() {
		console.log('here:');

		const userId = get(payroundClientStore).userId.toBase58();
		const req = await fetch('/w3/api/account', {
			method: 'POST',
			body: JSON.stringify({ address: userId })
		});
		console.log('here');

		const { account } = await req.json();

		console.log('account:', account);
		// console.log("req:", some)
		if (account) await goto('/w3/dashboard');
		else await goto('/w3/create');
		// else 
	}
	// $: createAccount = $payroundClientStore.createAccountTx("account 1")
</script>

<div class="mx-10">
	<!-- <WalletMultiButton /> -->
	{#if publickey}
			<button class="bg-secondary-500 w-sm rounded-3xl p-4 my-2 btn" on:click={isAccountCreate}>Launch Account</button>
			{:else}
			CONNECT YOUR WALLET
		{/if}
</div>
