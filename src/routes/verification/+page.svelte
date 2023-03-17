<script lang="ts">
	import { SigninMessage } from '$lib/login';
	import { payroundClientStore } from '$lib/stores/payroundClientStore';
	import { providerStore } from '$lib/stores/providerStore';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

  // export const prerender = false

	$: ({ connected, publicKey, wallet } = $walletStore);

  // $: ({userId, provider} = $payroundClientStore)
  // $: $payroundClientStore
  $: publicKey


  // console.log("userId:", userId.toBase58())
  console.log("userId:", publicKey?.toBase58())
  console.log("provider:", connected)

	// async function login {
	// 	const message = new SigninMessage({
	// 		// domain: window.location.host,
	// 		publicKey: $walletStore.publicKey!.toBase58(),
	// 		statement: `Sign this message to sign in to the app.`,
	// 		nonce: "1"
	// 	});

	// 	const data = new TextEncoder().encode(message.prepare());
	// 	const signature = await walletStore.signMessage!(data);
	// 	const serializedSignature = bs58.encode(signature);
	// }
</script>

<h1>Verify your Email</h1>

<p>A verification link has been sent to your email</p>
<p>Check your email for confirmation</p>

<!-- {$providerStore} -->
<!-- {userId.toBase58()} -->

{connected}
{publicKey}
