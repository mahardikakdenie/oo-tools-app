<template>
	<modal :show="show" sizeClass="max-w-3xl" :title="title" @close="$emit('close')">
		<div class="p-6">
			<div class="mb-4">
				<span class="block text-gray-600 font-medium">Type:</span>
				<span class="block text-gray-900 lowercase">{{ data?.type }}</span>
			</div>
			<div class="mb-4">
				<span class="block text-gray-600 font-medium">Status:</span>
				<span class="block text-red-500">{{ data?.status }}</span>
			</div>
			<div class="max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
				<h2 class="text-xl font-semibold mb-4">Data</h2>
				<pre class="bg-gray-900 text-sm text-white p-4 rounded-lg overflow-auto">
					{{ JSON.stringify({ data: data?.data } , null, 2).trim() }}
				</pre>
			</div>
		</div>
		<template #footer>
			<vue-button btn-class="btn btn-sm btn-primary light" text="Ok" @click="$emit('close')" />
		</template>
	</modal>
</template>

<script setup>
import Modal from '@/components/Modal';
import VueButton from '@/components/Button';

const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
    title: {
        type: String,
        default: 'Log Detail'
    },
    data: {
        type: Object,
        default: null,
    }
});

const code = {
	data: {
		header_authentication: 'jL3jxRpEZp7I3AJ2lm1s4DQeybDWzB39KM3t5u7u0nA=',
		NINJA_CLIENT_SECRET: '4d2bd83c5aed45cfaf5f421adb9a8f20',
		calculated_hmac: 'tKxhfIVosexchv89MfGY9KBJxklSL8qnG60Uc+e949s=',
		reason: 'Authentication code not valid',
		_id: '668a568ca0a55a0090ce23d7',
	},
};
</script>
