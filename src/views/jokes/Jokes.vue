<template>
  <div class="pepes-page layout-padding">
    <page-title></page-title>
  </div>
</template>

<script>
export default {
  watch: {
    '$route' (to, from) {
    }
  },
  created() {
    console.dir(this.$router);
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>
