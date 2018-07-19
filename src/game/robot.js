import { randomItem, keysWhereValue } from '@/utils'
import { delays } from '@/game'

const randomMove = availableCells => randomItem(availableCells)

function move ({me, board}) {
  const availableCells = keysWhereValue('', board)
  const cellIndex = randomMove(availableCells)

  return new Promise(resolve => setTimeout(() => {
    resolve(cellIndex)
  }, delays.robotMove))
}

export default {
  move
}
