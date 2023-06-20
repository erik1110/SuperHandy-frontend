<template>
    <div v-for="(item, index) in data" :key="index" class="sp-card-wrapper sp-bg-white sp-py-4 sp-px-6">
        <v-container fluid class="px-0">
            <v-row class="sp-flex sp-items-center">
                <v-col cols="12" lg="2">
                    <span :class="item.tagClass">
                        {{ item.tag }}
                    </span>
                </v-col>
                <v-col cols="12" lg="10" class="pa-0">
                    <v-container fluid class="px-0">
                        <v-row no-gutters>
                            <v-col cols="12" md="6">
                                <table
                                    class="sp-border-separate sp-border-spacing-3 sp-text-sm md:sp-text-base sp-text-gray-placeholder">
                                    <tr>
                                        <td class="sp-whitespace-nowrap">任務角色</td>
                                        <td>
                                            <span :class="item.roleClass">
                                                {{ item.role }}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>任務標題</td>
                                        <td class="sp-break-all">
                                            <nuxt-link :to="`${siteConfig.linkPaths.tasks.to}/${item.taskId}`"
                                            class="sp-text-purple hover:sp-cursor-pointer" target="_blank">
                                                {{ item.taskTitle }}
                                            </nuxt-link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>交易點數</td>
                                        <td :class="item.totalClass">{{ `${item.totalPrefix}${item.total}` }}</td>
                                    </tr>
                                </table>
                            </v-col>
                            <v-col cols="12" md="6">
                                <table
                                    class="sp-border-separate sp-border-spacing-3 sp-text-sm md:sp-text-base sp-text-gray-placeholder">
                                    <tr>
                                        <td class="sp-whitespace-nowrap">交易時間</td>
                                        <td>{{ item.time }}</td>
                                    </tr>
                                    <tr>
                                        <td>交易項目</td>
                                        <td>{{ item.desc }}</td>
                                    </tr>
                                    <tr>
                                        <td>點數明細</td>
                                        <td>{{ item.detail }}</td>
                                    </tr>
                                </table>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script setup>
import { siteConfig } from '~/services/siteConfig';

const { data } = defineProps(['data'])
</script>

<style scoped>
table td:first-child {
    font-weight: 700;
}

table td:last-child {
    padding-left: 1.5rem;
}
</style>