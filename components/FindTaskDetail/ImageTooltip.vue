<template>
    <v-tooltip :text="text" location="top">
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot></slot>
            </div>
        </template>
    </v-tooltip>
</template>
<script setup>
const { text } = defineProps(['text'])
</script>