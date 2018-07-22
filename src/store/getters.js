
export default {
  isMultiplayer: state => state.gameMode === 'multiplayer',

  gameStatusMessage: ({gameStatus, activePlayer}, _, rootState) => {
    if (gameStatus === 'draw') return 'Draw!'

    const player = rootState.board.winner.player || activePlayer

    return `${player}'s ${gameStatus}!`
  },

  statusMessageClass: ({ gameStatus }) => {
    if (gameStatus === 'win') {
      return 'message-win'
    }

    return (gameStatus === 'draw')
      ? 'message-draw'
      : 'message-default'
  },

  player: state => state.robotPlayer === 'O' ? 'X' : 'O'
}
