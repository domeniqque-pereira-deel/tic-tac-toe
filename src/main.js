// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import EventBus from './utils/EventBus'
import VueI18n from 'vue-i18n'
import messages from '@/locales'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(EventBus)

const i18n = new VueI18n({
  locale: 'pt', // set locale
  messages // set locale messages
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})
