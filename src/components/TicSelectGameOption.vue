<template>
  <div class="select-game-box">
    <h4 class="select-game-title">Select a game option</h4>
    <div class="select-game-options">
      <div class="select-game-option" @click="sendGameOption('multiplayer')">
        <img src="~/../assets/networking.svg" alt="Play with another human">
        <p>Multiplayer</p>
      </div>
      <div class="select-game-option" @click="sendGameOption('single-player')">
        <img src="~/../assets/artificial-intelligence.svg" alt="Play against a robot">
        <p>Robot</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sendGameOption (gameType) {
      this.$emit('game-mode-selected', gameType)
    }
  }
}
</script>

<style scoped>
.select-game-box {
  opacity: 1;
  animation: fadeIn .2s ease-in;
}
.select-game-title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.select-game-options {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 3rem;
  padding: 15px;
}

.select-game-option {
  cursor: pointer;
  width: 250px;
  height: 180px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.25s ease-out;
  border-radius: 15px;
  margin: 5px 5px;
  box-shadow: 0 0 1px rgba(0,0,0, .4);
}

.select-game-option:hover {
  box-shadow: 0 0 8px rgba(0,0,0, .4);
}

.select-game-option img {
  max-width: 100px;
}

.select-game-option p {
  font-size: 1.5rem;
  margin-top: 8px;
}

@media screen and (max-width: 520px) {
  .select-game-title {
    font-size: 1rem;
  }

  .select-game-options {
    flex-direction: column;
  }

  .select-game-option {
    width: 100%;
    border: 1px dashed rgba(0,0,0,.3);
  }
}
</style>
