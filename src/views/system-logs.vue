<template>
	<div>
		<DataTable
			isLoading
			:headers="headers"
			:datas="systemLogs"
			:title="$route?.name.replace('', '')"
			:totalPage="totalPages"
			:limit="limit"
			@on-select="onSelect"
			@change-limit="onChangeLimit"
			@search-type="onSearchType" />
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import DataTable from '@/components/DataTable/index.vue';
import { getDataSystemData } from '@/lib/system-logs.js';

const systemLogs = ref([]);

const headers = [
	{
		label: 'Type',
		field: 'type',
	},
	{
		label: 'Request Id',
		field: 'request_id',
	},
	{
		label: 'Status',
		field: 'status',
	},
	{
		label: 'Created At',
		field: 'created_at',
	},
];
const selectTypes = ref('');
const selectStatus = ref('');
const limit = ref(5);
const totalPages = ref(10);

const onChangeLimit = (limitValue) => {
	limit.value = limitValue;
	getData();
};

const onSelect = (value, type) => {
	if (type === 'status') {
		selectStatus.value = value;
	}

	getData();
};

const currentPage = ref(1);

const fetchParams = computed(() => {
	const params = {
		limit: limit?.value,
		page: currentPage?.value,
	};

	if (selectTypes?.value) {
		params.type = selectTypes?.value;
	}

    if (selectStatus?.value) {
        params.status = selectStatus?.value;
    }

	return params;
});

const getData = () => {
	const params = fetchParams?.value;
	const callback = (res) => {
		totalPages.value = res?.data?.data?.totalPages;
		systemLogs.value = res?.data?.data?.data ?? [];
	};
	const err = () => console.log(e);

	getDataSystemData(params, callback, err);
};

const onSearchType = (value) => {
	selectTypes.value = value.trim();
	debounceGetData();
};

const debounce = (func, delay) => {
	return (...args) => {
        let timeout = null;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			func(...args);
		}, delay);
	};
};

const debounceGetData = debounce(() => {
	getData();
}, 3000);

onMounted(() => {
	getData();
});
</script>
