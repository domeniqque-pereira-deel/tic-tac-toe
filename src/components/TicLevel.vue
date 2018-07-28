<template>
  <div class="progress-container" :style="progressStyle">
    <div class="progress progress-bar"></div>
    <div class="progress progress-line"></div>
    <div class="progress progress-ball"></div>
    <div class="points-missing">
      <p>{{ missing }}</p>
    </div>

    <div v-for="({title, id}, index) in levels"
      :key="index"
      class="level"
      :class="{'active': currentLevel.id === id, 'win-level': id === lastLevelId}">
      <h3>{{ title }}</h3>
    </div>

    <div class="countdown" v-show="currentLevel.countdown">
        {{ $t('game.actions.label_coutdown')}} <span>{{ countdown.toString().padStart(2,'0') }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return { countdown: 0 }
  },
  computed: {
    ...mapState('score', ['levels']),
    ...mapGetters('score', [
      'currentLevel',
      'points',
      'targetPoints',
      'totalLevels',
      'pointsMissing',
      'pointsToWin'
    ]),
    ...mapState('board', [
      'moves',
      'winner'
    ]),
    ...mapState([
      'gameStatus'
    ]),

    lastLevelId () {
      return this.levels[Object.keys(this.levels).length - 1].id
    },

    progressStyle () {
      const currentLevel = this.currentLevel.id
      const steps = this.points

      // Sizes are in percentage
      const sizeLevels = (100 / this.totalLevels)
      const sizeSteps = (sizeLevels / this.targetPoints)

      // Space until the end of the level
      const totalSpace = (sizeLevels * currentLevel)
      // Space remaining to go
      const spaceToGo = (sizeLevels - (sizeSteps * steps))
      const target = totalSpace - spaceToGo
      const width = Math.max(Math.min(target, 100), 0)

      /* Ball style */
      const isVisible = this.points && this.points < this.pointsToWin
      const opacity = isVisible ? 1 : 0
      const progressMissing = isVisible ? 'calc(var(--progress-width) - 15px)' : '1px'

      return `
        --progress-width: ${width}%;
        --missing-progress: ${progressMissing};
        --opacity: ${opacity};`
    },

    missing () {
      const missing = this.pointsMissing
      if (missing === 0) return ''

      return `+${missing}`
    }
  },

  watch: {
    moves () {
      if (this.moves === 1) {
        this.startCountdown()
      }
    }
  },

  mounted () {
    this.$bus.$on('restart-game', () => {
      Object.assign(this.$data, this.$options.data())
    })

    this.countdown = this.currentLevel.countdown
  },

  methods: {
    async startCountdown (player = 'X') {
      const decrease = await this.shouldScoreDecrease()

      if (decrease) {
        this.$store.commit('score/DECREMENT_PLAYER_SCORE', player)
        this.$store.dispatch('prepareToNextGame')
      }

      setTimeout(() => { this.countdown = this.currentLevel.countdown }, 1000)
    },

    async shouldScoreDecrease () {
      return new Promise(resolve => {
        const intervalId = setInterval(() => {
          let mustContinue = this.gameStatus === 'turn'

          if (!mustContinue || this.points === 0 || (this.currentLevel.countdown === 0)) {
            clearInterval(intervalId)
            resolve(false)
          }

          if (mustContinue && this.countdown > 0) {
            this.countdown--
          } else {
            clearInterval(intervalId)
            resolve(true)
          }
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>

.progress-container {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.4fr 0.6fr;
  margin: 10px 0;
  --progress-width: 1px;
  --progress-line-color: #2EC4B6;
  --progress-ball-color: #1fada0;
  --progress-bottom: 5px;
  --missing-progress: 1px;
  --opacity: 0;
}

.progress {
  position: absolute;
  bottom: var(--progress-bottom);
  height: 6px;
}

.progress-bar {
  width: 100%;
  background-color: rgba(0,0,0,.08);
}

.progress-line {
  left: 0;
  width: var(--progress-width);
  background-color: var(--progress-line-color);
  transition: width 1s;
  opacity: var(--opacity);
}

.progress-ball {
  left: calc(var(--progress-width) - 6px);
  width: 12px;
  height: 12px;
  bottom: calc(var(--progress-bottom) - 3px);
  border-radius: 50%;
  background-color: var(--progress-ball-color);
  transition: left 1s, opacity 0.3s;
  opacity: var(--opacity);
}

.points-missing {
  color: #F85A6A;
  position: absolute;
  bottom: calc(var(--progress-bottom) - 45px);
  left: calc(var(--missing-progress) + 3px);
  z-index: 1500;
  font-size: 1em;
  font-family: var(--font-secondary);
  font-weight: 600;
  transition: all 1s, opacity 0.3s;
  height: 40px;
}

.points-missing span {
  display: inline-block;
  transition: opacity 0.3s;
}

.level {
  text-align: center;
  padding: 0 10px;
  font-family: var(--font-secondary);
  font-size: 0.8em;
  height: 40px;
  color: hsla(203, 63%, 21%, 0.4);
  transition: all 0.5s linear;
}

.level.active {
  color: hsla(203, 63%, 21%, 1);
}

.win-level h3 {
  background-color: var(--progress-line-color);
  color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(0,0,0,.4);
}

@media screen and (max-width: 540px) {
  .level { font-size: 0.6em; }

  .win-level h3 { width: 30px; }
}

.countdown {
  background-color: #fff;
  border-top: 1px solid #E4E4E4;
  border-bottom: 1px solid #E4E4E4;
  border-left: 2px solid #F85A6A;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 2px 10px;
  position: absolute;
  right: 0;
  bottom: -55px;
  z-index: 2000;
}

.countdown span {
  color: #F85A6A;
  font-family: var(--font-secondary);
}
</style>
