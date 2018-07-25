<template>
  <div>
    <div class="full-background" v-show="show">
      <div id="btn-close" @click="show = false">
        <span>|</span>
        <span>|</span>
      </div>

      <div class="container">
        <h1>Instructions</h1>

        <p>Make more points than the robot and win the game</p>
        <p><b>How to make points</b>? Simple, do not let the robot win from you. When this happens you lose points</p>
        <p>Enjoy that in the early stages he is silly, is still learning to play</p>
        <p>But in the end, beware of time. It is your enemy and will take your points</p>
        <p><b>Draw</b> or <b>win</b> before time runs out</p>

        <button class="btn btn-next" @click.prevent="show = false">Continue</button>
      </div>
    </div>

    <button class="btn btn-show"
      title="Instructions of game"
      v-show="showButton"
      @click.prevent="show = true">?</button>
  </div>
</template>

<script>
export default {
  props: ['showButton'],
  data () {
    return { show: true }
  }
}
</script>

<style scoped>
.full-background {
  position: absolute;
  background-color: rgba(255,255,255,0.95);
  z-index: 2000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

#btn-close {
  position: relative;
  float: right;
  font-size: 2.5em;
  height: 40px;
  width: 40px;
  right: 20px;
  top: 15px;
  z-index: 3000;
}

#btn-close span {
  position: absolute;
  display: inline-block;
  top: 0;
  font-family: var(--font-secondary);
}

#btn-close span:nth-child(1) {
  right: 13px;
  transform: rotate(42deg);
}

#btn-close span:nth-child(2) {
  right: 10px;
  transform: rotate(-42deg);
}

.container {
  position: absolute;
  padding: 40px 20px;
  width: 100%;
  height: 100%;
  overflow: scroll;
}

.container h1 {
  text-align: center;
}

.container p {
  font-size: 1.5rem;
  margin: 15px 0;
}

.btn-show {
  position: absolute;
  right: 10px;
  bottom: 20px;
  padding: 0 !important;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: none;
  font-size: 1.2em;
}

.btn-next {
  color: #fff;
  background-color: #143F59;
  float: right;
}
</style>
