
export default {
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
  },

  SET_ACTIVE_PLAYER (state, player) {
    state.activePlayer = player
  }
}
