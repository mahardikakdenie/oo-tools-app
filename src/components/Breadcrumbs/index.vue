<template>
<div class="flex justify-between flex-wrap items-center">
	<div class="b-section">
		<group
			v-if="groupParent"
			:groupParent="groupParent"
			:sectionName="sectionName"
		/>
	</div>
	<!-- <date-picker-section /> -->
</div>
</template>
<script>
import Icon from "@/components/Icon";
import Group from "@/components/Breadcrumbs/Group.vue";
// import DatePickerSection from '@/components/Breadcrumbs/DatePicker.vue'
export default {
    components: {
        Icon,
        Group,
		// DatePickerSection,
    },
    computed: {
        sectionName() {
            return this.$route?.name?.replace("-", " ");
        },
        /**
         * @returns Strings
         */
        groupParent() {
            return this.$route?.meta?.groupParent;
        },
    },
};
</script>
<style lang="scss">
.b-section {
    @apply md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse;
}
.breadcrumbs {
    @apply flex text-sm space-x-2 items-center;
    li {
        @apply relative flex items-center space-x-2 capitalize font-normal rtl:space-x-reverse;
        .breadcrumbs-icon {
            @apply text-lg text-secondary-500 dark:text-slate-500;
        }
    }
}
</style>
