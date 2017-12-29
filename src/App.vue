<template>
  <div id="app">
    <div class="content" v-bind:class="[$route.name]">
      <router-view></router-view>
    </div>
    <nav class="main-nav md-layout md-row md-align-space-around md-vertical-align-center" v-if="$route.name !== 'home'">
      <router-link to="/" class="main-nav-item md-button md-layout md-column md-align-center md-vertical-align-center">
        <md-icon>home</md-icon>
        Home
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss">
  #app {
    border-radius: 8px;
    margin: 0 auto;
    background-color: white;
    overflow: hidden;
    position: relative;
    box-shadow: 0 30px 30px -10px rgba(0, 0, 0, 0.12);
    height: 100%;
    width: 100%;
  }

  .content {
    height: calc(100% - 51px);
    overflow-y: scroll;

    &.home {
      height: 100%;
    }
  }

  .main-nav {
    width: 100%;
    padding: 4px 8px;
    background-color: white;
  }

  a.main-nav-item {
    margin: 0;
    flex: 0;
    line-height: 1.4;
  }
  
  .flex {
    flex: 1
  }
</style>

<style src="vue-material/dist/vue-material.css"></style>

