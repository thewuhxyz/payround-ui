<script lang="ts">
	import { goto } from '$app/navigation';
	import { truncate } from '$lib/helpers';
	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import { WalletMultiButton } from '@svelte-on-solana/wallet-adapter-ui';

	export let route: string;
	export let show: boolean;
	export let name: string;
	export let email: string;

	const links = [
		{ name: 'Dashboard', link: `/${route}/dashboard`, disable: false },

		{ name: 'Send', link: `/${route}/send`, disable: false },
		{ name: 'Tasks', link: `/${route}/task`, disable: false },
		{ name: 'Groups', link: `/${route}/group`, disable: false },
		{ name: 'Address Book', link: `/${route}/addresses`, disable: false },
		{ name: 'Invoice', link: `/${route}/invoice`, disable: true },
		{ name: 'USD', link: `/${route}/usd`, disable: false },
		{ name: 'Transactions', link: `/${route}/transactions`, disable: false },
		{ name: 'Settings', link: `/${route}/settings`, disable: true }
	];
</script>

<div class={`${show ? '' : 'hidden'} mt-4 w-48 ${ route == "w2" ? "py-12" : "py-1"} text-white`}>
	{#if route=="w3"}
	<div class="flex justify-center p-2">
		<WalletMultiButton/>
	</div>
	{/if}
	<div class="flex bg-primary-700 items-center">
		<div class="p-2">
			<Avatar initials={name} class="" />
		</div>
		<div class="text-sm">
			<div class="text-lg">{truncate(name, 10)}</div>
			<div>{truncate(email, 15)}</div>
		</div>
	</div>
	
	
	<li class="my-4">
		{#each links as link}
			<a class={` text-primary-100`} href={route == "w3" ? link.disable ? '#' : link.link : link.link}>
				<ul
					class={`btn text-white w-full p-4 text-1xl text-center hover:bg-secondary-100 hover:italic hover:text-secondary-500 active:italic active:text-secondary-500`}
				>
					{link.name}
				</ul>
			</a>
		{/each}
	</li>
	{#if route == "w2"}
		
	<div class="w-full">
		<form action="/w2/logout" method="POST">
			<button type="submit" class="p-4 btn text-white w-full text-1xl text-center hover:bg-secondary-100 hover:italic hover:text-error-500 active:italic active:text-secondary-500">Logout</button>
		</form>
	</div>
	{/if}
</div>
