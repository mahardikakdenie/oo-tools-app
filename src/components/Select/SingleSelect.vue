<template>
    <div>
        <select
            v-model="value"
            id="selectOption" 
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
        >
            <option disabled value="">{{ placeholder }}</option>
            <option v-for="(option , i) in options" :key="i" :value="option?.key">{{option.label}}</option>
        </select>
    </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
    options: {
        type: Array,
        required: true,
    },
    placeholder: {
        type: String,
        default: 'Select'
    }
});

const value = ref('');
</script>

<style scoped>
</style>
