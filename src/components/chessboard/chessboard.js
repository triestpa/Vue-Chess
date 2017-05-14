import Chess from '../../assets/js/chess.js'

export default {
  name: 'chessboard',
  data () {
    return {
      chess: Chess(),
      msg: 'Welcome to Your Vue.js App',
      board: [],
      selectedIndex: -1,
      moves: {},
      orientationBlack: false
    }
  },
  computed: {
    renderedBoard () {
      if (this.orientationBlack) {
        let boardCopy = JSON.parse(JSON.stringify(this.board))

        // Sync board
        for (let i = 0; i < boardCopy.length; i++) {
          if (boardCopy[boardCopy.length - 1 - i].piece && this.board[i].piece) {
            console.log(this.board[i].piece.color)
            console.log(`${boardCopy[boardCopy.length - 1 - i].piece.color} -> ${this.board[i].piece.color}`)
          }
          boardCopy[(boardCopy.length - 1) - i].piece = this.board[i].piece
        }

        console.log(boardCopy)

        return boardCopy
      } else {
        return this.board
      }
    }
  },
  created () {
    const board = this.chess.board()
    this.board = this.transformBoardToArray(board)
  },
  methods: {
    switchSides () {
      this.orientationBlack = !this.orientationBlack
    },
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
      return boardArray
    },
    isAvailableMove (index) {
      return (this.moves[index] === true)
    },
    getCoordinates (index) {
      let row = Math.floor(index / 8)
      let column = index % 8

      if (this.orientationBlack) {
        row = Math.abs(row - 7)
        column = Math.abs(column - 7)
      }

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
    getPositionStringForIndex (index) {
      let { row, column } = this.getCoordinates(index)
      const number = Math.abs(row - 7) + 1
      const letter = String.fromCharCode(97 + column)
      return `${letter}${number}`
    },
    getPositionStringForXY (row, column) {
      const number = Math.abs(column - 7) + 1
      const letter = String.fromCharCode(97 + row)
      return `${letter}${number}`
    },
    getIndexForPositionString (positionString = 'a1') {
      console.log(positionString)
      const { row, column } = this.getCoordinatesForPositionString(positionString)
      let index = Math.abs(column - 8) + (row * 8)
      console.log({ row, column })
      console.log(index)

      index = Math.abs(index - 64)
      return index
    },
    getCoordinatesForPositionString (positionString = 'a1') {
      let column = positionString.toLowerCase().charCodeAt(0) - 97
      let row = Number.parseInt(positionString[1]) - 1

      if (this.orientationBlack) {
        column = Math.abs(column - 7)
        row = Math.abs(row - 7)
      }

      return { row, column }
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
    movePiece (index) {
      const source = this.selectedIndex
      const target = index

      const sourceStr = this.getPositionStringForIndex(source)
      const targetStr = this.getPositionStringForIndex(target)

      const result = this.chess.move({
        from: sourceStr,
        to: targetStr,
        promotion: 'q'
      })

      this.selectedIndex = -1
      console.log(this.chess.ascii())

      if (result) {
        this.swap(target, source)
        this.syncBoard()
        setTimeout(this.switchSides, 500)
      } else {
        console.log('invalid move!')
      }
    },
    syncBoard () {
      const newBoard = this.chess.board()
      const newBoardArray = this.transformBoardToArray(newBoard)

      // Sync board
      for (let i = 0; i < newBoardArray.length; i++) {
        if (this.board[i].piece !== newBoardArray[i].piece) {
          this.board[i].piece = newBoardArray[i].piece
        }
      }
    },
    getAvailableMoves (index) {
      this.selectedIndex = index
      const moves = this.chess.moves({
        square: this.getPositionStringForIndex(index),
        verbose: true
      })

      if (moves.length < 1) {
        this.selectedIndex = -1
      } else {
        for (let move of moves) {
          this.$set(this.moves, this.getIndexForPositionString(move.to), true)
        }
      }
    },
    squareSelected (index) {
      this.moves = {}

      if (this.selectedIndex > 0) {
        this.movePiece(index)
      } else {
        this.getAvailableMoves(index)
      }
    }
  }
}
