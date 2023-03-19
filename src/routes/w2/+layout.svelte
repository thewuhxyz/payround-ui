<script lang="ts">
	import { goto } from '$app/navigation';
	import AppLayout from '$lib/components/AppLayout.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: balance = data.uiBalance!;
	$: nickname=data.nickname!
	$: data.credits;
	$: data.userAccountKey;
	$: email = data.email!;
</script>

<AppLayout
	show={true}
	route={"w2"}
	address={data.userAccountKey}
	balance={balance.toFixed(2)}
	credit={data.credits.toFixed(2)}
	{email}
	name={nickname}
>
	<slot />
</AppLayout>
