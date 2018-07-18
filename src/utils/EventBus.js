import Vue from 'vue'
const EventBus = new Vue()

export default {
  install (Vue, options) {
    Object.defineProperties(Vue.prototype, {
      $bus: {
        get: () => EventBus
      }
    })
  }
}
