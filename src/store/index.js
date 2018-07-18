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
    },
    TOGGLE_PLAYER (state) {
      state.activePlayer = (state.activePlayer === 'X') ? 'O' : 'X'
    },
    SET_GAME_STATUS (state, status) {
      state.gameStatus = status
    }
  },

  getters: {
    isMultiplayer: state => state.gameMode === 'multiplayer',
    gameStatusMessage: ({gameStatus, activePlayer}, _, rootState) => {
      if (gameStatus === 'draw') return 'Draw!'

      const player = rootState.board.winner.player || activePlayer

      return `${player}'s ${gameStatus}!`
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store

const initialState = clone(store.state)

export const resetGlobalState = () => store.replaceState(clone(initialState))
