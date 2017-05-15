<template>
  <div>
    <chessboard :pgn="pgn" :side="side" v-on:move="boardChange($event)"></chessboard>
    <a class="button" v-on:click="randomMove()">Random</a>
    <a class="button" v-on:click="reset()">Reset</a>
    <a class="button" v-on:click="swapSides()">Swap</a>
    <pre>{{ game.ascii() }}</pre>
  </div>
</template>

<script src="./chess.js"></script>

<style scoped lang="scss">
@import '../../_variables';

</style>
