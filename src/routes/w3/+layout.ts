import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import { payroundClientStore } from '$lib/stores/payroundClientStore';
import type { LayoutLoad, PageLoad } from './$types';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';

console.log('/pdas PAGE.ts');

export const ssr = false

export const load = (async ({ fetch, params }) => {

	// const SOLANA_ANCHOR_SVELTEKIT_SKELETON_STARTER_PROGRAM_ID = new anchor.web3.PublicKey(
	//   '7j6ARQdmgrJwEqgJDHC82nvwQX26qcDF79osU6M7kmui'
	// );

	// U: Moved to a +page.ts so can invalidateAll() to rerun load()
	// NOTE No longer need to rebuild Anchor since I have workspaceStore
	async function getCredit() {
		if (!get(walletStore).publicKey) return;
		if (!get(payroundClientStore)) return;

		const balance = await get(payroundClientStore).getPubkeyBalance()
		

    return balance
	}
	async function getBalance() {
		if (!get(walletStore).publicKey) return;
		if (!get(payroundClientStore)) return;

		const balance = await get(payroundClientStore).connection.getTokenAccountBalance(
			get(payroundClientStore).usdcAddress
		);
		

    return balance.value.uiAmountString
	}
	async function isAccountCreated() {
		// console.log("here:");
		
		if (!get(walletStore).publicKey) return null;
		if (!get(payroundClientStore)) return null;

		const userId = get(payroundClientStore).userId.toBase58()
		const req = await fetch('/w3/api/account', {
			method: 'POST',
			body: JSON.stringify({address: userId})
		});
		console.log("here");
		
		const { account } = await req.json()

		console.log("account:", account)
		// console.log("req:", some)
		return await account as boolean

	}

	// const created = await isAccountCreated()
	// if (created == null) return null
	// if (!created) throw goto("/w3/create")

	return {
		user: await isAccountCreated(),
    balance: await getBalance(),
		credit: await getCredit()

	};
}) satisfies LayoutLoad;
