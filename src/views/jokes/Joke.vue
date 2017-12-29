<template>
  <div class="pepe-wrapper layout-padding">
    <h2 class="page-title">{{ $route.params.jokeId }} Joke</h2>

    <transition name="fadeOut">
      <md-spinner class="joke-loader" md-indeterminate v-show="state === 'loading'"></md-spinner>
    </transition>

    <transition name="fadeIn">
      <pull-to-refresh v-show="state !== 'loading'" :next="getJoke">
        <h3 class="joke-text">{{ joke.value }}</h3>
      </pull-to-refresh>
    </transition>
  </div>
</template>

<style lang="scss">
  .joke-text {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: .2px;
    color: rgba(black, 0.77);
    line-height: 1.2;
    user-select: none;
  }

  .joke-loader {
    display: block;
    left: 50%;
    margin-left: -25px;
    position: absolute;
  }
</style>


<script>
import apiService from '../../components/services/apiService';

export default {
  data() {
    return {
      jokeId: this.$route.params.jokeId,
      joke: {},
      state: 'loading'
    }
  },
  created() {
    this.getJoke()
  },
  methods: {
    getJoke() {
      this.state = 'loading';
      const url = this.jokeId === 'random' ? 'https://api.chucknorris.io/jokes/random' : `https://api.chucknorris.io/jokes/random?category=${this.jokeId}`;
      
      return apiService.get(url)
      .then(result => {
        this.joke = result.body;

        const loaded = setTimeout(() => {
          this.state = 'done';
        }, 500);
      })
    }
  }
}
</script>
