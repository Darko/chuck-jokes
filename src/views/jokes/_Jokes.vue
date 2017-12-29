<template>
  <router-view></router-view>
</template>

<script>
export default {
  watch: {
    '$route' (to, from) {
      // alert(to.params.pepeId);

    }
  },
  created() {
    // alert(this.$route.params.pepeId);
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>
