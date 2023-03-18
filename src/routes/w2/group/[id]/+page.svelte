<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatEpoch } from '$lib/helpers';
	import type { PageData } from './$types';

	export let data: PageData;

	const tasks = data.tasks;
	const group = data.group!;

	$: tasks;
	$: group;
</script>

<div class="mt-12 p-4">
	<a href={"/w2/groups"} class="text-3xl ">Groups</a>
	<div class="justify-between flex p-4">
		<div>
			<div class="text-xl">Name: {group.name}</div>
			{#if group.description}
				<div>Description: {group.name}</div>
			{/if}
		</div>
		<a class="text-primary-100" href="/w2/task/create">
			<button
				class="btn w-64 py-4 mx-24  text-xl text-secondary-500 border-solid border-2 rounded-full border-primary-500"
			>
				+ Create New Task
			</button></a
		>
	</div>

	<div class="table-container p-5">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>S/N</th>
					<th>Name</th>
					<th>Address</th>
					<th>Recipient</th>
					<th>Amount</th>
					<th>Next Run</th>
					<th>Created At</th>
				</tr>
			</thead>
			{#if tasks.length}
				<tbody>
					{#each tasks as row, i}
						<tr id={row.task_key} on:click={() => goto(`/w2/task/${row.task_key}`)}>
							<td>{i + 1}</td>
							<td>{row.name}</td>
							<td>{row.task_key}</td>
							<td>{row.recipient}</td>
							<td>{row.amount}</td>
							<td>{formatEpoch(row.nextRunMs)}</td>
							<td>{new Date(row.created_at).toLocaleDateString()}</td>
						</tr>
					{/each}
				</tbody>
				{:else}
				<div class="p-4">No Groups Yet</div>
			{/if}
			</table>
		</div>
	
</div>
