import Vuex from 'vuex'
import Vue from 'vue'
import { clone } from './../utils'
import board from './modules/board'
import score from './modules/score'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    board,
    score
  },
  state: {
    activePlayer: 'X',
    robotPlayer: 'O',
    gameMode: 'default',
    gameStarted: false,
    // can turn, win or draw
    gameStatus: 'turn',
    gameStatusMessage: 'X`s turn!',
    statusMessageClass: 'status-message-default'
  },
  mutations: {
    SET_GAME_MODE (state, gameMode) {
      state.gameMode = gameMode
    },
    SET_GAME_STATE (state, started) {
      state.gameStarted = started
    }
  },

  getters: {
    isMultiplayer: state => state.gameMode === 'multiplayer'
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store

const initialState = clone(store.state)

export const resetGlobalState = () => store.replaceState(clone(initialState))
