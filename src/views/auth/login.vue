<template>
	<div
		class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
		<div
			class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-[500px]">
            <div v-if="alert" class="border rounded-md bg-red-400 p-2 flex justify-between">
                <div>
                    <span class="text-white font-bold">{{ alert }}</span>
                </div>
                <div class="flex items-center cursor-pointer" @click="alert = ''">
                    <vue-icon icon="ic:baseline-close"  class="text-[20px] text-white"/>
                </div>
            </div>
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
                        @click.prevent="submit"
						class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Sign In
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
import { login } from '@/lib/auth';
import { ref } from 'vue'
import VueIcon from '@/components/Icon';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');

const alert = ref('');

const router = useRouter();

const submit = () => {
    const params = {
        email: email.value,
        password: password?.value,
    }

    const callback = (res) => {
        console.log(res);
        if (res?.data?.status === 200) {
            alert.value = 'Your Credential is not found in our record';
            localStorage.setItem('token', res?.data?.data);
            router?.push('/system-log');
        }
    } 
    
    const err = (e) => {
        alert.value = 'Your Credential is not found in our record';
        console.log(e)
    };
    login(params, callback, err);
};
</script>

<style scoped></style>
