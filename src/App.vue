<template>
  <div id="app" class="card">
    <a v-show="!gameStarted"
      href="https://github.com/Domeniqque/tic-tac-toe"
      target="_blank"
      rel="noopener"
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

      <TicModal
        :show="gameStarted && !isMultiplayer && showInstructions"
        @close="showInstructions = false">
        <h1>{{ $t('instructions.title') }}</h1>

        <p v-html="$t('instructions.p1')"></p>
        <p v-html="$t('instructions.p2')"></p>
        <p v-html="$t('instructions.p3')"></p>
        <p v-html="$t('instructions.p4')"></p>
        <p v-html="$t('instructions.p5')"></p>
      </TicModal>

      <div class="card-footer" v-show="gameStarted">
        <button class="btn btn-restart" @click.prevent="restartGame">
          {{ $t('game.actions.btn_restart') }}
        </button>

        <button class="btn btn-show"
          @click.prevent="showInstructions = true">?</button>
      </div>
    </main>

    <footer v-show="!gameStarted">
      <TicSelectLocale v-show="!gameStarted"/>

      <TicModal
        :show="showCredits"
        @close="showCredits = false">
        <h1>Credits</h1>
        <h3>Icons from <a href="www.flaticon.com">flaticon.com</a> made by</h3>
        <ul title="From www.flaticon.com is licensed by CC 3.0 BY">
          <li>
            <a href="https://www.flaticon.com/authors/eucalyp" target="_blank" rel="noopener" title="Eucalyp">Eucalyp</a>
          </li>
          <li>
            <a href="http://www.freepik.com" target="_blank" rel="noopener" title="Freepik">Freepik</a>
          </li>
        </ul>

        <h3>Gifs <small>on <a href="giphy.com">Gyphy.com</a></small></h3>
        <ul>
          <li v-for="{ author, name } in animations()">
            <a :href="author" target="_blank" rel="noopener">{{ name }}</a>
          </li>
        </ul>

        <h3>Nyan cat song</h3>
        <ul>
          <li>
            <a href="https://archive.org/details/nyannyannyan">audionyannyannyan</a>
          </li>
        </ul>
      </TicModal>

      <div class="footer">
        <span>
          {{ $t('game.actions.by') }}&nbsp;<a href="https://github.com/Domeniqque">Domeniqque</a>
        </span>
        <span>
          <a href="#" @click.prevent="showCredits = true">{{ $t('game.actions.credit') }}</a>
        </span>
      </div>
    </footer>

    <div class="end-animation" :style="endAnimationStyle" v-show="showEndAnimation">
      <h1>{{ $t('game.messages.winner_title') }}</h1>
      <h2>{{ $t('game.messages.winner_sub_title') }}</h2>
      <div>
        <button class="btn btn-restart" @click.prevent="restartGame()">
          {{ $t('game.actions.btn_continue') }}
        </button>
      </div>

      <audio ref="audioWin" :src="$mountUri('static/songs/NyanCat.mp3')" preload="auto" loop></audio>
    </div>
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
import TicModal from '@/components/TicModal.vue'
import Robot from '@/game/robot'
import { isEmpty, clone, randomItem } from '@/utils'
import { delays } from '@/game'

