<template>
  <section class="sp-relative sp-py-10" :class="bgColor ? bgColor : ''">
    <div class="sp-flex-center sp-flex-wrap secContainer sp-max-w-screen-xl"
      :class="$attrs.nowrap ? 'lg:sp-flex-nowrap' : ''">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
const { bgColor } = defineProps({
  bgColor: String,
})
</script>

<style lang="postcss" scoped>
.secContainer {
  @apply sp-flex sp-flex-row sp-mx-auto sp-px-8
}
</style>