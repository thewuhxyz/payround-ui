<script lang="ts">
	// import { AppBar } from '@skeletonlabs/skeleton';
  export let name: string | null;
  export let email: string | null;
  export let address: string;
  export let balance: string | null;
  export let credit: string;
</script>

<div class="grid grid-cols-3 text-1xl   justify-center py-4 mt-16">
  <div class="justify-center items-start px-10">
    <div class="text-4xl text-secondary-500 ">Welcome, {name}</div>
    <div class="">user id: {email ? email : address}</div>
	</div>
  <div class="justify-center flex flex-col items-center">
    <div class="text-5xl text-secondary-500">Bal: {balance} USDC</div>
    <div class="">Account: {address}</div>
  </div>
  <div class="justify-center  flex flex-col items-end px-10">
    <div class="text-2xl">mSOL: {credit}</div>
</div>
</div>
