<script lang="ts">
	import { goto } from '$app/navigation';
	import { PayroundClient } from '$lib/payround/protocol';
	import { payroundClientStore } from '$lib/stores/payroundClientStore';
	import { AnchorProvider } from '@project-serum/anchor';
	import { publicKey } from '@project-serum/anchor/dist/cjs/utils';
	import { clusterApiUrl, Connection } from '@solana/web3.js';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { get } from 'svelte/store';
	import type { PageData } from './$types';

	// export let data: PageData;

	$: ({ connected } = $walletStore);
	$: ({ sendTransaction, signTransaction, signAllTransactions, signMessage } = $walletStore);

	// $: isAccountCreated = connected && data.isAccountCreated;
	let name = '';
	$: accountkey = connected && $payroundClientStore.pubkey.toBase58();
	$: publickey = connected && $payroundClientStore.userId.toBase58();

	let message: Promise<any>;
		let msg: any

	$: message;
	$: msg

	let createAccount = async () => {
		const req = await fetch('/w3/api/account', {
			method: 'POST',
			body: JSON.stringify({ address: publickey })
		});
		console.log('here');

		const { account } = await req.json();

		console.log('account:', account);

		if (account) {
			await goto('/w3/dashboard');
		}

		let rent = await $payroundClientStore.getPubkeyBalance();
		console.log('rent');

		if (rent == 0 || null) {
			const tx = await $payroundClientStore.createAccountTx('some account 1');
			console.log('tx:', tx);
			// rent =  await $payroundClientStore.getPubkeyBalance()
		}
		const response = {
			name,
			address: publickey
			// rent
		};

		const resp = await fetch(`/w3/api/create`, {
			method: 'POST',
			body: JSON.stringify(response)
		});

		// console.log('resp:', resp.json());

		let data = await resp.json();
		msg = data

	};

	// $: createAccount = $payroundClientStore.createAccountTx("account 1")
</script>

<!-- {publickey} -->
<form class="form p-2 max-w-sm" on:submit|preventDefault={createAccount}>
	<!-- <label for="name">
		<input
			class="my-2 px-6 input bg-white text-secondary-500 placeholder:text-secondary-200"
			name="name"
			type="text"
			bind:value={name}
			placeholder="what should we call you? (optional)"
		/>
	</label> -->
	<button class="bg-secondary-500 w-full rounded-3xl p-4 my-2 btn" type="submit"
		>Launch your Account 😎</button
	>
</form>
<div>
	{#if msg}
		<!-- {#await message}
			waiting for message
		{:then msg} -->
			Success: {msg.success}
			Message: {msg.message}
		<!-- {/await} -->
	{/if}
</div>
