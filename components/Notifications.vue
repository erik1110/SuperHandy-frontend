<template>
    <v-list v-if="circularLoading" class="pa-3">
        <v-progress-circular indeterminate color="v-purple"></v-progress-circular>
    </v-list>
    <v-list v-else class="py-0" max-width="70vw" max-height="60vh">
        <div class="sm:sp-flex sm:sp-items-center sm:sp-justify-between sp-border-b sp-p-2">
            <p class="sp-text-primary">系統通知</p>
            <p class="sp-text-end">
                <v-btn variant="plain" class="text-08" @click="updateReadAll" :disabled="!showAllRead">
                    全部標記已讀
                </v-btn>
            </p>
        </div>
        <div v-for="(item, index) in notiList " :key="index" :value="index"
            class="text-08 sp-border-b sp-px-2 sp-space-y-2 sp-py-3 sm:sp-flex sm:sp-space-y-0  sp-items-center hover:sp-bg-gray-50">
            <v-chip class="text-08 me-2" color="v-orange" size="small">
                {{ item.tag }}
            </v-chip>
            <div>
                <p class="sp-max-w-[250px] sp-min-w-[200px]">{{ item.description }}</p>
                <p class="text-05 sp-text-gray-400">
                    <span v-if="!item.read" class="mdi mdi-circle-medium sp-text-cyan-500"></span>
                    {{ fromNow(item.createdAt) }}
                </p>
            </div>
        </div>
        <div v-if="showMore" class="sp-text-center sp-py-2">
            <a class="text-08 hover:sp-cursor-pointer hover:sp-text-cyan-500" @click="getNotiList">
                查看更多...
            </a>
        </div>
    </v-list>
</template>
<script setup>
import { getList, patchRead, patchReadALL } from "@/services/apis/notifications";
const { excuteAsyncFunc, promiseAllSettledHanlder, checkRespStatus, checkUploadImage } = useSpUtility()
const { fromNow } = useMoment()
const { logInfo, logError } = useLog()
const circularLoading = ref(true)
const notiList = ref([])
const _work = '系統通知'
const showMore = ref(true)
const showAllRead = ref(true)
const notiScope = ref({
    length: 3
})
const AddNotiScope = () => {
    notiScope.value.length = (notiScope.value.length * 2)
}

const updateReadAll = () => {
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
        , null
    )
}


const getNotiList = () => {
    promiseAllSettledHanlder(
        [
            excuteAsyncFunc(_work, getList, null, (response) => {
                const result = response.data
                notiList.value = result.slice(0, notiScope.value.length)
                if (result.length > notiScope.value.length) {
                    AddNotiScope();
                } else {
                    showMore.value = false
                }

                // 找出未讀的項目
                const readObj = result.find((item) => item.read == false)
                showAllRead.value = readObj ? true : false
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
            circularLoading.value = false
        }
    )
}
getNotiList()

</script>

<style scoped>
.text-08 {
    font-size: 0.8rem;
}

.text-05 {
    font-size: 0.5rem;
}

.cursor-pointer {
    cursor: pointer;
}
</style>
