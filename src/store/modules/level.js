
const state = {
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

const getters = {
  getCurrentLevel: ({levels}) => (points) =>
    levels.reduce((acc, level) => level.requiredPoints >= points ? level : acc, {}),

  getRequiredPoints: ({levels}, getters) => (points) => {
    const currentLevel = getters.getCurrentLevel(points)
    const { requiredPoints } = levels.find(({ level }) => level === currentLevel.id)
    return requiredPoints
  },

  checkPointsMissing: (state, getters) => (currentPoints) => {
    const requiredPoints = getters.getRequiredPoints(currentPoints)

    return (requiredPoints >= currentPoints)
      ? (requiredPoints - currentPoints)
      : 0
  },

  getMissingToNextLevel (state, { currentLevel }) {

  }
}

export default {
  namespaced: true,
  state,
  getters
}
