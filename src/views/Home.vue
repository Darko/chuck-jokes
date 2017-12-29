<template>
  <div class="home-page layout-padding">
    <page-title></page-title>

    <h5 class="categories-title">Select category</h5>
    <md-list class="categories-list layout-padding-horizontal-16">
      <md-list-item :href="'jokes/' + category" class="categories-list-item" v-for="category in categories" v-bind:key="category">
        {{ category }}
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import appConstants from '../components/constants/app.constants';
export default {
  data() {
    return {
      categories: appConstants.categories
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to, from);
    }
  }
}
</script>

<style lang="scss">
  .categories-title {
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .categories-list {
    &-item {
      padding: 0;
      color: #e91e63;
      cursor: pointer;
    }
  }
</style>


