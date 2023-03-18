<script lang="ts">
	import { goto } from '$app/navigation';
	import { SigninMessage } from '$lib/login';
	import { PayroundClient } from '$lib/payround/protocol';
	import { payroundClientStore } from '$lib/stores/payroundClientStore';
	import { providerStore } from '$lib/stores/providerStore';
	import { AnchorProvider } from '@project-serum/anchor';
	import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
	// import { balanceStore } from '$lib/stores/balance-store';
	// import { payroundClientStore } from '$lib/stores/payroundClientStore';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { clusterApiUrl, Connection } from '@solana/web3.js';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	// import type { PublicKey } from '@solana/web3.js';
	// import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { WalletModal, WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';

	// export const prerender = false

	

	// const login = async () => {
	// 	if (wallet!) {
	// 		const message = new SigninMessage({
	// 			domain: window.location.host,
	// 			publicKey: wallet.publicKey!.toBase58(),
	// 			statement: `Sign this message to sign in to the app.`,
	// 			nonce: '1'
	// 		});

	// 		const data = new TextEncoder().encode(message.prepare());
	// 		//@ts-ignore
	// 		const signature = await wallet.signMessage(data);
	// 		console.log('signature:', signature);
	// 		const serializedSignature = bs58.encode(signature);
	// 		console.log('serialised signature:', serializedSignature);

	// 		const response = {
	// 			message: JSON.stringify(message),
	// 			signature: serializedSignature
	// 		};

	// 		const resp = await fetch(`/login`, {
	// 			method: 'POST',
	// 			body: JSON.stringify(response)
	// 		});

	// 		// console.log('resp', resp.json());
	// 	}
	// };

	
</script>

<LightSwitch />

<div class="flex justify-center  mx-12  mt-24">
	<div class="grid justify-center text-primary-500 mx-4 max-w-4xl  p-4">
		<div class="text-6xl flex items-center ">Payround</div>
		<div class="text-6xl text-secondary-500 ">
			Send. Receive. Automate Payment with Payround
			<div class="text-lg py-4 text-primary-500 tracking-widest">
				Powered by Solana. Stripe. Circle.
			</div>
		</div>
	</div>
	<div class="mx-4">
		<div
			class=" px-8 max-w-lg mx-4 text-white my-10 rounded-3xl bg-primary-500 grid justify-center"
		>
			<form class="form" action="?/login" method="POST">
				<div class="text-center text-3xl mt-5 py-3">Sign in with email 👔</div>
				<input
					id="email"
					class="my-2 px-6 input bg-white text-secondary-500 placeholder:text-secondary-200"
					placeholder="someone@example.com"
					name="email"
					type="email"
				/>
				<!-- <input
					class=" my-2 px-6 input bg-white text-secondary-500 placeholder:text-secondary-200"
					placeholder="password"
					name="password"
					type="password"
				/> -->

				<button class="bg-secondary-500 w-full rounded-3xl p-2 my-2 btn" type="submit"
					>SIGN IN</button
				>
			</form>
			<div class="my-2 border-t-2 border-dashed" />
			<div class="mb-8">
				<div class="text-center text-3xl py-3">Welcome Degen 🥷</div>
		
					<button
						on:click={() => goto("/w3")}
						class="bg-secondary-500 w-full rounded-3xl p-4 my-2 btn"
						type="submit">LAUNCH APP</button
					>
				
			</div>
		</div>
	</div>
</div>
