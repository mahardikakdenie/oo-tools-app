<template>
    <div class="flex sm:space-x-4 space-x-2 sm:justify-end items-center md:mb-6 mb-4 rtl:space-x-reverse">
        <VueTailwindDatePicker v-model="dateValue" v-slot="{ clear }">
            <div>
                <div
                    class="date-btn inline-flex btn btn-md whitespace-nowrap space-x-2 rtl:space-x-reverse cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
                    @click="clear"
                >
                    <span class="text-lg"
                        ><Icon icon="heroicons:calendar"
                    /></span>
                    <span>{{ weeklyDate }} </span>
                </div>
            </div>
        </VueTailwindDatePicker>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import dayjs from 'dayjs';
import Icon from '@/components/Icon'
const dateValue = ref({
    startDate: '',
    endDate: '',
});
const dateValue2 = ref('');
const DATE_FORMAT = 'YYYY-MM-DD';

const router = useRouter();
const route = useRoute();

const weeklyDate = computed(() => dateValue?.value?.startDate && dateValue?.value?.endDate ? getWeeklyDate(dateValue) : 'Date Picker');
const getWeeklyDate = (date) => {
    const start = new Date(date?.value?.startDate);
    const end = new Date(date?.value?.endDate);
    const currentTimestamp = new Date();

    if (start && end) {
        const startTimestamp = start;
        const endTimestamp = end;
        router.push({ query: { ...route.query, since: setFormatDate(start, DATE_FORMAT), until: setFormatDate(end, DATE_FORMAT) } })
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
        const diffTime = endTimestamp - startTimestamp;
        const diffDays = Math.ceil(diffTime / oneDay); 

        if (Math.abs(diffDays) === 1 || diffDays === 0) {

            if (diffDays === 0) {
                return 'Today';
            } 
            // else if (diffDays === -1) {
            //     return 'Tomorrow';
            // } else if (diffDays === 1) {
            //     return 'Yesterday';
            // } else {
            //     return 'wow';
            // }
        } else {
            // If the difference is greater than 0, it's a range
            return `From ${formatDateString(startTimestamp)} to ${formatDateString(endTimestamp)}`;
        }
    } else {
        return 'Date Range Not Available';
    }
}

const setFormatDate = (date, format) => {
    return dayjs(date).format(format);
};

const formatDateString = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}-${month}-${year}`;
}

</script>

<style>
</style>
