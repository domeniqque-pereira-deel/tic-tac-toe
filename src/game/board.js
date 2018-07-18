export const winConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

export const getRandomIndexOf = list => Math.floor(Math.random() * list.length)

export const randomItem = list => list[getRandomIndexOf(list)]

export const randomRotation = previousRotation => {
  if (previousRotation < -90) {
    return previousRotation + 90
  }

  if (previousRotation > 90) {
    return previousRotation - 90
  }

  return previousRotation + randomItem([-90, 90])
}

/**
  Returns a list with the indexes when the value is the same as desired
*/
export function keysCellsWhereValue (value, cells) {
  return Object.keys(cells)
    .reduce((acc, key) =>
      cells[key] === value ? acc.concat([parseInt(key)]) : acc, [])
}

/**
 Check if the moves meets some win condition
*/
export function checkForWin (board) {
  for (let i = 0; i < winConditions.length; i++) {
    let wc = winConditions[i]

    if (board[wc[0]] !== '' &&
      board[wc[1]] === board[wc[0]] &&
      board[wc[2]] === board[wc[0]]) {
      return { win: true, winner: board[wc[0]], condition: wc }
    }
  }

  return { win: false, winner: null, condition: null }
}

/**
  Returns the gain conditions that contain the reported and available cell movements
*/
export function gainConditionsContain (myMoves, availableCells = []) {
  let listConditions = []
  // Search for plays that have at least
  // one of the already selected cells
  for (let i = 0; i < winConditions.length; i++) {
    if (arrayContainSome(winConditions[i], myMoves) || myMoves.length === 0) {
      listConditions.push(winConditions[i])
    }
  }

  // Remove plays that have no available cells
  // or are not selected by the player
  if (listConditions.length > 0) {
    listConditions = listConditions.filter(condition => arrayContain(availableCells.concat(myMoves), condition))
  }

  return listConditions
}

/**
  Return false if one of items does't exist in the array
*/
export function arrayContain (array, items) {
  for (let i = 0; i < items.length; i++) {
    if (!array.includes(items[i])) return false
  }

  return true
}

/**
  Return true if one of items exist in the array
*/
export function arrayContainSome (array, items) {
  for (let i = 0; i < items.length; i++) {
    if (array.includes(items[i])) return true
  }

  return false
}
