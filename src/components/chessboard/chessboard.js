import ChessGame from './utils/chessgame'

// outputs -> ongameend, oncapture, onstatechange

export default {
  name: 'chessboard',
  props: {
    pgn: {
      type: String,
      default: null
    },
    side: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
      chessGame: null,
      board: [],
      availableMoves: {},
      selectedIndex: -1
    }
  },
  computed: {
    // Return the board array to be displayed
    renderedBoard () {
      // If board is flipped, get reversed array
      if (this.chessGame.reversed) {
        return this.getReversedBoard()
      } else {
        return this.board
      }
    },
    turn () {
      this.chessGame.getTurn()
    }
  },
  created () {
    this.createGame()
    this.board = this.chessGame.getBoard()

    if (this.side === 'b') {
      this.chessGame.reversed = true
    }
  },
  watch: {
    'pgn': function (newVal, oldVal) {
      const newChess = new ChessGame(newVal)
      const moveHistory = newChess.getHistory()

      if (moveHistory.length === this.chessGame.getHistory().length + 1) {
        this.applyNewMove(moveHistory[this.chessGame.getHistory().length])
      } else {
        this.createGame()
        this.syncBoard()
      }
    },
    'side': function (newVal, oldVal) {
      this.chessGame.setSide(newVal)
    }
  },
  methods: {
    applyNewMove (newMove) {
      const srcIndex = this.chessGame.getIndexForPositionString(newMove.from)
      const targetIndex = this.chessGame.getIndexForPositionString(newMove.to)
      this.movePiece(srcIndex, targetIndex)
    },

    createGame () {
      this.chessGame = new ChessGame(this.pgn, this.side)
    },
    /** Flip board */
    switchSides () {
      this.chessGame.reverse()
    },

    /** Check is a square is an available move */
    isAvailableMove (index) {
      return (this.availableMoves[index] === true)
    },

    /** Get the icon for the piece */
    getIcon (square) {
      if (square.piece) {
        return require(`../../assets/icons/${square.piece.color}${square.piece.type}.svg`)
      }
    },

    /** Reset the board to original position */
    reset () {
      this.chessGame.reset()
      this.syncBoard()
    },

    /** Animate piece from one index to another */
    swap (oldIndex = 0, newIndex = 0) {
      const temp = this.board[newIndex]
      this.$set(this.board, newIndex, this.board[oldIndex])
      this.$set(this.board, oldIndex, temp)
    },

    /** Move a piece to the target index, if move is valid */
    movePiece (source, target) {
      const result = this.chessGame.calculateMove(source, target)

      // if result is undefined, move is invalid
      if (result) {
        this.swap(target, source)
        this.syncBoard()

        // waiting 200ms improves animation performance
        setTimeout(() => this.$emit('move', this.chessGame.getPGN()), 200)
      }
    },

    /** Sync the displayed board with the chessgame class instance */
    syncBoard () {
      const updatedBoard = this.chessGame.getBoard()

      // This Sync needs to be keep the current square Ids, but sync the peices, to avoid an unwanted animation.
      for (let i = 0; i < updatedBoard.length; i++) {
        if (this.board[i].piece !== updatedBoard[i].piece) {
          this.board[i].piece = updatedBoard[i].piece
        }
      }
    },

    /** Return a reversed copy of the current board */
    getReversedBoard (board) {
      // This reversal needs to be keep the current square Ids, but reverse the peices, to avoid an unwanted animation.
      let boardCopy = JSON.parse(JSON.stringify(this.board))

      // Sync board backwards
      for (let i = 0; i < boardCopy.length; i++) {
        boardCopy[(boardCopy.length - 1) - i].piece = this.board[i].piece
      }

      return boardCopy
    },

    /** Display all available moves for the selected piece */
    getAvailableMoves (index) {
      this.selectedIndex = index
      const moves = this.chessGame.getAvailableMoves(index)

      if (moves.length < 1) {
        this.selectedIndex = -1
      } else {
        for (let move of moves) {
          this.$set(this.availableMoves, move, true)
        }
      }
    },

    /** On-click for square, select square or try move if suqare is selected  */
    squareSelected (index) {
      this.availableMoves = {}
      if (this.selectedIndex > 0) {
        this.movePiece(this.selectedIndex, index)
        this.selectedIndex = -1
      } else {
        this.getAvailableMoves(index)
      }
    }
  }
}
