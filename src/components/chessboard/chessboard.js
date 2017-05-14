import Chess from '../../assets/js/chess.js'

export default {
  name: 'chessboard',
  data () {
    return {
      chess: Chess(),
      msg: 'Welcome to Your Vue.js App',
      board: []
    }
  },
  created () {
    this.board = this.chess.board()
    console.log(this.board)
  },
  methods: {
    isPrimarySquareColor (row, col) {
      if ((row + col) % 2 === 0) {
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
      if (square) {
        return require(`../../assets/icons/${square.color}${square.type}.svg`)
      }
    }
  }
}

