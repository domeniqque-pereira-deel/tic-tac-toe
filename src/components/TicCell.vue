<template>
  <td :class="cellClass" @click="strike">{{ value }}</td>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['index', 'value'],
  computed: {
    ...mapState(['activePlayer']),
    ...mapState('board', ['freeze']),

    cellClass () {
      return (this.freeze && this.value !== '') ? 'frozen' : ''
    }
  },
  methods: {
    strike () {
      if (this.freeze && this.value !== '') return

      const data = {
        cellIndex: parseInt(this.index),
        player: this.activePlayer
      }

      this.$store.commit('board/STRIKE', data)
      this.$bus.$emit('strike', data)
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
