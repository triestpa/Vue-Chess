import ChessGame from '../../classes/chessgame'

export default {
  name: 'chessboard',
  data () {
    return {
      chessGame: new ChessGame(),
      msg: 'Welcome to Your Vue.js App',
      board: [],
      selectedIndex: -1,
      moves: {}
    }
  },
  computed: {
    renderedBoard () {
      if (this.chessGame.reversed) {
        return this.getReversedBoard()
      } else {
        return this.board
      }
    }
  },
  created () {
    this.board = this.chessGame.board
  },
  methods: {
    switchSides () {
      this.chessGame.reverse()
    },

    isAvailableMove (index) {
      return (this.moves[index] === true)
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

      const result = this.chessGame.calculateMove(source, target)
      this.selectedIndex = -1
      console.log(this.chessGame.game.ascii())

      if (result) {
        this.swap(target, source)
        this.syncBoard()
        setTimeout(this.switchSides, 1000)
      } else {
        console.log('invalid move!')
      }
    },

    syncBoard () {
      const updatedBoard = this.chessGame.getBoard()

      // Sync board
      for (let i = 0; i < updatedBoard.length; i++) {
        if (this.board[i].piece !== updatedBoard[i].piece) {
          this.board[i].piece = updatedBoard[i].piece
        }
      }
    },

    getReversedBoard (board) {
      let boardCopy = JSON.parse(JSON.stringify(this.board))

      // Sync board
      for (let i = 0; i < boardCopy.length; i++) {
        if (boardCopy[boardCopy.length - 1 - i].piece && this.board[i].piece) {
          console.log(this.board[i].piece.color)
          console.log(`${boardCopy[boardCopy.length - 1 - i].piece.color} -> ${this.board[i].piece.color}`)
        }
        boardCopy[(boardCopy.length - 1) - i].piece = this.board[i].piece
      }

      return boardCopy
    },

    getAvailableMoves (index) {
      this.selectedIndex = index
      const moves = this.chessGame.getAvailableMoves(index)

      if (moves.length < 1) {
        this.selectedIndex = -1
      } else {
        for (let move of moves) {
          this.$set(this.moves, move, true)
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
