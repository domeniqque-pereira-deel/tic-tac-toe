<template>
  <div id="app" class="card">
    <header>
      <h1 class="title" v-show="isMultiplayer || !gameStarted">
        Tic Tac Toe
      </h1>
    </header>

    <main>
      <TicSelectGameOption
        @game-mode-selected="setGameOption($event)"
        v-show="!gameStarted"/>

      <TicScore ref="score"/>

      <TicBoard v-show="gameStarted"/>

      <div class="card-footer" v-show="gameStarted" @click="restartGame">
        <button class="btn btn-restart">
          Restart
        </button>
      </div>
    </main>

    <footer class="footer">
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
import { mapState, mapGetters } from 'vuex'
import { resetGlobalState } from '@/store'
import TicSelectGameOption from '@/components/TicSelectGameOption.vue'
import TicBoard from '@/components/TicBoard.vue'
// import TicScore from '@/components/TicScore.vue'

export default {
  name: 'app',
  components: {
    TicSelectGameOption,
    TicBoard
    // TicScore
  },

  computed: {
    ...mapState([ 'gameStarted' ]),
    ...mapGetters([ 'isMultiplayer' ])
  },

  methods: {
    restartGame () {
      resetGlobalState()
    },

    setGameOption (optionSelected) {
      this.$store.commit('SET_GAME_MODE', optionSelected)
      this.$store.commit('SET_GAME_STATE', true)
    }
  }
}
</script>

<style>
*, :after, :before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #FDFFFC;
  color: #143F59;
  font-family: 'Indie Flower', cursive, 'Avenir', Helvetica, Arial, sans-serif;
  user-select: none;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.card {
  position: relative;
  background-color: #fff;
  z-index: 1;
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
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0,0,0,.4);
  }
}

@media screen and (min-width: 541px) {
  .card {
    width: 500px;
  }
}

.btn {
  border: none;
  box-shadow: 1px 1px 2px rgba(0,0,0,.4);
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Indie Flower', cursive;
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
  0% { opacity: 0 }
  100% { opacity: 1 }
}

.footer {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 10px 0;
  margin-top: 10px;
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
