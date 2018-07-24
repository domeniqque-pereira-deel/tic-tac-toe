import { randomItem, keysWhereValue } from '@/utils'
import { createWorker } from '@/utils/createWorker'
import { gainConditionsContain } from '@/game/board'
import { delays } from '@/game'

const randomMove = availableCells => randomItem(availableCells)

const selectOneGainCondition = ({ me, board, availableCells }) => {
  let myMoves = keysWhereValue(me, board) || []
  let conditionsAvailable = gainConditionsContain(myMoves, availableCells)

  if (conditionsAvailable.length === 0) {
    return randomMove(availableCells)
  }

  // Select an available condition,
  // randomly in first move and select first condition after
  let gainConditionSelected = randomItem(conditionsAvailable)

  // Randomly select a cell from the move selected
  let cells = gainConditionSelected.filter(cell => !myMoves.includes(cell))

  return randomMove(cells)
}

async function bestMoveWithMinmax (me, board) {
  const worker = createWorker('static/minmax.js')

  const move = await worker.run({
    tempBoard: Object.assign({}, board),
    currentPlayer: me,
    depth: 0,
    me
  })

  return move
}

async function playByLevel ({level, me, board}) {
  const availableCells = keysWhereValue('', board)

  switch (level.id) {
    case 1:
      return randomMove(availableCells)
    case 2:
      return selectOneGainCondition({me, board, availableCells})
    case 3:
    case 4:
      return bestMoveWithMinmax(me, board)
  }
}

async function move (params) {
  const cellIndex = await playByLevel(params)

  return new Promise(resolve => setTimeout(() => {
    resolve(cellIndex)
  }, delays.robotMove))
}

export default {
  move
}
