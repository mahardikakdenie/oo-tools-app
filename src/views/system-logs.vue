<template>
	<div>
		<DataTable
			:isLoading="isLoading"
			:headers="headers"
			:datas="systemLogs"
			:title="$route?.name.replace('', '')"
			:totalPage="totalPages"
			:limit="limit"
			@on-select="onSelect"
			@change-limit="onChangeLimit"
			@search-type="onSearchType"
            @open-modal="openModal"
        />
        <modal-filter 
            :show="isModalFilterVisible" 
            title="Filter Logs"
            @close="isModalFilterVisible = false"
            @set-filter="onSetFilter"
        />
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import DataTable from '@/components/DataTable/index.vue';
import { getDataSystemData } from '@/lib/system-logs.js';
import pageLoader from '@/components/Loader/pageLoader.vue';
import ModalFilter from '@/components/Modal/Filter.vue';

const systemLogs = ref([]);
const isLoading = ref(false);

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
    isLoading.value = true;
    systemLogs.value = [];
	const callback = (res) => {
        isLoading.value = false;
		totalPages.value = res?.data?.data?.totalPages;
		systemLogs.value = res?.data?.data?.data ?? [];
	};
	const err = () => console.log(e);

	getDataSystemData(params, callback, err);
};

const onSearchType = (value) => {
	selectTypes.value = value.trim();
    isLoading.value = true;
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

const onSetFilter = (payload) => {
    console.log("🚀 ~ onSetFilter ~ payload:", payload)
    selectTypes.value = payload.type;
    selectStatus.value = payload.status;
    isModalFilterVisible.value = false;

    getData();
};

const isModalFilterVisible = ref(false);
const openModal = () => {
    isModalFilterVisible.value = true;
};

onMounted(() => {
	getData();
});
</script>
