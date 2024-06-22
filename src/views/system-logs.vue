<template>
    <div>
        <DataTable />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DataTable from '@/components/DataTable/index.vue';
import { getDataSystemData } from '@/lib/system-logs.js';

const systemLogs = ref([]);

const getData = () => {
    const params = {};
    const callback = (res) => {
        systemLogs.value = res?.data?.data;
    };
    const err = () => {};
    
    getDataSystemData(params, callback, err);
};

onMounted(() => {
    getData();
});
</script>
