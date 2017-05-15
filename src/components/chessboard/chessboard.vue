<template>
  <div class="chessboard-container">
    <div class="board board-background">
      <div class="square"
        v-for="(square, squareIndex) in renderedBoard"
        :class="chessGame.isPrimarySquareColor(squareIndex) ? 'board-square-light' : 'board-square-dark'">
      </div>
    </div>
    <transition-group name="board-squares" tag="div" class="board">
      <div class="square piece"
          v-for="(square, squareIndex) in renderedBoard"
          v-bind:key="square.id"
          v-on:click="squareSelected(squareIndex)"
          :class="{ 'highlighted-red': isAvailableMove(squareIndex) && square.piece,
                    'highlighted-yellow': (selectedIndex === squareIndex) }">
            <!-- {{ getPositionStringForIndex(squareIndex) }} -->
            <i class="circle" v-if="isAvailableMove(squareIndex) && !square.piece"/>
            <img class="piece" :src="getIcon(square)">
        </div>
    </transition-group>
    </div>
  </div>
</template>

<script src="./chessboard.js"></script>

<style scoped lang="scss">
@import '../../_variables';

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
  width: 50%;
  position: relative;
  margin: 0 auto;

  @include media('medium') {
    width: 100%
  }
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
}

.mainpiece {
  padding-bottom: 5px;
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
  background: #A77C51;

}

.board-square-dark {
  background: #602B16;
}

</style>
