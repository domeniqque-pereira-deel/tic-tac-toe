<template>
  <div>
    <div class="full-background" v-show="show">
      <div id="btn-close" @click="show = false">
        <span>|</span>
        <span>|</span>
      </div>

      <div class="container">
        <h1>{{ $t('instructions.title') }}</h1>

        <p v-html="$t('instructions.p1')"></p>
        <p v-html="$t('instructions.p2')"></p>
        <p v-html="$t('instructions.p3')"></p>
        <p v-html="$t('instructions.p4')"></p>
        <p v-html="$t('instructions.p5')"></p>

        <button class="btn btn-next" @click.prevent="show = false">{{ $t('game.actions.btn_continue') }}</button>
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
  background-color: rgba(255,255,255,0.96);
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
