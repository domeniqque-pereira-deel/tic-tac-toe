<template>
    <div class="scoreboard">
        <div class="score-item" id="box-player-x"
          :class="{'is-current-player': activePlayer === 'X'}" :style="scoreItemStyle">
            <img class="player-img" src="~@/assets/athlete.svg" alt="">
            <p class="player">X</p>
            <p class="points" v-if="isMultiplayer">
              <IOdometer
                class="iOdometer"
                :value="score['X']"/>
            </p>
        </div>

        <div class="score-item" :class="{'is-current-player': activePlayer === 'O' }" :style="scoreItemStyle">
            <img class="player-img" src="~@/assets/man.png" v-show="!isMultiplayer" alt="">
            <img class="player-img" src="~@/assets/robot.svg" v-show="!isMultiplayer" alt="">
            <p class="player">O</p>
            <p class="points" v-if="isMultiplayer">
              <IOdometer
                class="iOdometer"
                :value="score['O']"/>
            </p>
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
    ]),
    scoreItemStyle () {
      const colums = this.isMultiplayer ? 3 : 2
      return `--score-columns: ${colums};`
    }
  },

  watch: {
    winner () {
      if (!isEmpty(this.winner)) {
        this.incrementPlayerScore(this.winner.player)
      }
    }
  },

  mounted () {
    this.$bus.$on('restart-game', () => this.resetState())
  },

  methods: {
    incrementPlayerScore (player) {
      this.$store.commit('score/INCREMENT_PLAYER_SCORE', player)
      this.$bus.$emit('score-updated', { player })
    },
    resetState () {
      this.$store.commit('score/RESET_STATE')
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
  --score-columns: 3;
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
  font-size: 1.5rem;
  font-weight: 900;
  margin: 4px;
  transition: border-bottom .3s ease-in-out;
  height: 40px;
  display: grid;
  grid-template-columns: repeat(var(--score-columns), 1fr);
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
  overflow: hidden;
}

.player {
  border-left: 1px solid #E4E4E4;
  padding: 0 10px;
}

.player-img {
  width: 40px;
  padding: 10px;
}

.is-current-player {
  border-bottom: 5px solid #F19953;
}

.points {
  color: #404040;
  font-weight: 200;
  font-size: 1.4rem;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
