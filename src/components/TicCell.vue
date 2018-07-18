<template>
  <td :class="[{'is-selected': isSelected}, frozenClass]" @click="strike">{{ value }}</td>
</template>

<script>
import { mapState } from 'vuex'
import { isEmpty } from '@/utils'

export default {
  props: ['index', 'value'],

  data () {
    return { isSelected: false }
  },

  computed: {
    ...mapState(['activePlayer']),
    ...mapState('board', ['freeze', 'winner']),

    frozenClass () {
      return !this.canStrike() ? 'frozen' : ''
    }
  },

  watch: {
    winner () {
      if (!isEmpty(this.winner)) {
        this.isSelected = this.winner.condition.includes(parseInt(this.index))
      } else {
        this.isSelected = false
      }
    }
  },

  mounted () {
    this.$bus.$on('restart-game', _ => this.resetData())
  },

  methods: {
    strike () {
      if (!this.canStrike()) return

      const data = {
        cellIndex: parseInt(this.index),
        player: this.activePlayer
      }

      this.$store
        .dispatch('board/strikeCell', data)
        .then(() => this.$bus.$emit('strike', data))
    },

    canStrike () {
      return !this.freeze && isEmpty(this.value) && isEmpty(this.winner)
    },

    resetData () {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style scoped>
td {
  width: 100px;
  height: 100px;
  transition: background-color .06s ease-in;
  text-align: center;
  font-size: 4.2rem;
  cursor: pointer;
}

@media screen and (max-width: 320px) {
  td {
    width: 85px;
    height: 85px;
    font-size: 3.2rem;
  }
}

td:hover:not(.is-selected):not(.frozen) {
  background-color: rgba(64, 64, 64, 0.1);
}

.frozen {
  cursor: not-allowed;
}

.is-selected {
  background-color: #FF9F1C;
}

</style>
