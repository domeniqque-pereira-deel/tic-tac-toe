export default {
  game: {
    title: 'Tic-Tac-Toe',
    selectOption: 'I want to play against',
    options: {
      multiplayer: 'a friend',
      robot: 'the Robot'
    },
    actions: {
      btn_restart: 'Restart',
      btn_continue: 'Continue',
      label_coutdown: 'Time',
      locales: {
        english: 'English',
        portuguese: 'Portuguese'
      },
      credit: 'Credit',
      by: 'By'
    },
    messages: {
      draw: 'Draw!',
      turn: '{player}`s {gameStatus}!',
      win: '{player}`s {gameStatus}!',
      winner_title: 'You Win!',
      winner_sub_title: 'Woow! Very Good! :D'
    }
  },
  instructions: {
    title: 'Instructions',
    p1: 'Make more points than the robot and win the game',
    p2: '<b>How to make points</b>? Simple, do not let the robot win from you. When this happens you lose points',
    p3: 'Enjoy that in the early stages he is silly, is still learning to play',
    p4: 'But in the end beware of time. It is your enemy and will take your points',
    p5: '<b>Draw</b> or <b>win</b> before time runs out. You will have few seconds'
  }
}
