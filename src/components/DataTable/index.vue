<template>
	<div class="mt-2">
		<Card noborder className="border-none">
			<div
				class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
				<h5>{{ title }}</h5>
				<InputGroup
					v-if="false"
					v-model="searchTerm"
					placeholder="Search"
					type="text"
					prependIcon="heroicons-outline:search"
					merged />
			</div>
			<div class="flex my-4 gap-2 justify-end">
				<div class="flex items-center">
					<vue-button text="Filter" btn-class="btn btn-sm btn-primary dark:bg-slate-700" @click="$emit('open-modal')" />
				</div>
			</div>
			<vue-good-table
				:columns="headers"
				styleClass="vgt-table bordered centered"
				:rows="datas"
				:pagination-options="{
					enabled: true,
					perPage: perpage,
				}"
				:search-options="{
					enabled: true,
					externalQuery: searchTerm,
				}"
				:select-options="{
					enabled: true,
					selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
					selectioninfoClass: 'custom-class',
					selectionText: 'rows selected',
					clearSelectionText: 'clear',
					disableSelectinfo: true, // disable the select info-500 panel on top
					selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
				}">
				<template v-slot:table-row="props">
					<span
						v-if="props.column.field == 'date'"
						class="text-slate-500 dark:text-slate-300">
						{{ props.row.date }}
					</span>
					<span
						v-if="props.column.field == 'status'"
						class="block w-full">
						<span
							class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
							:class="`${
								props.row.status === 'success'
									? 'text-success-500 bg-success-500'
									: ''
							} 
			${props.row.status === 'failed' || props.row.status === 'pending' ? 'text-warning-500 bg-warning-500' : ''}
			${props.row.status === 'info' ? 'text-primary-500 bg-primary-500' : ''}
			
			`">
							{{ props.row.status }}
						</span>
					</span>
					<span v-if="props.column.field === 'created_at'">
						<span>
							{{ setDate(props.row.created_at) }}
						</span>
					</span>
					<span
						v-if="props.column.field === 'type'"
						class="lowercase hover:text-primary-400 cursor-pointer"
						@click="$emit('open-detail', props?.row)"
					>
						{{ props?.row?.type }}
					</span>
				</template>
				<template #pagination-bottom="props">
					<div class="py-4 px-3">
						<Pagination
							v-if="!isLoading"
							:total="totalPage"
							:current="currentPage"
							:per-page="limit"
							:pageRange="pageRange"
							:pageChanged="props.pageChanged"
							:perPageChanged="props.perPageChanged"
							:totalPages="totalPage"
							enableSearch
							enableSelect
							:options="options"
							@page-changed="$emit('change-page', $event)"
							@change-limit="changeLimit">
							>
						</Pagination>
					</div>
				</template>
				<template #emptystate>
					<PageLoader v-if="isLoading" />
					<div v-else-if="datas.length <= 0 && !isLoading">
						<span>No data table</span>
					</div>
				</template>
			</vue-good-table>
		</Card>
	</div>
</template>
<script>
import Dropdown from '@/components/Dropdown';
import SingleSelect from '@/components/Select/SingleSelect.vue';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import InputGroup from '@/components/InputGroup';
import Pagination from '@/components/Pagination';
import VueButton from '@/components/Button';
import { MenuItem } from '@headlessui/vue';
import { advancedTable } from '@/constant/basic-tablle-data';
import VueSelect from '@/components/Select/index.vue';
import dayjs from 'dayjs';
import { systemLogStatuses, types } from '@/constant/system-logs';
import FieldInput from '@/components/Textinput';
import PageLoader from '@/components/Loader/pageLoader.vue';
const actions = [
	{
		name: 'view',
		icon: 'heroicons-outline:eye',
	},
	{
		name: 'edit',
		icon: 'heroicons:pencil-square',
	},
	{
		name: 'delete',
		icon: 'heroicons-outline:trash',
	},
];
const options = [
	{
		value: '5',
		label: '5',
	},
	{
		value: '10',
		label: '10',
	},
	{
		value: '15',
		label: '15',
	},
	{
		value: '20',
		label: '20',
	},
	{
		value: '25',
		label: '25',
	},
];
const columns = [
	{
		label: 'Id',
		field: 'id',
	},
	{
		label: 'Order',
		field: 'order',
	},
	{
		label: 'Customer',
		field: 'customer',
	},
	{
		label: 'Date',
		field: 'date',
	},

	{
		label: 'Quantity',
		field: 'quantity',
	},

	{
		label: 'Amount',
		field: 'amount',
	},

	{
		label: 'Status',
		field: 'status',
	},
	{
		label: 'Action',
		field: 'action',
	},
];
export default {
	components: {
		Pagination,
		InputGroup,
		Dropdown,
		Icon,
		Card,
		VueButton,
		MenuItem,
		VueSelect,
		SingleSelect,
		FieldInput,
		PageLoader,
	},

	props: {
		title: {
			type: String,
			default: () => '',
		},
		headers: {
			type: Array,
			required: true,
		},
		datas: {
			type: Array,
			required: true,
		},
		totalPage: {
			type: Number,
			default: 10,
		},
		limit: {
			type: Number,
			default: 10,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		currentPage: {
			type: Number,
			default: 1,
		}
	},

	data() {
		return {
			advancedTable,
			current: 1,
			perpage: 10,
			pageRange: 5,
			searchTerm: '',
			actions,
			options,
			columns,
			systemLogStatuses: systemLogStatuses,
			systemLogsTypes: types,
			select: null,
			searchType: '',
		};
	},
	methods: {
		setDate(date) {
			return dayjs(date).format('dddd, YYYY MMMM DD : hh:mm:ss');
		},
		onChanges(value, type) {
			this.$emit('on-select', value?.target?.value, type);
		},
		changeLimit(limit) {
			this.$emit('change-limit', limit);
		},
	},
};
</script>
<style lang="scss"></style>
