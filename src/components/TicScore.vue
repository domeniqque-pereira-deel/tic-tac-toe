<template>
    <div class="scoreboard">
        <!-- <div class="score-missing" v-show="!isMultiplayer && scoreMissing > 0">
          <span>Missing</span> <span class="signal">+</span>{{ scoreMissing }} <span>{{ sulfixMessage }}</span>
        </div> -->

        <!-- <div class="game-countdown"
          v-show="useCountdownTimer"
          :class="{ 'pulse-countdown': timer === 0 }">
          Time <span>{{ timer.toString().padStart(2,'0') }}</span>
        </div> -->

        <div class="score-item" id="box-player-x"
          :class="{'is-current-player': activePlayer === 'X'}">
            <img class="player-img" src="~/../assets/athlete-2.svg" alt="">
            <span class="player">X</span>
            <span class="points" :class="playerPointsClass">
              <IOdometer
                class="iOdometer"
                :value="score['X']"/>
            </span>
        </div>

        <div class="score-item" :class="{'is-current-player': activePlayer === 'O' }">
            <img class="player-img" src="~/../assets/man.svg" v-if="isMultiplayer" alt="">
            <img class="player-img" src="~/../assets/robot.svg" v-else alt="">
            <span class="player">O</span>
            <span class="points">
              <IOdometer
                class="iOdometer"
                :value="score['O']"/>
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { isEmpty } from '@/utils'
import IOdometer from 'vue-odometer'
import 'odometer/themes/odometer-theme-default.css'

export default {
  components: { IOdometer },
  computed: {
    ...mapGetters(['isMultiplayer']),
    ...mapState(['activePlayer']),
    ...mapState('board', ['winner']),
    ...mapState('score', [
      'score',
      'playerPointsClass'
    ])
  },

  watch: {
    winner () {
      if (!isEmpty(this.winner)) {
        this.incrementPlayerScore(this.winner.player)
      }
    }
  },

  methods: {
    incrementPlayerScore (player) {
      this.$store.commit('score/INCREMENT_PLAYER_SCORE', player)
    }
  }
}
</script>

<style scoped>
.scoreboard {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: center;
  position: relative;
}

.score-missing {
  color: #F85A6A;
  background-color: #fff;
  border-top: 1px solid #E4E4E4;
  border-bottom: 1px solid #E4E4E4;
  border-right: 2px solid #F85A6A;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 2px 10px;
  position: absolute;
  left: 0;
  bottom: 11px;
  z-index: 9000;
}

.score-missing.expanded span.signal {
  display: none;
}

.score-missing:not(.expanded) span:not(.signal) {
  display: none;
  animation: fadeIn 1s;
}

.score-missing:hover span.signal {
  display: none;
}

.score-missing:hover span:not(.signal) {
  display: inline;
}

.game-countdown {
  background-color: #fff;
  border-top: 1px solid #E4E4E4;
  border-bottom: 1px solid #E4E4E4;
  border-left: 2px solid #F85A6A;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 2px 10px;
  position: absolute;
  right: 0;
  bottom: 11px;
  z-index: 9000;
}

.game-countdown span {
  color: #F85A6A;
  width: 14px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.pulse-countdown {
  animation: pulse 1s ease-out;
}

@keyframes pulse {
  0%, 100% {
    background-color: #fff;
  }
  50% {
    background-color: #F85A6A;
  }
}

.score-item {
  border: 1px solid #E4E4E4;
  border-bottom: 5px solid #E4E4E4;
  border-radius: 5px;
  position: relative;
  font-size: 1.5rem;
  font-weight: 900;
  margin: 4px;
  padding-left: 15px;
  width: 120px;
  transition: border-bottom .3s ease-in-out;
  height: 40px;
}

.player {
  margin-left: 30px;
}

.player-img {
  width: 30px;
  position: absolute;
  top: 5px;
  left: 5px;
  padding-right: 5px;
  margin-right: 10px;
  border-right: 1px solid #E4E4E4;
}

.is-current-player {
  border-bottom: 5px solid #F19953;
}

.points {
  color: #404040;
  font-weight: 200;
  font-size: 1.2rem;
  position: absolute;
  right: 25px;
  top: 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

@media screen and (max-width: 360px) {
  .score-item {
    width: 70px;
  }

  .points {
    right: 10px;
  }

  .player {
    display: none;
  }
}

</style>
