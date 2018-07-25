<template>
  <div id="app" class="card">
    <header>
      <h1 class="title" v-show="isMultiplayer || !gameStarted">
        Tic Tac Toe
      </h1>
    </header>

    <main>
      <TicLevel v-show="!isMultiplayer && gameStarted"/>

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
          Restart
        </button>
      </div>
    </main>

    <footer class="footer" v-show="!gameStarted">
      <span>
        By <a href="http://github.com/Domeniqque">Dylluar</a>
      </span>
      <span>
        Icons by <a href="https://www.flaticon.com/authors/eucalyp" target="_blank" title="Eucalyp">Eucalyp</a>
      </span>
      <span>
        <a href="http://github.com/Domeniqque/tic-tac-toe">
          <img src="./assets/GitHub-Mark-64px.png" width="20">
        </a>
      </span>
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
    TicInstructions
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
      return this.message || this.gameStatusMessage
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
            title: 'You Win!',
            text: 'Woow! Very Good! :D',
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

      return cellIndex
    }
  }
}
</script>

<style>
:root {
  --font-primary: 'Indie Flower', cursive, 'Avenir', Helvetica, Arial, sans-serif;
  --font-secondary: 'Avenir', Helvetica, Arial, sans-serif;
}

*, :after, :before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: 'Indie Flower';
  font-style: normal;
  font-weight: 400;
  src: local('IndieFlower'), url(./assets/fonts/IndieFlower.woff2) format('woff2');
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

@media screen and (min-width: 541px) {
  body {
    height: 100vh;
  }
  .card {
    width: 500px;
  }
}

.message {
  padding: 5px 0;
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
  height: 60px;
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

.footer span:nth-last-child(1) {
  position: absolute;
  bottom: 2px;
}

.footer a:hover {
  color: rgb(0, 0, 238);
}
</style>
