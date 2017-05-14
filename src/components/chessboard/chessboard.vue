<template>
  <div class="chessboard-container">
    <div class="board board-background">
      <div class="square" v-for="(square, squareIndex) in board"
        :class="isPrimarySquareColor(squareIndex) ? 'board-square-light' : 'board-square-dark'">
      </div>
    </div>
    <transition-group name="board-squares" tag="div" class="board">
      <div class="square piece" v-for="(square, squareIndex) in board"
          v-bind:key="square.id" v-on:click="squareSelected(squareIndex)">
            <!-- {{ getPositionString(colIndex, rowIndex) }} -->
            <img class="piece" :src="getIcon(square)" :class="square ? square.type: ''">
        </div>
    </transition-group>
    <a class="button" v-on:click="swap(0,24)">Swap</a>
    </div>
  </div>
</template>

<script src="./chessboard.js"></script>

<style scoped lang="scss">
@import '../../_variables';

.chessboard-container {
  color: white;
  flex-direction: row;
  flex-grow: 1;
  width: 50%;
  position: relative;
  margin: 0 auto;

  @include media('medium') {
    width: 100%
  }
}

.board-squares-move {
  transition: transform .5s;
}

.board-background {
  position: absolute;
  z-index:-1;
}

.board {
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.piece {
  max-width: 80%;
  max-height: 90%;
}

.mainpiece {
  padding-bottom: 5px;
}

.p {
  max-height: 70%;
}

.r {
  max-height: 70%;
}

.b {
  max-height: 80%;
}

.n {
  max-height: 80%;
}

.square {
  width: 6.25vw;
  height: 6.25vw;
  flex-grow: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;


  @include media('medium') {
    width: 12.5vw;
    height: 12.5vw;
  }
}

.piece {

}

.board-square-light {
  background: #B6B6B6;

}

.board-square-dark {
  background: #843F3F;
}

</style>
