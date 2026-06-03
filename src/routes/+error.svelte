<script>
	import { page } from "$app/state";
	</script>

<section class="container mx-auto pt-8 ">
	<div class="bg-neutral-100 dark:bg-gray-950 p-8 rounded-lg shadow-md shadow-danger block text-center">
		<div class="text-5xl font-extrabold text-danger">{page.status.toString()}</div>
		<div class="text-3xl text-gray-400">{page.error?.message}</div>
	</div>
</section>
