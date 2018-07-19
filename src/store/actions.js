import { delays } from '@/game'

export default {
  setGameOption ({commit}, optionSelected) {
    commit('SET_GAME_MODE', optionSelected)
    commit('SET_GAME_STATE', true)
  },

  async prepareToNextGame ({state, commit}) {
    setTimeout(() => {
      commit('SET_ACTIVE_PLAYER', 'X')
      commit('SET_GAME_STATUS', 'turn')
      commit('board/RESET_STATE')

      return Promise.resolve(true)
    }, delays.nextGame)
  },

  async checkGameState ({state, commit, dispatch}) {
    const status = await dispatch('board/checkStatus')
    commit('SET_GAME_STATUS', status)

    if (status === 'win' || status === 'draw') {
      await dispatch('prepareToNextGame')
    }

    if (status === 'turn') {
      dispatch('callNextPlayer')
    }
  },

  async callNextPlayer ({state, commit, getters, dispatch}) {
    commit('TOGGLE_PLAYER')

    const {isMultiplayer, activePlayer, robotPlayer} = {...state, ...getters}

    // Call robot
    if (!isMultiplayer && (activePlayer === robotPlayer)) {
      await dispatch('board/robotMove')
      return true
    }
  }
}
