<template>
  <div class="chessboard-container">
    <div class="board">
      <div class="row" v-for="(row, rowIndex) in board">
        <div v-for="(square, colIndex) in board[rowIndex]"
            class="board-square"
            :class="isPrimarySquareColor(colIndex, rowIndex) ? 'board-square-light' : 'board-square-dark'">
              <!-- {{ getPositionString(colIndex, rowIndex) }} -->
              <img class="piece" :src="getIcon(square)" :class="square ? square.type: ''">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./chessboard.js"></script>

<style scoped lang="scss">
@import '../../_variables';

.chessboard-container {
  color: white;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.board {
  width: 50%;
  margin: 0 auto;
  flex-grow: 1;

  @include media('medium') {
    width: 100%
  }
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

.row {
  display: flex;
  flex-direction: row;
}

.board-square {
  width: 6.25vw;
  height: 6.25vw;
  display: flex;
  align-items: center;
  justify-content: center;

  @include media('medium') {
    width: 12.5vw;
    height: 12.5vw;
  }
}

.board-square-light {
  background: #B6B6B6;

}

.board-square-dark {
  background: #843F3F;
}

</style>
