<template>
  <div class="chessboard-container">
    <div ref="board" class="board board-background">
      <div class="square"
          v-for="(square, squareIndex) in board"
          :style="squareStyle"
          :class="{
            'board-square-dark': !chessGame.isSquareLight(squareIndex),
            'board-square-light': chessGame.isSquareLight(squareIndex),
            'highlighted-red': isAvailableMove(squareIndex) && square.piece,
            'highlighted-yellow': (selectedIndex === squareIndex)
            }">
        <i  class="circle" v-if="isAvailableMove(squareIndex) && !square.piece"/>
      </div>
    </div>
    <transition-group name="board-squares" tag="div" class="board">
      <div class="square"
            v-on:dragover="dragOver(squareIndex)"
            v-for="(square, squareIndex) in board"
            :key="square.id"
            :style="squareStyle"
            v-on:click="squareSelected(squareIndex)">
          <img draggable="true" v-on:dragstart="drag(squareIndex)" v-if="square.piece" class="piece" :src="getIcon(square)">
      </div>
    </transition-group>
    </div>
  </div>
</template>

<script src="./chessboard.js"></script>

<style scoped lang="scss">

.board-square-light {
  background: #A77C51;
}

.board-square-dark {
  background: #602B16;
}

.highlighted-yellow {
  background: rgba(234, 136, 37, 1);
}

.highlighted-green {
  background: rgba(65, 240, 65, 0.2);
}

.highlighted-blue {
  background: rgba(65, 65, 240, 0.5);
}

.highlighted-red {
  background: rgba(180, 0, 0, 1);
}

.circle {
	border-radius: 50%;
	width: 30%;
	height: 30%;
  background: rgba(234, 136, 37, 1);
}

.chessboard-container {
  color: white;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 0;
  position: relative;
  margin: 0 auto;
}

.board-squares-move {
  transition: transform .3s;
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
  cursor: grab;
}

.mainpiece {
  padding-bottom: 5px;
}

.square {
  flex-grow: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

</style>
