<template>
  <div class="full-background" v-show="show">
      <div class="btn-close-top" @click="$emit('close')">
        <span>|</span>
        <span>|</span>
      </div>

      <div class="container">
        <slot/>

        <button class="btn btn-close" @click.prevent="$emit('close')">{{ $t('game.actions.btn_continue') }}</button>
      </div>
  </div>
</template>

<script>
export default {
  props: ['showButton', 'show']
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

.btn-close-top {
  position: relative;
  float: right;
  font-size: 2.5em;
  height: 40px;
  width: 40px;
  right: 20px;
  top: 15px;
  z-index: 3000;
}

.btn-close-top span {
  position: absolute;
  display: inline-block;
  top: 0;
  font-family: var(--font-secondary);
}

.btn-close-top span:nth-child(1) {
  right: 13px;
  transform: rotate(42deg);
}

.btn-close-top span:nth-child(2) {
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

.btn-close {
  color: #fff;
  background-color: #143F59;
}

</style>
