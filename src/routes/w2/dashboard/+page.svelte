<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatEpoch, truncate } from '$lib/helpers';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	const buttons = [
		{ name: '+ Create New Task', link: '/w2/task/create' },
		{ name: '$ Send Payment', link: '/w2/send' }
	];

	const tasks = data.upcomingTasks;
	const transactions = data.txFormatedData;

	$: tasks;
	$: transactions;

	// let some = transactions.map(i => i.sender)
	// console.log("some:", some);
</script>

<div class="flex mx-auto min-w-max max-w-lg my-20 pb-4">
	{#each buttons as buttonItem}
		<a class="text-primary-100" href={buttonItem.link}>
			<button
				class="btn w-64 py-4 mx-24  text-2xl text-secondary-500 border-solid border-2 rounded-full border-primary-500"
			>
				{buttonItem.name}
			</button>
		</a>
	{/each}
</div>

<div class="grid grid-cols-2">
	<div class="p-4">
		<div class="flex justify-between items-center px-2">
			<div class="p-2 text-xl">Upcoming Tasks</div>
			<a href="/w2/task">see all</a>
		</div>
		<div class="table table-container p-5">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>S/N</th>
						<th>Name</th>
						<th>Recipient</th>
						<th>Amount</th>
						<th>Cron</th>
						<th>Next Run</th>
					</tr>
				</thead>
				{#if tasks.length }
					<tbody>
						{#each tasks as row, i}
							<tr id={row.task_key} on:click={() => goto(`/w2/task/${row.task_key}`)}>
								<td>{i + 1}</td>
								<td>{row.name !== null ? truncate(row.name) : null}</td>
								<td>{truncate(row.recipient)}</td>
								<td>{row.amount} </td>
								<td>{row.cron ? 'Yes' : 'No'}</td>
								<td>{formatEpoch(row.nextRunMs)}</td>
							</tr>
						{/each}
					</tbody>
					{:else}
						<div class="p-4" >No Upcoming Tasks</div>
					{/if}
				</table>
			</div>
	</div>
	<div class="p-4">
		<div class="flex justify-between items-center px-2">
			<div class="p-2 text-xl">Latest Transactions</div>
			<a href="/w2/transactions">see all</a>
		</div>

		<div class="table table-container p-5">
			<table class="table table-hover">
				<thead>
					<tr>
						<!-- <th>S/N</th> -->
						<th>Address</th>
						<th>Amount</th>
						<th>In/Out</th>
						<th>Timestamp</th>
					</tr>
				</thead>
				{#if transactions.length}
					<tbody>
						{#each transactions as row, i}
							<tr
								id={row.sig}
								on:click={() => goto(`https://solscan.io/tx/${row.sig}?cluster=devnet`)}
							>
								<!-- <td>{i + 1}</td> -->
								<td>{row.address != null ? truncate(row.address) : null}</td>
								<td>{row.amount}</td>
								<td>{row.out ? 'Out' : 'In'}</td>

								<td>{formatEpoch(row.timeStamp)}</td>
							</tr>
						{/each}
					</tbody>
					{:else}
						<div class="p-4">No Transactions Yet</div>
					{/if}
				</table>
			</div>
	</div>
</div>
