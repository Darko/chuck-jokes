import Vue from 'vue';

export default {
  get(route) {
    return Vue.http.get(route);
  }
}