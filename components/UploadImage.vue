<template>
    <v-sheet border="lg opacity-12" class="text-body-2 mx-auto pa-3">
        <v-container fluid>
            <v-row class="text-center" justify="center">
                <v-col v-for='(item, index) in 5' :key='index' class="flex-grow-0">
                    <v-img src="https://vuetifyjs.b-cdn.net/docs/images/graphics/img-placeholder.png" height="100"
                        width="140" cover></v-img>
                </v-col>
            </v-row>
            <v-row class="text-center mt-6">
                <v-col>
                    <label class="btn px-5 py-3 bg-indigo">
                        <input style="display:none;" type="file" @change="upload">
                        上傳圖片
                    </label>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
    <ul class="note">
        <li>每筆任務最多可上傳5張照片，每張照片大小不超過2MB，只支援JPG、PNG格式。</li>
        <li>上傳照片的第一張為任務介紹圖片</li>
    </ul>
</template>
<script setup>
const { basicBox } = useAlert()
function upload() {
    basicBox('還沒寫喔')
}
</script>
<style scoped>
label.btn {
    cursor: pointer;
    border-radius: 4px;
}

ul.note {
    list-style: disc;
    padding-left: 20px;
    font-size: 0.8rem;
    font-weight: 400;
}
</style>


