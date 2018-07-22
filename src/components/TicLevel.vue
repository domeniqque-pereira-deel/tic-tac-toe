<template>
  <div class="progress-container" :style="progressStyle">
    <div class="progress progress-bar"></div>
    <div class="progress progress-line"></div>
    <div class="progress progress-ball"></div>
    <div class="score-missing">{{ pointsMissing }}</div>

    <div v-for="({title, id}, index) in levels"
      :key="index"
      class="level"
      :class="{'active': currentLevel.id >= id}">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      // progressStyle: '',
      pointsMissing: ''
    }
  },
  computed: {
    ...mapState('score', [
      'levels',
      'pointsToWin'
    ]),
    ...mapGetters('score', [
      'currentLevel',
      'points',
      'targetPoints',
      'totalLevels'
    ]),
    ...mapState('board', [
      'moves',
      'winner'
    ]),

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

      return `--progress-width: ${width - 2}%`
    }
  },

  mounted () {
    // this.$bus.$on('score-updated', () =>
    //   this.calcProgressWidth())
    this.$bus.$on('restart-game', () => {
      Object.assign(this.$data, this.$options.data())
    })
  }
}
</script>

<style scoped>

.progress-container {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 10px 0;
  --progress-width: -20px;
  --progress-line-color: #2EC4B6;
  --progress-ball-color: #1fada0;
  --progress-bottom: 5px;
}

.progress {
  position: absolute;
  bottom: var(--progress-bottom);
  height: 6px;
  transition: all 0.5s ease-out;
}

.progress-bar {
  width: 100%;
  background-color: rgba(0,0,0,.08);
}

.progress-line {
  left: 0;
  width: var(--progress-width);
  background-color: var(--progress-line-color);
}

.progress-ball {
  left: var(--progress-width);
  width: 12px;
  height: 12px;
  bottom: calc(var(--progress-bottom) - 3px);
  border-radius: 50%;
  background-color: var(--progress-ball-color);
}

.score-missing {
  color: #F85A6A;
  position: absolute;
  bottom: calc(var(--progress-bottom) - 25px);
  left: calc(var(--progress-width) - 9px);
  z-index: 9000;
  font-size: 1em;
  font-family: var(--font-secondary);
  font-weight: 600;
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

@media screen and (max-width: 361px) {
  .level {
    font-size: 0.6em;
  }
}
</style>
