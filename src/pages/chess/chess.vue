<template>
  <div class="page-container">
    <chessboard class="chessboard" :iconDir="iconDir" :pgn="pgn" :side="side" v-on:change="boardChange($event)"></chessboard>
    <div class="controls">
      <a class="button" v-on:click="randomMove()">Random</a>
      <a class="button" v-on:click="reset()">Reset</a>
      <a class="button" v-on:click="swapSides()">Swap</a>
      <pre>{{ game.ascii() }}</pre>
    </div>
  </div>
</template>

<script src="./chess.js"></script>

<style scoped lang="scss">
@import '../../_variables';

.page-container {
  display: flex;
  flex-direction: row;

  @include media('medium') {
    flex-direction: column;
  }
}

.chessboard {
  flex: 1;
  max-width: 50%;

  @include media('medium') {
    max-width: 100%
  }

  .controls {
    flex: 1
  }
}

</style>
