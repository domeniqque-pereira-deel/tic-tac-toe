const state = {
  freeze: false,
  moves: 0,
  // Store the player who has played, X or O
  cells: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
    9: ''
  }
}

const mutations = {
  STRIKE (state, {cellIndex, player}) {
    state.cells[cellIndex] = player
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
