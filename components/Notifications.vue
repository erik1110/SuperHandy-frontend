<template>
    <v-list v-if="circularLoading" class="pa-3 sp-text-center">
        <v-progress-circular indeterminate color="v-purple"></v-progress-circular>
    </v-list>
    <v-list v-if="noData && !circularLoading">
        <v-list-item>
            沒有系統通知
        </v-list-item>
    </v-list>
    <v-list v-if="!noData && !circularLoading">

        <!--  標題 -->
        <v-list-item class="sp-px-2">
            <v-list-item-title class="sp-flex sp-items-center sp-justify-between">
                <p>系統通知</p>
                <v-btn variant="plain" :ripple="false" @click="updateReadAll" size="small" :disabled="!isHasUnRead"
                    :loading="btnReadAllLoading">
                    全部標記已讀
                </v-btn>
            </v-list-item-title>
        </v-list-item>


        <!--  訊息列表 -->
        <v-list-item id="notiItem" v-for="(item, index) in notiList" :key="item.notifyId" :value="item.notifyId"
            class="sp-px-2" :disabled="item.read">
            <v-list-item-title class="sp-whitespace-normal" @click="updateReadOne(item.notifyId)">
                <div class="sp-flex sp-items-center sp-space-x-4 sp-justify-between">
                    <div class="sp-flex sp-space-x-2">
                        <div>
                            <span class="sp-text-xs sp-whitespace-nowrap"
                                :class="_tagsColor.tag[item.tag] ?? _tagsColor.tag.default">{{ item.tag
                                }}</span>
                        </div>
                        <div class="sp-text-xs sp-whitespace-normal">
                            <p class="">{{ item.description }}</p>
                            <p class="sp-text-gray-400 sp-mt-1">{{ fromNow(item.createdAt) }}</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <span v-if="!item.read" class="mdi mdi-circle-medium sp-text-pink-500"></span>
                        </div>
                    </div>
                </div>
            </v-list-item-title>
        </v-list-item>

        <!-- 查看更多 -->
        <v-list-item class="sp-px-2" v-if="btnShowMore">
            <v-list-item-title class="sp-text-center">
                <v-btn variant="plain" :ripple="false" @click="getMore" size="small" :loading="btnShowMoreLoading">
                    查看更多...
                </v-btn>
            </v-list-item-title>
        </v-list-item>
    </v-list>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { getList, patchRead, patchReadALL } from "@/services/apis/notifications";
import { storeNotification } from '@/stores/storeNotification'
const _storeNotification = storeNotification()
const { notiLength, isHasUnRead } = storeToRefs(_storeNotification)
const { addNotiLength, hasUnRead } = storeNotification()
const { excuteAsyncFunc, promiseAllSettledHanlder } = useSpUtility()
const { fromNow } = useMoment()
const { logInfo, logError } = useLog()
const circularLoading = ref(true)
const noData = ref(false)
const notiList = ref([])
const _work = '系統通知'
const _tagsColor = {
    tag: {
        '案主通知': 'sp-tag-light-xs-cyan',
        '幫手通知': 'sp-tag-light-xs-amber',
        '系統通知': 'sp-tag-light-xs-slate',
        default: 'sp-tag-light-xs-slate'
    }
};

// - 按鈕互動 -
const btnShowMore = ref(true)
const btnShowMoreLoading = ref(false)
const btnReadAllLoading = ref(false)
//const btnReadAllDisabled = ref(false)

// - 單筆已讀 -
const updateReadOne = (id) => {

    promiseAllSettledHanlder(
        [
            excuteAsyncFunc(_work, patchRead, id, null)
        ]
        //成功
        , getNotiList
        //失敗
        , (error) => {
            logError(_work, { error })
        }
        //finally
        , null
    )
}

// - 全部已讀 -
const updateReadAll = () => {
    // btnReadAllDisabled.value = true
    btnReadAllLoading.value = true
    promiseAllSettledHanlder(
        [
            excuteAsyncFunc(_work, patchReadALL, null, null)
        ]
        //成功
        , getNotiList
        //失敗
        , (error) => {
            logError(_work, { error })
        }
        //finally
        , () => {
            //btnReadAllDisabled.value = false
            btnReadAllLoading.value = false
        }
    )
}

// - 查看更多 -
const getMore = () => {
    btnShowMoreLoading.value = true
    addNotiLength()
    getNotiList()
}

// - 取得所有通知 -
const getNotiList = () => {
    promiseAllSettledHanlder(
        [
            excuteAsyncFunc(_work, getList, null, (response) => {
                const result = response.data
                if (result.length == 0) {
                    noData.value = true
                    return;
                }

                notiList.value = result.slice(0, notiLength.value)
                if (notiLength.value >= result.length) {
                    btnShowMore.value = false
                }

                // 找出未讀的項目
                hasUnRead()
            }),
        ]
        //成功
        , null
        //失敗
        , (error) => {
            logError(_work, { error })
        }
        //finally
        , () => {
            btnShowMoreLoading.value = false
            circularLoading.value = false
        }
    )
}
getNotiList()


</script>

<style scoped>
body {}
</style>
