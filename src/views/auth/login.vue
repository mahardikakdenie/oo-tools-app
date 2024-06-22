<template>
	<div
		class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
		<div
			class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[500px]">
			<div class="p-5 flex justify-center">
				<img src="/logo/orderonline.svg" width="200" alt="" />
			</div>
			<form>
				<div class="mb-4">
					<label
						for="email"
						class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
						>Email:</label
					>
					<input
                        v-model="email"
						type="email"
						id="email"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						placeholder="Email" />
				</div>
				<div class="mb-6">
					<label
						for="password"
						class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
						>Password:</label
					>
					<input
                        v-model="password"
						type="password"
						id="password"
						class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						placeholder="Password" />
				</div>
				<div class="flex items-center justify-between">
					<button
						type="submit"
						class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Sign In
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('');
const password = ref('')
</script>

<style scoped></style>
