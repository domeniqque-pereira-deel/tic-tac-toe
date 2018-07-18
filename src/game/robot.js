import { createWorker } from '../utils/createWorker'
import { log } from '../utils/logger'
import {
  keysCellsWhereValue,
  gainConditionsContain,
  randomItem
} from './board'

const randomMove = availableCells => randomItem(availableCells)

const selectOneGainCondition = ({ me, board, availableCells }) => {
  let myMoves = keysCellsWhereValue(me, board) || []
  let conditionsAvailable = gainConditionsContain(myMoves, availableCells)

  if (conditionsAvailable.length === 0) {
    return {
      move: randomMove(availableCells),
      message: '(random_move)'
    }
  }

  // Select an available condition,
  // randomly in first move and select first condition after
  let gainConditionSelected = randomItem(conditionsAvailable)

  // Randomly select a cell from the move selected
  let cells = gainConditionSelected.filter(cell => !myMoves.includes(cell))

  return {
    move: randomMove(cells),
    message: `| Cells Available: ${cells} | Gain Condition Selected: ${gainConditionSelected}`
  }
}

function bestMoveWithMinmax (me, board) {
  const worker = createWorker('static/minmax.js')

  const move = worker.run({
    tempBoard: Object.assign({}, board),
    currentPlayer: me,
    depth: 0,
    me
  })

  return { move, message: '(minmax)' }
}

export async function move ({ me, board, gameLevel }) {
  return new Promise(resolve => {
    let availableCells = keysCellsWhereValue('', board)
    let result = {}

    switch (gameLevel) {
      case 1:
        result.move = randomMove(availableCells)
        result.message = '(random_move)'
        break
      case 2:
        result = selectOneGainCondition({ me, board, availableCells })
        break
      case 3:
      case 4:
        result = bestMoveWithMinmax(me, board)
        break
    }

    Promise.resolve(result.move).then(move => {
      log(`Robot => Selected Move ${move} ${result.message}`)

      // Delay to simulate human plays
      setTimeout(_ => { resolve(move) }, 300)
    })
  })
}

export default {
  move
}
