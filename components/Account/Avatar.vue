<template>
    <label class="aui-info d-inline-block">
        <v-progress-circular v-if="circularLoading" indeterminate color="v-purple"></v-progress-circular>
        <div v-else>
            <img :src="avatarPath" class="aui-avatar" />
            <input class="d-none" type="file" accept=".png, .jpg, .jpeg" @change="$emit('aUploadAvatar', $event)" />
            <v-icon icon="mdi-camera" size="small" class="aui-camera"></v-icon>
        </div>
    </label>
</template>
<script setup>
//const { VITE_SP_IMAGE } = import.meta.env
const { avatarPath, circularLoading } = defineProps(['avatarPath', 'circularLoading'])
watch(() => avatarPath, (nV, oV) => {
    console.log(avatarPath, 'avatarPath1')
    // if (!nV) {
    //     avatarPath.value = VITE_SP_IMAGE
    // }
})


</script>
<style scoped>
.aui-info {
    position: relative;
    cursor: pointer;
}

.aui-avatar {
    width: 64px;
    height: 64px;
    border-radius: 32px;
}

.aui-camera {
    color: #757575;
    position: absolute;
    bottom: 0.3rem;
    left: 2.7rem;
}
</style>