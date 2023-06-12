<template>
    <v-tooltip text="點擊看大圖" location="top">
        <template v-slot:activator="{ props }">
            <div v-bind="props">
                <slot></slot>
            </div>
        </template>
    </v-tooltip>
</template>