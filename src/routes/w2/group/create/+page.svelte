<form
	class="border-2 rounded-3xl border-solid border-primary-500 max-w-xl p-4 mx-auto my-24"
	action="?/creategroup"
	method="post"
>
	<div class="justify-center text-3xl text-center ">Create New Group</div>
	<div class="grid-cols-1 grid py-2">
		<label class="flex items-end  text-3xl mx-2" for="name">Name</label>
		<input class="w-sm input" name="name" type="text" />
	</div>
	<div class="grid-cols-1 grid py-2">
		<label class="flex items-end  text-3xl mx-2" for="desc">Desc</label>
		<textarea class="w-sm textarea" name="desc" />
	</div>
	<div class="flex justify-center">
		<button
			class="border-2 rounded-3xl border-solid border-primary-500 my-4 px-8 text-3xl"
			type="submit">Create Group</button
		>
	</div>
</form>
