import Chess from '../../assets/js/chess.js'

export default {
  name: 'chessboard',
  data () {
    return {
      chess: Chess(),
      msg: 'Welcome to Your Vue.js App',
      board: [],
      selectedIndex: -1
    }
  },
  created () {
    this.board = this.chess.board()
    console.log(this.board)
    this.board = this.transformBoardToArray(this.board)
  },
  methods: {
    transformBoardToArray (board) {
      const boardArray = []
      for (let row of board) {
        for (let square of row) {
          boardArray.push({
            id: Math.floor(Math.random() * 1000),
            piece: square
          })
        }
      }
      console.log(boardArray)
      return boardArray
    },
    getCoordinates (index) {
      let row = Math.floor(index / 8)
      let column = index % 8
      return {
        row,
        column
      }
    },
    isPrimarySquareColor (index) {
      let { row, column } = this.getCoordinates(index)
      if ((row + column) % 2 === 0) {
        return true
      }
    },
    getPositionString (row, column) {
      const number = Math.abs(column - 7) + 1
      const letter = String.fromCharCode(97 + row)
      return `${letter}${number}`
    },
    getValueForRow (positionString = 'a1') {
      const row = positionString.toLowerCase().charCodeAt(0) - 97
      const column = Number.parseInt(positionString.charCodeAt(1)) - 1
      return { column, row }
    },
    getIcon (square) {
      if (square.piece) {
        return require(`../../assets/icons/${square.piece.color}${square.piece.type}.svg`)
      }
    },
    swap (oldIndex = 0, newIndex = 0) {
      const temp = this.board[newIndex]
      this.$set(this.board, newIndex, this.board[oldIndex])
      this.$set(this.board, oldIndex, temp)
    },
    squareSelected (index) {
      console.log(index)
      if (this.selectedIndex > 0) {
        this.swap(index, this.selectedIndex)
        this.selectedIndex = -1
      } else {
        this.selectedIndex = index
      }
    }
  }
}
