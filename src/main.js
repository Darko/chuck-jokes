// Essentials 
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';

import App from './App.vue';

// Components
import TitleComponent from './components/Title.vue';
import PullToRefreshComponent from './components/pull-to-refresh/index';

// Routes
import appRouter from './routes/appRouter';

// Dependencies
Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(VueResource);
Vue.use(PullToRefreshComponent);

//Config
Vue.material.registerTheme('default', {
  primary: 'indigo',
  accent: 'pink'
});

Vue.component('page-title', TitleComponent);

new Vue({
  el: '#app',
  router: appRouter,
  render: h => h(App)
})
