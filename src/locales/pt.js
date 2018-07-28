export default {
  game: {
    title: 'Jogo da Velha',
    selectOption: 'Quero jogar contra',
    options: {
      multiplayer: 'um amigo',
      robot: 'o Robô'
    },
    actions: {
      btn_restart: 'Reiniciar',
      btn_continue: 'Continuar',
      label_coutdown: 'Tempo',
      locales: {
        english: 'Inglês',
        portuguese: 'Português'
      },
      credit: 'Créditos',
      by: 'By'
    },
    messages: {
      draw: 'Empate!',
      turn: 'Vez de {player}!',
      win: '{player} ganhou!',
      winner_title: 'Você ganhou!',
      winner_sub_title: 'Woow! Parabéns! :D'
    }
  },
  instructions: {
    title: 'Instruções',
    p1: 'Faça mais pontos que o robô e ganhe o jogo',
    p2: '<b>Como fazer pontos?</b> Simples, não deixe que o robô ganhe de você. Quando isso acontece você perde pontos',
    p3: 'Aproveite as fases iniciais. O robô ainda é bobinho e está aprendendo a jogar',
    p4: 'Mas no final cuidado com o tempo. Ele é seu inimigo e pode levar os seus pontos',
    p5: '<b>Empate</b> ou <b>ganhe</b> antes do tempo acabar. Você terá poucos segundos'
  }
}
