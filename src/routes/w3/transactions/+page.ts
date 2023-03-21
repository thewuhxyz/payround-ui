import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import { payroundClientStore } from '$lib/stores/payroundClientStore';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';


export const load = (async ({ fetch, parent }) => {
	
	async function getTxFormatedData() {
		if (!get(walletStore).publicKey) return;
		if (!get(payroundClientStore)) return;

		const balance = await get(payroundClientStore).connection.getTokenAccountBalance(
			get(payroundClientStore).usdcAddress
		);
		// console.log('balance from load: ', balance);
		// if (balance.value.uiAmount == 0) return null
		const txs = await get(payroundClientStore).formatTxData(10)
		console.log(txs)
		return txs
	}

	await parent();

	return {
		txFormatedData: getTxFormatedData()
	};
}) satisfies PageLoad;

