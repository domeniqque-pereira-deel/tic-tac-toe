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
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { delays } from '@/game'

export default {
  data () {
    return { showMissingInfo: true }
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
      const info = this.points === 0 || this.showMissingInfo
        ? 'to next level' : ''

      return missing > 0 ? `+${missing} ${info}` : ''
    }
  },

  watch: {
    points () {
      if (this.showMissingInfo) this.hideMissingInfo()
    },
    targetPoints () {
      this.showMissingInfo = true
      this.hideMissingInfo()
    }
  },

  methods: {
    hideMissingInfo () {
      setTimeout(() => { this.showMissingInfo = false }, delays.missingInfo)
    }
  }
}
</script>

<style scoped>

.progress-container {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.2fr 0.8fr;
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
  z-index: 9000;
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

@media screen and (max-width: 361px) {
  .level {
    font-size: 0.6em;
  }
}

.win-level h3 {
  background-color: var(--progress-line-color);
  color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(0,0,0,.4);
}
</style>
