<template>
	<div class="flex items-center gap-3 p-2.5 xl:p-5">
		<p class="hidden text-black text-left dark:text-white sm:block">{{ brand.name }}</p>
	</div>
	<div class="flex items-center gap-3 p-2.5 xl:p-5">
		<p class="hidden text-black text-left dark:text-white sm:block">{{ brand.visitors }}</p>
	</div>
	<div class="flex items-center gap-3 p-2.5 xl:p-5">
		<p class="hidden text-black text-left dark:text-white sm:block">{{ brand.revenues }}</p>
	</div>
	<div class="flex items-center gap-3 p-2.5 xl:p-5">
		<p class="hidden text-black text-left dark:text-white sm:block">{{ brand.sales }}</p>
	</div>
	<div class="flex items-center gap-3 p-2.5 xl:p-5">
		<p class="hidden text-black text-center dark:text-white sm:block">{{ brand.conversion }}</p>
	</div>
	<div class="flex items-center gap-3 p-2.5 xl:p-5">
			<book-table-mark-book-button
			/>
	</div>
</template>

<script>
import BookTableMarkBookButton from './BookTableMarkBookCheckmark.vue';

export default {
	components: {
		BookTableMarkBookButton
	},
	props: ["brand"],
};
</script>
