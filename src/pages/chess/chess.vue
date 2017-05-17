<template>
  <div class="page-container">
    <chessboard class="chessboard" :iconDir="iconDir" :pgn="pgn" :side="side" v-on:change="boardChange($event)"></chessboard>
    <div class="controls">
      <a class="button" v-on:click="randomMove()">Random</a>
      <a class="button" v-on:click="reset()">Reset</a>
      <a class="button" v-on:click="swapSides()">Swap</a>
      <pre>{{ game.ascii() }}</pre>
      <chat></chat>
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
  flex-basis: 70%;
  max-width: 100vh;
}

.controls {
  flex: 0;
  flex-basis: 30%;
}

</style>
