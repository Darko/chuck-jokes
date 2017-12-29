<template>
  <h2 class="page-title">{{ title }}</h2>
</template>

<script>
  export default {
    computed: {
      title() {
        return this.$route.meta.title || '';
      }
    }
  }
</script>
