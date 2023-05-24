<template>
    <label class="aui-info d-inline-block">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" id="aui-avatar" class="aui-avatar" />
        <input id="uploadImgBtn" style="display: none" type="file" @change="uploadAvatar" />
        <v-icon icon="mdi-camera" size="small" class="aui-camera"></v-icon>
    </label>
</template>
<script setup>
//更新頭像
function uploadAvatar() {
    //console.log('uploadAvatar')
    basicBox("還沒寫喔");
}
</script>
<style scoped>
.aui-info {
    position: relative;
    cursor: pointer;
}

.aui-avatar {
    width: 4rem;
    border-radius: 2rem;
}

.aui-camera {
    color: #757575;
    position: absolute;
    bottom: 0.3rem;
    left: 2.7rem;
}
</style>