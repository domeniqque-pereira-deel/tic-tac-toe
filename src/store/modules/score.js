import { clone } from '@/utils'

const state = {
  score: {
    O: 0,
    X: 0
  },
  levels: [
    {
      id: 1,
      title: 'Stormtrooper',
      requiredPoints: 0
    },
    {
      id: 2,
      title: 'Padawan',
      requiredPoints: 5
    },
    {
      id: 3,
      title: 'Jedi',
      requiredPoints: 15
    },
    {
      id: 4,
      title: 'Jedi Lord',
      requiredPoints: 25
    }
  ],
  pointsToWin: 30
}

const initialState = clone(state)

const mutations = {
  INCREMENT_PLAYER_SCORE (state, player) {
    state.score[player] += 1
  },

  DECREMENT_PLAYER_SCORE (state, player) {
    state.score[player] += 1
  },

  RESET_STATE (state) {
    Object.assign(state, clone(initialState))
  }
}

const getters = {
  points: (state) => {
    const scorePlayer = state.score['X']
    const scoreRobot = state.score['O']

    const score = scorePlayer - scoreRobot

    return score >= 0 ? score : 0
  },

  currentLevel: ({levels}, getters) => {
    const currentPoints = getters.points
    return levels.reduce((acc, level) => level.requiredPoints <= currentPoints ? level : acc, {})
  },

  totalLevels: state => state.levels.length,

  targetPoints: (state, {currentLevel}) =>
    state.levels.reduce((acc, level) =>
      (level.id === currentLevel.id + 1)
        ? level.requiredPoints
        : acc,
    state.pointsToWin)
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
