<template>
	<div>
		<DataTable
			:isLoading="isLoading"
			:headers="headers"
			:datas="systemLogs"
			:title="$route?.name.replace('', '')"
			:totalPage="totalPages"
			:limit="limit"
			:currentPage="currentPage"
			@on-select="onSelect"
			@change-limit="onChangeLimit"
			@change-page="onChangePage"
			@search-type="onSearchType"
			@open-modal="openModal"
            @open-detail="onOpenDetail"
        />
		<modal-filter
			:show="isModalFilterVisible"
			title="Filter Logs"
			@close="isModalFilterVisible = false"
			@set-filter="onSetFilter" 
        />

        <ModalDetail :show="isModalDetailVisible" :data="systemLog" @close="isModalDetailVisible = false" />
	</div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import DataTable from '@/components/DataTable/index.vue';
import { getDataSystemData } from '@/lib/system-logs.js';
import { useRoute } from 'vue-router';
import pageLoader from '@/components/Loader/pageLoader.vue';
import ModalFilter from '@/components/Modal/Filter.vue';
import ModalDetail from '@/components/Modal/LogDetail.vue';

const route = useRoute();

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
const since = ref(null);
const until = ref(null);

watch(
	() => route?.query,
	(query) => {
		if (query?.since || queryUntil) {
			since.value = query?.since;
			until.value = query?.until;

			getData();
		}
	}
);

const querySince = computed(() => route?.query?.since);
const queryUntil = computed(() => route?.query?.until);

const getQueryFilter = () => {
	since.value = querySince?.value;
	until.value = queryUntil?.value;
    currentPage.value = 1;
};

const onChangeLimit = (limitValue) => {
    limit.value = limitValue;
	getData();
};

const onSelect = (value, type) => {
    if (type === 'status') {
        selectStatus.value = value;
	}
    
    currentPage.value = 1;
	getData();
};

const currentPage = ref(1);

const onChangePage = (page) => {
	currentPage.value = page;
	getData();
};

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

	if (since.value) {
		params.since = since?.value;
	}
	if (until.value) {
		params.until = until?.value;
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
	const err = (e) => console.log(e);

	getDataSystemData(params, callback, err);
};

const onSearchType = (value) => {
	selectTypes.value = value.trim();
	isLoading.value = true;
    currentPage.value = 1;
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
	selectTypes.value = payload.type;
	selectStatus.value = payload.status;
	isModalFilterVisible.value = false;

	getData();
};

const isModalFilterVisible = ref(false);
const openModal = () => {
	isModalFilterVisible.value = true;
};

const isModalDetailVisible = ref(false);
const systemLog = ref(null);

const onOpenDetail = (data) => {
    isModalDetailVisible.value = true;
    systemLog.value = data;
};

onMounted(() => {
	getQueryFilter();
	getData();
});
</script>
