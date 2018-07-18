<template>
  <td :class="[{'frozen': frozen || value !== ''}, cellClass]" @click="strike">{{ value }}</td>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      frozen: false,
      cellClass: ''
    }
  },
  methods: {
    strike () {

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
