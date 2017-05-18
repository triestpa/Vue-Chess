import ChessGame from './utils/chessgame'

/**
 * Chessboard VueJS Component.
 * Takes a PGN string and a side (w or b) as props
 */
export default {
  name: 'chessboard',
  props: {
    pgn: { // PGN is a string encoded with the current game state
      type: String,
      default: null
    },
    side: { // Side is either 'w' or 'b', and determines which board orientation to display
      type: String,
      default: 'w'
    },
    iconDir: {
      type: String,
      default: 'static/icons/'
    }
  },
  data () {
    return {
      chessGame: null, // the game logic class
      availableMoves: {}, // key/value obj of available moves
      selectedIndex: -1, // the currently selected square index
      squareStyle: { // Square style - values will be reset whenever window is resized
        height: '100px',
        width: '100px'
      }
    }
  },
  computed: {
    /** Return the board array to be displayed.  Board is an array of squares, some with pieces */
    board () {
      return this.chessGame.getBoard()
    },
    /** Return 'w' or 'b' if it is white or black's turn respectively */
    turn () {
      return this.chessGame.getTurn()
    },
    isActive () {
      return (this.side = this.chessGame.getTurn())
    }
  },
  watch: {
    /** Watch the PGN property so that the game can receive new moves from outside the component */
    'pgn': function (newVal, oldVal) {
      this.syncToPgn(newVal)
    },

    /** Watch the side property so that the UI reflects side-swaps */
    'side': function (newVal, oldVal) {
      // Set the board orientation whenever the side changes
      this.chessGame.setSide(newVal)
      this.selectedIndex = -1
      this.availableMoves = {}
    }
  },
  created () {
    // Initialize a new game for the provided pgn and side properties
    this.chessGame = new ChessGame(this.pgn, this.side)
  },
  mounted () {
    // On mounted,set the square width and hight
    this.$nextTick(() => {
      // Reset sqaure size every time window resizes
      window.addEventListener('resize', this.getSquareStyle)
      this.getSquareStyle()
    })
  },
  methods: {
    /** Set the square width/height to 1/8 of the total board width */
    getSquareStyle (event) {
      const board = this.$refs.board
      if (board) {
        // Subtract 1 from total width to avoid pixel-wrapping edge-case
        let squareEdgeLength = (board.offsetWidth - 1) / 8

        this.squareStyle = {
          height: `${squareEdgeLength}px`,
          width: `${squareEdgeLength}px`
        }
      }
    },

    /** Apply a new move to the board */
    applyNewMove (newMove) {
      const srcIndex = this.chessGame.getIndexForPositionString(newMove.from)
      const targetIndex = this.chessGame.getIndexForPositionString(newMove.to)
      this.movePiece(srcIndex, targetIndex)
    },

    /** Check if a square index is an available move */
    isAvailableMove (index) {
      return (this.availableMoves[index] === true)
    },

    /** Recieve a new pgn, and sync the displayed board to it */
    syncToPgn (newPgn) {
      this.selectedIndex = -1
      this.availableMoves = {}

      const newGame = new ChessGame(newPgn)

      // Get the histories for the two games
      const newHistory = newGame.getHistory()
      const oldHistory = this.chessGame.getHistory()

      // If the new pgn is one move ahead of the old, make the connecting move
      if (newHistory.length === oldHistory.length + 1) {
        this.applyNewMove(newHistory.pop())

      // Else if they are not the same length, reset the whole board to the new pgn
      } else if (newHistory.length !== oldHistory.length) {
        this.chessGame = new ChessGame(this.pgn, this.side)
      }
    },

    /** Get the icon for the piece */
    getIcon (square) {
      if (square.piece) {
        return this.iconDir + `${square.piece.color}${square.piece.type}.svg`
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
        this.swap(target, source) // Swap the contents of the squares
        this.syncBoard() // Sync the piece position with the board model
        this.availableMoves = {} // Reset available moves
        this.selectedIndex = -1 // Reset index

        // Emit the move to any parent components
        setTimeout(() => this.$emit('change', this.chessGame.getPGN()), 200)
      } else {
        this.selectedIndex = -1
        this.squareSelected(target)
      }
    },

    /** Sync the displayed board with the chessgame object. */
    syncBoard () {
      /**
       *  Why not just use "this.board = this.chessGame.getBoard()"? It has to do with
       *  how Vuejs handles reactivity within arrays.  Long-story-short, in order to sync
       *  any side-effects from the move, such as castles, promotions, and captures, it is best
       *  for our purposes to manually assign the changed pieces within the array item.
      */
      const updatedBoard = this.chessGame.getBoard()
      for (let i = 0; i < updatedBoard.length; i++) {
        if (this.board[i].piece !== updatedBoard[i].piece) {
          this.board[i].piece = updatedBoard[i].piece
        }
      }
    },

    /** Display all available moves for the selected piece */
    displayAvailableMoves () {
      const moves = this.chessGame.getAvailableMoves(this.selectedIndex)

      if (moves.length < 1) {
        // If no available moves, de-select the square
        this.selectedIndex = -1
      } else {
        // Set each move to true in the available moves dict
        for (let move of moves) {
          // Use $set for the changes to display instantly in the UI
          this.$set(this.availableMoves, move, true)
        }
      }
    },

    drag (index) {
      this.squareSelected(index)
    },

    dragOver (index) {
      console.log(index)
    },

    /** On-click for square, select square or try move if suqare is selected  */
    squareSelected (index) {
      if (this.isActive) {
        this.availableMoves = {}
        if (this.selectedIndex === index) {
          this.selectedIndex = -1
        } else if (this.selectedIndex > 0) {
          this.movePiece(this.selectedIndex, index)
        } else {
          this.selectedIndex = index
          this.displayAvailableMoves()
        }
      }
    }
  }
}
