<template>
  <div id="app" class="card">
    <a v-show="!gameStarted"
      href="https://github.com/Domeniqque/tic-tac-toe"
      class="github-corner"
      aria-label="View source on Github">
       <svg width="60" height="60" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
       </svg>
    </a>

    <header>
      <h1 class="title" v-show="isMultiplayer || !gameStarted">
        {{ $t('game.title')}}
      </h1>

      <TicLevel v-show="!isMultiplayer && gameStarted"/>
    </header>

    <main>
      <TicSelectGameOption
        @game-mode-selected="setGameOption($event)"
        v-show="!gameStarted"/>

      <p class="message"
        :class="messageClass"
        v-show="!isMultiplayer && gameStarted">
        {{ gameMessage }}
      </p>

      <TicScore ref="score" v-show="gameStarted"/>

      <TicBoard v-show="gameStarted"/>

      <TicInstructions
        v-show="gameStarted && !isMultiplayer"
        showButton="true"/>

      <div class="card-footer" v-show="gameStarted" @click="restartGame">
        <button class="btn btn-restart">
          {{ $t('game.actions.btn_restart') }}
        </button>
      </div>
    </main>

    <footer v-show="!gameStarted">
      <TicSelectLocale v-show="!gameStarted"/>
      <div class="footer">
        <span>
          By <a href="http://github.com/Domeniqque">Dylluar</a>
        </span>
        <span>
          Icons by <a href="https://www.flaticon.com/authors/eucalyp" target="_blank" title="Eucalyp">Eucalyp</a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { resetGlobalState } from '@/store'
import TicSelectGameOption from '@/components/TicSelectGameOption.vue'
import TicBoard from '@/components/TicBoard.vue'
import TicScore from '@/components/TicScore.vue'
import TicLevel from '@/components/TicLevel.vue'
import TicSelectLocale from '@/components/TicSelectLocale.vue'
import TicInstructions from '@/components/TicInstructions.vue'
import Robot from '@/game/robot'
import swal from 'sweetalert2'
import { isEmpty, clone } from '@/utils'

export default {
  name: 'app',
  components: {
    TicSelectGameOption,
    TicBoard,
    TicScore,
    TicLevel,
    TicInstructions,
    TicSelectLocale
  },

  data () {
    return { message: '' }
  },

  computed: {
    ...mapState([
      'gameStatus',
      'gameStarted',
      'activePlayer',
      'robotPlayer'
    ]),
    ...mapGetters([
      'isMultiplayer',
      'gameStatusMessage',
      'statusMessageClass'
    ]),
    ...mapGetters('board', [
      'boardIsEmpty'
    ]),
    ...mapGetters('score', [
      'currentLevel',
      'pointsToWin',
      'points'
    ]),
    ...mapState('board', [
      'moves',
      'winner',
      'cells'
    ]),

    gameMessage () {
      const key = this.gameStatusMessage.key
      return this.$i18n.t(key, this.gameStatusMessage)
    },

    messageClass () {
      return isEmpty(this.message)
        ? this.statusMessageClass
        : 'message-default'
    }
  },

  watch: {
    winner () {
      if (!isEmpty(this.winner)) {
        this.prepareToNextGame()
      }
    },
    async moves () {
      // Waiting x to play
      if (this.boardIsEmpty) return

      const status = await this.checkGameState()

      if (status === 'turn' &&
        !this.isMultiplayer &&
        (this.activePlayer === this.robotPlayer)) {
        this.robotMove()
      }
    },

    points () {
      if (this.points === this.pointsToWin) {
        setTimeout(() => {
          swal({
            title: this.$i18n.t('game.messages.winner_title'),
            text: this.$i18n.t('game.messages.winner_sub_title'),
            padding: '3em',
            width: 300,
            backdrop: `
              rgb(28, 70, 120, .4)
              url("/static/img/nyan-cat.gif")
              left bottom
              no-repeat
            `
          }).then(() => {
            this.restartGame()
          })
        }, 500)
      }
    }
  },

  methods: {
    ...mapActions([
      'checkGameState',
      'prepareToNextGame',
      'setGameOption'
    ]),

    restartGame () {
      resetGlobalState()
      this.$bus.$emit('restart-game')
    },

    async robotMove () {
      this.$store.commit('board/FREEZE', true)
      const board = clone(this.cells)
      const player = this.robotPlayer

      const cellIndex = await Robot.move({
        level: this.currentLevel,
        me: player,
        board
      })

      await this.$store.dispatch('board/strikeCell', {
        cellIndex,
        player
      })

      this.$store.commit('board/FREEZE', false)
      return cellIndex
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Indie Flower';
  font-style: normal;
  font-weight: 400;
  src: url('https://domeniqque.github.io/tic-tac-toe/static/fonts/IndieFlower.woff2') format('woff2');
}

:root {
  --font-primary: 'Indie Flower', cursive, 'Avenir', Helvetica, Arial, sans-serif;
  --font-secondary: 'Avenir', Helvetica, Arial, sans-serif;
}

*, :after, :before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: rgba(0,0,0,.02);
  color: #143F59;
  font-family: var(--font-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

header {
  margin: 10px 0;
}

.card {
  position: relative;
  background-color: #fff;
  z-index: 1;
  overflow: hidden;
}

.title {
  font-size: 3.5rem;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 0;
}

.card-footer {
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px 0;
}

@media screen and (max-width: 450px) {
  .card {
    width: 100%;
    height: 100vh;
  }
  .title {
    font-size: 2.5rem;
  }
}

@media screen and (min-width: 450px) {
  .card {
    width: 350px;
    padding: 10px 0;
    margin-left: 0;
    margin-right: 0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,.4);
  }
}

@media screen and (min-width: 540px) {
  body {
    height: 100vh;
  }
  .card {
    width: 500px;
  }
}

.message {
  padding-top: 15px;
  font-size: 1.5rem;
  text-align: center;
  font-family: var(--font-secondary);
}

.message-default {
  color: #2EC4B6;
}

.message-win {
  color: red;
}

.message-draw {
  color: #F19953; /*#E71D36;*/
}

.btn {
  border: none;
  box-shadow: 1px 1px 2px rgba(0,0,0,.4);
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-secondary);
  font-weight: 600;
  font-size: 14px;
  padding: 10px 20px;
  transition: box-shadow .2s linear;
}

.btn:hover {
  box-shadow: 3px 3px 6px rgba(0,0,0,.4);
}

.btn-restart {
  background-color: #1C4678;
  color: #fff;
}

@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  position: relative;
  font-family: var(--font-secondary);
  padding: 10px 0;
}

.footer a {
  color: #494949;
}

.footer span:first-child:after {
  content: '|';
  padding-right: 5px;
  padding-left: 5px;
}

.footer a:hover {
  color: rgb(0, 0, 238);
}

/*
  Github corners
  http://tholman.com/github-corners/
*/
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0)
  }
  20%,
  60% {
    transform: rotate(-25deg)
  }
  40%,
  80% {
    transform: rotate(10deg)
  }
}

@media (max-width:500px) {
  .github-corner:hover .octo-arm {
    animation: none
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out
  }
}
</style>
