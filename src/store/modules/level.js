
const state = {
  levels: [
    {
      level: 1,
      title: 'Stormtrooper',
      minPoints: 0
    },
    {
      level: 2,
      title: 'Padawan',
      minPoints: 5
    },
    {
      level: 3,
      title: 'Jedi',
      minPoints: 20
    },
    {
      level: 4,
      title: 'Jedi Lord',
      minPoints: 30
    }
  ],

  currentLevel: 1
}

export default {
  namespaced: true,
  state
}
