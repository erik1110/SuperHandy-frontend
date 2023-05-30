<template>
    <PostTaskOverlay />
    <v-sheet class="sp-p-5 sm:sp-p-10 sp-h-full" color="primary-lighten">
        <v-sheet max-width="1000" color="transparent" class="sp-mx-auto">
            <h1 class="mb-4 sp-text-2xl sp-font-bold">刊登任務</h1>
            <v-card class="mb-4 py-4 px-6" rounded="lg" elevation="0">
                <SecTitle :text="'任務內容'"></SecTitle>

                <PostTaskForm />

            </v-card>
        </v-sheet>
    </v-sheet>
</template>
<script setup></script>