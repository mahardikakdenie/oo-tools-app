<template>
  <router-link :to="{ name: 'home' }">
    <img
      :src="logo"
      alt=""
      v-if="!this.$store.themeSettingsStore.isDark"
    />

    <img
      :src="logo_white"
      alt=""
      v-if="this.$store.themeSettingsStore.isDark"
    />
  </router-link>
</template>

<script setup>
const props = defineProps({
  logo: {
    type: String,
    default: '/logo/logo.svg',
  },
  logo_white: {
    type: String,
    default: '/logo/logo-white.svg',
  }
})
</script>
