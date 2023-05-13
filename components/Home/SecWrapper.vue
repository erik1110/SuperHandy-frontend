<template>
  <section class="sp-relative sp-py-10" :class="$attrs.bgColor ? `sp-bg-${$attrs.bgColor}` : ''">
    <div class="sp-flex-center secContainer" :class="$attrs.maxWidth ? `sp-max-w-${$attrs.maxWidth}` : ''">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>

</script>

<style lang="postcss" scoped>
.secContainer {
  @apply sp-flex sp-flex-row sp-mx-auto sp-flex-wrap sp-px-8
}
</style>