export default {
  name: 'app',
  components: {
    TicSelectGameOption,
    TicBoard,
    TicScore,
    TicLevel,
    TicModal,
    TicSelectLocale
  },

  data () {
    return {
      message: '',
      showCredits: false,
      showInstructions: false
    }
  },

  computed: {
    ...mapState([
      'gameStatus',
      'gameStarted',
      'activePlayer',
      'robotPlayer',
      'showEndAnimation'
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
    },

    endAnimationStyle () {
      const { url, backgroundColor } = randomItem(this.animations())

      return `
        background-color: ${backgroundColor};
        background-image: url(${this.$mountUri(url)});
      `
    }
  },

  watch: {
    async moves () {
      // Waiting x to play
      if (this.boardIsEmpty) return

      this._freeze()
      const status = await this.checkGameState(true)

      if (status === 'win') {
        this.prepareToNextGame()
      }

      if (status === 'turn' &&
        !this.isMultiplayer &&
        (this.activePlayer === this.robotPlayer)) {
        this.robotMove()
      }

      this._unfreeze()
    },

    points () {
      if (this.points === this.pointsToWin) {
        setTimeout(() => {
          this.initWinAnimation()
        }, delays.startEndAnimation)
      }
    }
  },

  methods: {
    ...mapActions([
      'checkGameState',
      'prepareToNextGame',
      'setGameOption'
    ]),

    animations () {
      return [
        {
          url: 'static/img/nyan-cat.gif',
          backgroundColor: '#083660',
          name: 'Nyan-cat',
          author: 'http://gph.is/Vwznl1'
        }, {
          url: 'static/img/nyan-cat-breaking.gif',
          backgroundColor: '#000000',
          name: 'Nyan-cat breaking',
          author: 'http://gph.is/2cRKCDh'
        }, {
          url: 'static/img/nyan-cat-like-a-boss.gif',
          backgroundColor: '#0B3C73',
          name: 'Nyan-cat like a boss',
          author: 'https://gph.is/2cDEONL'
        }, {
          url: 'static/img/nyan-cat-adventure-time.gif',
          backgroundColor: '#073164',
          name: 'Nyan-cat and adventure time',
          author: 'https://gph.is/28VC9KL'
        }, {
          url: 'static/img/nyan-cat-zombie.gif',
          backgroundColor: '#083562',
          name: 'Nyan-cat zombie',
          author: 'https://gph.is/1syO5M6'
        }, {
          url: 'static/img/nyan-cat-running.gif',
          backgroundColor: '#043566',
          name: 'Nyan-cat running',
          author: 'https://gph.is/VwApgG'
        }
      ]
    },

    restartGame () {
      resetGlobalState()
      Object.assign(this.$data, this.$options.data())
      this.stopAnimations()
      this.$bus.$emit('restart-game')
    },

    async robotMove () {
      this._freeze()
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

      this._unfreeze()
      return cellIndex
    },

    initWinAnimation () {
      this.$store.commit('START_END_ANIMATION', true)
      this.$refs.audioWin.play()
    },

    stopAnimations () {
      const music = this.$refs.audioWin
      music.pause()
      music.currentTime = 0
    },

    _freeze () {
      this.$store.commit('board/FREEZE', true)
    },

    _unfreeze () {
      this.$store.commit('board/FREEZE', false)
    }
  }
}
</script>

<style>
:root {
  --font-primary: 'Indie Flower', cursive, 'Avenir', Helvetica, Arial, sans-serif;
  --font-secondary: 'Avenir', Helvetica, Arial, sans-serif;
}

@font-face {
  font-family: 'Indie Flower';
  font-style: normal;
  font-weight: 400;
  font-display: auto;
  src: local('IndieFlower'), url('~@/assets/fonts/IndieFlower.woff2') format('woff2');
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
  z-index: 0;
}

.btn-next {
  color: #fff;
  background-color: #143F59;
  float: right;
}

.btn-show {
  position: absolute;
  right: 10px;
  bottom: 20px;
  padding: 0 !important;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: none;
  font-size: 1.2em;
  z-index: 100;
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

.footer span:nth-child(1):after {
  content: '|';
  position: relative;
  margin: 0 10px;
}

a {
  color: #494949;
}

a:hover {
  color: rgb(0, 0, 238);
}

.end-animation {
  display: grid;
  grid-template-rows: 0.5fr 5fr 1fr;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5000;
  text-align: center;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;
}

.end-animation h1, .end-animation h2 {
  color: white;
  padding: 10px 0;
  text-shadow: 0 4px rgba(0,0,0,.4)
}

.end-animation h1 {
  font-size: 3rem;
}

.end-animation h2 {
  font-size: 2rem;
}

ul {
  padding-left: 20px;
  padding-bottom: 10px;
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
