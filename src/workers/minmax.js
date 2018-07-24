
self.onmessage = ({ data }) => { /* eslint-disable-line */
  let {tempBoard, currentPlayer, depth, me} = data

  let move = minmax(tempBoard, currentPlayer, depth, me).move
  // console.log(move)
  self.postMessage(move) /* eslint-disable-line */
  close()/* eslint-disable-line */
}

function minmax (tempBoard, currentPlayer, depth, me) {
  let availableMoves = keysCellsWhereValue('', tempBoard)
  let score = getScore(me, tempBoard, depth)
  let moves = []

  // If there are no empty houses (game tied) or if there is a winner
  if (availableMoves.length === 0 || score !== 0) {
    return { score }
  }

  availableMoves.forEach(move => {
    tempBoard[move] = currentPlayer
    score = minmax(tempBoard, togglePlayer(currentPlayer), ++depth, me).score
    tempBoard[move] = ''

    moves.push({ move, score })
  })

  // sort the values in ascending order
  moves.sort((a, b) => a.score < b.score ? 1 : 0)

  return (currentPlayer === me)
    ? moves[0]
    : moves.slice(-1)[0]
}

const winConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

function keysCellsWhereValue (value, cells) {
  return Object.keys(cells)
    .reduce((acc, key) =>
      cells[key] === value ? acc.concat([parseInt(key)]) : acc, [])
}

const togglePlayer = currentPlayer => currentPlayer === 'X' ? 'O' : 'X'

function checkForWin (board) {
  for (let i = 0; i < winConditions.length; i++) {
    let wc = winConditions[i]

    if (board[wc[0]] !== '' &&
      board[wc[1]] === board[wc[0]] &&
      board[wc[2]] === board[wc[0]]) {
      return {
        win: true,
        winer: board[wc[0]],
        condition: wc
      }
    }
  }

  return { win: false, winer: null, condition: null }
}

const getScore = (player, board, depth) => {
  let result = checkForWin(board)

  if (!result.win) return 0

  return (result.winer === player) ? 10 - depth : depth - 10
}
