export const levels = {
  level_1: 1,
  level_2: 2,
  level_3: 3,
  level_4: 4,
  level_5: 5 /* game win */
}

/* This is the required difference between players' scores by level */
export const levelRequirement = {
  level_2: 5,
  level_3: 20,
  level_4: 30,
  level_5: 35 /* game win */
}

export const countdownTimes = {
  level_1: 0,
  level_2: 0,
  level_3: 10,
  level_4: 10,
  level_5: 0 /* game win */
}

export const checkGameLevel = (currentLevel, score) => {
  const scoreDiference = (score.X - score.O)
  let check

  switch (currentLevel) {
    case 1:
      check = checkLevel2(scoreDiference)
      break
    case 2:
      check = checkLevel3(scoreDiference)
      break
    case 3:
      check = checkLevel4(scoreDiference)
      break
    case 4:
      check = checkIfWon(scoreDiference)
      break
  }

  return {
    state: getGameState(check.nextLevel, currentLevel),
    level: check.nextLevel,
    message: check.message || {}
  }
}

const getGameState = (newLevel, currentLevel) => {
  if (newLevel > currentLevel) {
    return 'next-level'
  }

  if (newLevel < currentLevel) {
    return 'down-level'
  }

  return 'keeps'
}

const checkLevel2 = scoreDiference => {
  return {
    nextLevel: (scoreDiference === levelRequirement.level_2) ? levels.level_2 : findLevel(scoreDiference),
    message: {
      title: 'It was easy...',
      body: `Now, make ${levelRequirement.level_3 - scoreDiference} points and go to the next level`
    },
    gameWon: false
  }
}

const checkLevel3 = scoreDiference => {
  return {
    nextLevel: (scoreDiference === levelRequirement.level_3) ? levels.level_3 : findLevel(scoreDiference),
    message: {
      title: 'Good Job!',
      body: `You avanced level. Make more ${levelRequirement.level_4 - scoreDiference} points and go to the next level`
    },
    gameWon: false
  }
}

const checkLevel4 = scoreDiference => {
  return {
    nextLevel: (scoreDiference === levelRequirement.level_4) ? levels.level_4 : findLevel(scoreDiference),
    message: {
      title: 'Wow! Very Good! /o/',
      body: `Show that you're incredible! Make more ${levelRequirement.level_5 - scoreDiference} points and win the game! Ah, but beware of time, he too is his enemy!`
    },
    gameWon: false
  }
}

const checkIfWon = scoreDiference => {
  let gameWon = scoreDiference === levelRequirement.level_5
  let message = {}

  if (gameWon) {
    message = {
      title: 'You Win!',
      body: 'Very Good :D'
    }
  } else {
    message = {
      title: 'Uau!',
      body: `Let's go... Make more ${levelRequirement.level_5 - scoreDiference} points and win the game`
    }
  }

  return {
    gameWon,
    nextLevel: gameWon ? levels.level_5 : findLevel(scoreDiference),
    message
  }
}

const findLevel = scoreDiference => {
  return Object.keys(levelRequirement).reduce((acc, key) => {
    if (scoreDiference > levelRequirement[key]) acc = levels[key]
    return acc
  }, 1)
}
