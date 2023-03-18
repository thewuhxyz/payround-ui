import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
import { payroundClientStore } from '$lib/stores/payroundClientStore';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ fetch }) => {
	async function getAddressesData() {
		if (!get(walletStore).publicKey) if (!get(payroundClientStore)) return;

		const userId = get(payroundClientStore).userId.toBase58();
		const req = await fetch('/w3/api/send', {
			method: 'POST',
			body: JSON.stringify({ address: userId })
		});
		const { addresses }  = await req.json();
		console.log("addresses:", addresses);
		return addresses
		
	}

	return {
		// groups,
		addresses: getAddressesData()
	};
};
