<template>
  <div ref="pullRefresh" class="pull-refresh">
    <div class="pull-refresh-msg" ref="refreshMsg">
      <div v-if="loading" class="hidenArea">
        Refreshing...
      </div>
      <div v-else class="hidenArea" ref="hidenAreaNotLoading">
        <img src="https://emoji.slack-edge.com/T4H5UTHFU/monkax/73594150da7aa81b.gif">
      </div>
    </div>
    <div ref="pullRefreshSlot">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.pull-refresh {
  overflow-y: auto;
  transition: .33s;
  -webkit-overflow-scrolling: touch;
  /* ios5+ */
  .pull-refresh-msg {
    height: 0;
    line-height: 0;
    text-align: center;
    margin-bottom: 8px; 
  }
  .hidenArea {
    color: #918AE1;
    font-weight: bold;
    font-size: 1.2em;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    white-space: nowrap;
    position: relative;

    img {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      max-height: 100%;
    }
  }
}

@keyframes loadRotate {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}
</style>


<script>
export default {
  props: {
    next: {
      type: Function,
      required: true
    },
    language: {
      type: String,
      required: false
    },
    pullDistance: {
      type: Number,
      required: false
    },
    releaseDistance: {
      type: Number,
      required: false
    },
    maxDistance: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      msg: '',
      flag: false,
      loading: false,
      touchStart: 0,
      distance: 0,
      previousDistance: 0,
      PullDistance: 0,
      ReleaseDistance: 80,
      MaxDistance: 147,
      pullRefresh: null,
      refreshMsg: null,
      pullSlot: null
    }
  },
  mounted() {
    this.pullRefresh = this.$refs.pullRefresh;
    this.refreshMsg = this.$refs.refreshMsg;
    this.pullSlot = this.$refs.pullRefreshSlot;
    this.hidenAreaNotLoading = this.$refs.hidenAreaNotLoading;
    this.content = document.querySelector('#app > .content');

    this.pullRefresh.addEventListener('touchstart', this.start);
    this.pullRefresh.addEventListener('touchmove', this.moves);
    this.pullRefresh.addEventListener('touchend', this.end);
  },
  methods: {
    start(e) {
      if (this.content.scrollTop > 0) {
        return;
      }
      
      if (this.loading) {
        e.preventDefault()
        return
      }

      this.touchStart = e.targetTouches[0].clientY;
      this.refreshMsg.classList.add('touch-start');
    },
    moves(e) {
      if (this.content.scrollTop > 0) {
        return;
      }

      if (!this.touchStart) {
        return;
      }

      const touch = e.targetTouches[0];
      const scrollTop = this.pullRefresh.scrollTop;

      if (scrollTop === 0) {
        this.distance = touch.clientY - this.touchStart;

        if (this.distance < this.previousDistance) { // moving up
          if (this.distance < 0) {
            this.previousDistance = this.distance;
            this.clear();
            return;
          }
        }

        if (this.distance > 0) {
          e.preventDefault();
        }

        if (this.distance > this.PullDistance && this.distance < this.MaxDistance) {
          this.pullRefresh.style.overflow = 'inherit';
          this.pullRefresh.style.transform = `translate3D(0px, ${this.distance / 2}px, 0px)`;
          this.refreshMsg.style.height = `${this.distance}px`;
          this.refreshMsg.style.lineHeight = `${this.distance}px`;

          const remainingDistance = (this.distance / this.MaxDistance);
          const opacity = (remainingDistance - 1) * -1.3;
          const translate = remainingDistance * 50;

          this.pullSlot.style.opacity = opacity < 0 ? 0 : (opacity > 1 ? 1 : opacity);
          this.pullSlot.style.transform = `translate3D(0px, ${translate}px, 0px)`;
          this.hidenAreaNotLoading.style.height = `${translate * 2}px`;

          if (this.distance >= this.ReleaseDistance) {
            this.flag = true;
          }

          this.previousDistance = this.distance;
        }
      }
    },
    end(e) {
      if (this.content.scrollTop > 0) {
        return;
      }

      if (this.distance < this.previousDistance &&
          this.previousDistance !== 0 &&
          this.distance <= 0) {
        this.clear();
        return;
      }

      if (this.loading) {
        e.preventDefault();
        return;
      }

      if (this.distance > this.PullDistance && this.distance < this.ReleaseDistance) {
        this.pullRefresh.scrollTop = 0;
        this.pullRefresh.style.overflow = 'auto';
        this.pullRefresh.style.transform = 'translate3D(0, 0, 0)';
        this.refreshMsg.style.height = 0;
        this.refreshMsg.style.lineHeight = 0;
        this.refreshMsg.classList.remove('touch-start');
        return;
      }

      if (this.flag && this.distance > this.ReleaseDistance) {
        this.pullRefresh.style.transform = 'translate3D(0, 0, 0)'
        this.refreshMsg.style.height = `0`
        this.refreshMsg.style.lineHeight = `0`;
        this.loading = true;

        this.next()
        .then(() => {
          this.flag = false;
          this.loading = false;
          this.clear();
        });
        return;
      }
    },
    clear() {
      this.pullRefresh.scrollTop = 0;
      this.pullRefresh.style.overflow = 'auto';
      this.pullRefresh.style.transform = 'translate3D(0px, 0px, 0px)';

      this.refreshMsg.style.height = 0;
      this.refreshMsg.style.lineHeight = 0;

      this.pullSlot.style.opacity = 1;
      this.pullSlot.style.transform = `translate3D(0px, 0px, 0px)`;

      this.hidenAreaNotLoading.style.height = `0px`;
      this.previousDistance = 0;
      this.distance = 0;
    }
  }
}
</script>