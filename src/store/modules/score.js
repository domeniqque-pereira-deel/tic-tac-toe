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
      requiredPoints: 0,
      durationTableAnimation: 0,
      countdown: 0
    },
    {
      id: 2,
      title: 'Padawan',
      requiredPoints: 5,
      durationTableAnimation: 8500,
      countdown: 0
    },
    {
      id: 3,
      title: 'Jedi',
      requiredPoints: 15,
      durationTableAnimation: 6500,
      countdown: 10
    },
    {
      id: 4,
      title: 'Jedi Lord',
      requiredPoints: 25,
      durationTableAnimation: 5000,
      countdown: 8
    },
    {
      id: 5,
      title: 'Win',
      requiredPoints: 30,
      durationTableAnimation: 0,
      countdown: 0
    }
  ]
}

const initialState = clone(state)

const mutations = {
  INCREMENT_PLAYER_SCORE (state, player) {
    state.score[player]++
  },

  DECREMENT_PLAYER_SCORE (state, player) {
    state.score[player]--
  },

  RESET_STATE (state) {
    Object.assign(state, clone(initialState))
  }
}

const getters = {
  pointsToWin: ({levels}) => levels[Object.keys(levels).length - 1].requiredPoints,
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

  targetPoints: (state, {currentLevel, pointsToWin}) =>
    state.levels.reduce((acc, level) =>
      (level.id === currentLevel.id + 1)
        ? level.requiredPoints
        : acc,
    pointsToWin),

  pointsMissing (state, { points, targetPoints }) {
    return targetPoints - points
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
