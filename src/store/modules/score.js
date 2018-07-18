
const state = {
  score: {
    O: 0,
    X: 0
  },
  playerPointsClass: ''
}

const mutations = {
  INCREMENT_PLAYER_SCORE (state, player) {
    state.score[player]++
  },

  DECREMENT_PLAYER_SCORE (state, player) {
    state.score[player]--
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
