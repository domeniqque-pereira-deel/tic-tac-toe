<template>
  <div class="container">
    <div class="progress progress-bar"></div>
    <div class="progress progress-line"></div>
    <div class="progress progress-ball"></div>

    <div v-for="({title, level}, index) in levels"
      :key="index"
      class="level"
      :class="{'active': currentLevel >= level}">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState('level', [
    'levels',
    'currentLevel'
  ])
}
</script>

<style scoped>

.container {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 10px 0;
}

.progress {
  position: absolute;
  bottom: 0;
  height: 6px;
  --progress-width: calc(25%/2);
  --progress-line-color: #2EC4B6;
  --progress-ball-color: #1fada0;
}

.progress-bar {
  width: 100%;
  background-color: rgba(0,0,0,.08);
}

.progress-line {
  left: 0;
  width: var(--progress-width);
  background-color: var(--progress-line-color);
  transition: all 0.3s ease-out;
}

.progress-ball {
  left: var(--progress-width);
  width: 12px;
  height: 12px;
  bottom: -3px;
  border-radius: 50%;
  background-color: var(--progress-ball-color);
}

.level {
  text-align: center;
  padding: 0 10px;
  font-family: var(--font-secondary);
  font-size: 0.8em;
  height: 32px;
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
