<template>
  <v-dialog v-model="_dialog" max-width="380" :close-on-back="true
    " class="relative">
    <v-btn @click="$emit('close')" class="closeBtn d-none d-sm-block" icon="mdi-close" color="v-gray-text"></v-btn>
    <UserCard v-bind="data" />
  </v-dialog>
</template>

<script setup>

const props = defineProps({
  dialog: Boolean,
  data: Object
})
const emit = defineEmits(['close'])
const _dialog = computed({
  get() {
    return props.dialog
  },
  set(newVal) {
    if (!newVal) {
      emit('close')
    }
  }
})

</script>

<style lang="scss" scoped>
.closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
</style>