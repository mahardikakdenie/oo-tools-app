<template>
    <div>
        <DataTable :headers="headers" :datas="systemLogs" :title="$route?.name.replace('', '')" />
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
        field: 'request_id'
    },
    {
        label: 'Status',
        field: 'status',
    },
    {
        label: 'Created At',
        field: 'created_at'
    }
];

const fetchParams = computed(() => {
    const params = {
        limit: 5,
        page: 1,
    };

    return params;
})

const getData = () => {
    const params = fetchParams?.value;
    const callback = (res) => {
        systemLogs.value = res?.data?.data?.docs;
    };
    const err = () => console.log(e);
    
    getDataSystemData(params, callback, err);
};

onMounted(() => {
    getData();
});
</script>
