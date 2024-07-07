<template>
	<modal 
        :show="show" 
        :title="title" 
        themeClass="bg-primary-600 border-b dark:border-b dark:border-slate-700 dark:bg-slate-800"
        @close="$emit('close')"
    >
		<div class="">
			<div class="mb-2">
				<field-input
					v-model="type"
					placeholder="Search Type"
                />
			</div>
			<div>
				<SingleSelect
					v-model="status"
					placeholder="Status Logs"
					:options="systemLogStatuses"
					@input="checkChange"
                />
			</div>
		</div>
        <template #footer>
            <div class="flex gap-2">
                <vue-button text="Cancel" btn-class="btn btn-sm btn-danger light" @click="$emit('close')" />
                <vue-button text="Filter" btn-class="btn btn-sm bg-primary-600 text-primary-600 light" @click="submit" />
            </div>
        </template>
	</modal>
</template>

<script setup>
import Modal from '@/components/Modal';
import FieldInput from '@/components/Textinput';
import SingleSelect from '@/components/Select/SingleSelect.vue';
import VueButton from '@/components/Button/index.vue';
import { systemLogStatuses } from '@/constant/system-logs';
import { ref } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
	title: {
		type: String,
		default: 'Modal FILTER',
	},
});

const status = ref('');
const type = ref('');

const emits = defineEmits(['set-filter']);

const checkChange = (target) => {
	status.value = target?.target.value;
};

const submit = () => {
	const payload = {
		status: status?.value,
		type: type.value,
	}
	
	emits('set-filter', payload)
};
</script>
