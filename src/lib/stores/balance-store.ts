import { writable } from 'svelte/store';
import type { PublicKey, Connection } from '@solana/web3.js';

type BalanceStore = {
	balance: number;
};

type BalancesStore = {
	balance: number;
	credit: number
};

type LamportsStore = {
	credit: number;
};



function createBalanceStore() {
	const { subscribe, set } = writable<BalanceStore>({ balance: 0 });

	return {
		subscribe,
		getUserUSDCBalance: async (publicKey: PublicKey, connection: Connection) => {

			let balance = 0;

			try {

				let
				bal = (await connection.getTokenAccountBalance(publicKey, 'confirmed')).value.uiAmount;
				// balance = balance / LAMPORTS_PER_SOL;
				if (bal == null || undefined) bal = 0
				set({ balance: bal });

			} catch (e) {

				console.log(`error getting balance: `, e);

			}
		},
	};
}
function createBalancesStore() {
	const { subscribe, set } = writable<BalancesStore>({ balance: 0, credit: 0 });

	return {
		subscribe,
		getUserBalances: async (usdc: PublicKey, pubkey: PublicKey, connection: Connection) => {

			let balance = 0;
			let credit = 0;

			try {

				
				let bal = (await connection.getTokenAccountBalance(usdc, 'confirmed')).value.uiAmount;
				// balance = balance / LAMPORTS_PER_SOL;
				if (bal == null || undefined) bal = 0
				let cred = (await connection.getBalance(pubkey, 'confirmed'));
				if (cred == null || undefined) cred = 0
				set({ balance: bal, credit: cred });

			} catch (e) {

				console.log(`error getting balance: `, e);

			}
		},
	};
}

function createLamportsStore() {
	const { subscribe, set } = writable<LamportsStore>({ credit: 0 });

	return {
		subscribe,
		getUserMLBalance: async (publicKey: PublicKey, connection: Connection) => {

			let balance = 0;

			try {

				let
				bal = (await connection.getBalance(publicKey, 'confirmed'));
				// balance = balance / LAMPORTS_PER_SOL;
				if (bal == null || undefined) bal = 0
				set({ credit: bal });

			} catch (e) {

				console.log(`error getting balance: `, e);

			}
		},
	};
}

export const balanceStore = createBalanceStore();
export const balancesStore = createBalancesStore();
export const lamportsStore = createLamportsStore();
