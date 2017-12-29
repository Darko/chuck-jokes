import pullToRefreshComponent from './pullToRefresh.vue'

const pullToRefresh = {
  install: function(Vue) {
    Vue.component('pull-to-refresh', pullToRefreshComponent)
  }
}

export default pullToRefresh;