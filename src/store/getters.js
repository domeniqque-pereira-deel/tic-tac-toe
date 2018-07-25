
export default {
  isMultiplayer: state => state.gameMode === 'multiplayer',

  gameStatusMessage: ({gameStatus, activePlayer}, _, rootState) => {
    if (gameStatus === 'draw') {
      return {
        key: 'game.messages.draw'
      }
    }

    const player = rootState.board.winner.player || activePlayer

    return {
      key: `game.messages.${gameStatus}`,
      player,
      gameStatus
    }
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
