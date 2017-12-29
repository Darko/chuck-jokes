import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import _Jokes from '../views/jokes/_Jokes.vue';
import Pepes from '../views/jokes/Jokes.vue';
import Pepe from '../views/jokes/Joke.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '',
      component: Home,
      name: 'home',
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/jokes',
      component: _Jokes,
      children: [
        {
          path: '',
          component: Pepes,
          name: 'jokes',
          meta: {
            title: 'Jokes'
          }
        },
        {
          path: ':jokeId',
          component: Pepe,
          name: 'joke',
          meta: {
            title: 'Joke'
          }
        }
      ]
    }
  ]
});

export default router;