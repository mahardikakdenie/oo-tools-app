<template>
	<Card title="Tabs">
		<span>Views</span>
	</Card>
</template>

<script setup>
import Card from '@/components/Card';
import Icon from '@/components/Icon';
const buttons = [
	{
		title: 'Home',
		icon: 'heroicons-outline:home',
	},
	{
		title: 'Profile',
		icon: 'heroicons-outline:user',
	},
	{
		title: 'Messages',
		icon: 'heroicons-outline:chat-alt-2',
	},
	{
		title: 'Settings',
		icon: 'heroicons-outline:cog',
	},
];
</script>
