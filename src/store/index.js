import Vuex from 'vuex'
import Vue from 'vue'
import { clone } from './../utils'
import boardModule from './modules/board'
import scoreModule from './modules/score'
import levelModule from './modules/level'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    board: boardModule,
    score: scoreModule,
    level: levelModule
  },
  state: {
    activePlayer: 'X',
    robotPlayer: 'O',
    gameMode: 'default',
    gameStarted: false,
    // can turn, win or draw
    gameStatus: 'turn'
  },

  getters,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})

export default store

const initialState = clone(store.state)

export const resetGlobalState = () => store.replaceState(clone(initialState))
