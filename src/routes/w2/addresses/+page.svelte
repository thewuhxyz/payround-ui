<script lang="ts">
	import { goto } from "$app/navigation";
	import { Table, tableMapperValues, type TableSource } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";

	export let data: PageData;

const sourceData = data.addresses;
$: sourceData

</script>

<div class="mt-12 p-4">
  <div class="justify-between flex p-4">
		<a href={"#"} class="text-3xl ">Address Book</a>
    <a class="text-primary-100" href="/w2/addresses/add">
			<button
      class="btn w-64 py-4 mx-24  text-xl text-secondary-500 border-solid border-2 rounded-full border-primary-500"
			>
      + Add New Address
    </button></a
		>
	</div>
  
  
  <div class="table-container mt-5 p-5">
		
		<table class="table table-hover">
			<thead>
				<tr>
					<th>S/N</th>
					<th>Name</th>
					<th>Address</th>
					<th>Created At</th>
				</tr>
			</thead>
			{#if sourceData.length}
		<tbody>
			{#each sourceData as row, i}
				<tr id={row.address} >
					<td>{i+1}</td>
					<td>{row.name}</td>
					<td>{row.address}</td>
					<td>{row.created_at}</td>
				</tr>
			{/each}
		</tbody>
		{:else}
		 <div class="p-4">
			No Addresses Yet
		 </div>
		{/if}
	</table>
  </div>
</div>