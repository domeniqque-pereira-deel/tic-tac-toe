<template>
  <div class="board-background board-background-blue">
    <table id="board">
      <tr>
        <TicCell :value="cells[1]" index="1"/>
        <TicCell :value="cells[2]" index="2"/>
        <TicCell :value="cells[3]" index="3"/>
      </tr>
      <tr>
        <TicCell :value="cells[4]" index="4"/>
        <TicCell :value="cells[5]" index="5"/>
        <TicCell :value="cells[6]" index="6"/>
      </tr>
      <tr>
        <TicCell :value="cells[7]" index="7"/>
        <TicCell :value="cells[8]" index="8"/>
        <TicCell :value="cells[9]" index="9"/>
      </tr>
    </table>
  </div>
</template>

<script>
import TicCell from '@/components/TicCell'
import { mapState } from 'vuex'

export default {
  components: { TicCell },

  computed: {
    ...mapState('board', ['cells'])
  }
}
</script>

<style>
:root {
  --duration: 0s;
}
.level-message {
  font-size: 2.5rem;
  text-align: center;
  color: #1C4678;
  animation: fadeIn 0.2s;
}

.board-margin {
  margin-top: 70px;
}

.board-background {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 350px;
  animation: fadeIn 0.5s ease-in-out;
  position: relative;
  z-index: 800;
}

.board-background-blue {
  background-color: #1C4678;
}

table {
  background-color: #fff;
  border-collapse: collapse;
  box-shadow: -2px 4px 10px rgba(0,0,0,.2);
  border-radius: 15px;
  animation: fadeIn 0.2s ease-in-out;
  transition: transform 0.5s ease-in;
  animation: rotate var(--duration) ease alternate infinite;
}
/* Defining borders */
td:nth-child(2n) {
  border-left: 1px dashed rgba(0,0,0,.3);
  border-right: 1px dashed rgba(0,0,0,.3);
}

table tr:nth-child(2n) {
  border-bottom: 1px dashed rgba(0,0,0,.3);
  border-top: 1px dashed rgba(0,0,0,.3);
}

table tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

table tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

table tr:first-child td:first-child {
  border-top-left-radius: 12px;
}

table tr:first-child td:last-child {
  border-top-right-radius: 12px;
}

@keyframes rotate {
  0%, 10% {
    transform: rotate(0deg);
  }

  20%, 30% {
    transform: rotate(-90deg);
  }

  40%, 50% {
    transform: rotate(-180deg);
  }

  60%, 70% {
    transform: rotate(-90deg);
  }

  80%, 90% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(90deg);
  }
}
</style>
