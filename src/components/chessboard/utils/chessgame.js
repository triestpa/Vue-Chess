import Chess from 'chess.js'

/**
 * Chess Game Manager Class.
 * Manage game-state and provide helper methods for converting the game to a 1d array
 */
export default class ChessGame {
  /** Contructor - Initialize a new game, optionally with the provided pgn record */
  constructor (pgn = undefined, side = 'w') {
    this.game = Chess()

    if (pgn) {
      this.game.load_pgn(pgn)
    }

    this.setSide(side)
  }

  /** Set the reversed memeber based on the side ('w' or 'b') */
  setSide (side) {
    this.reversed = (side === 'b')
  }

  /** Reset the game */
  reset () {
    this.game.reset()
  }

  /** Get the side whose turn it is ('w' or 'b') */
  getTurn () {
    return this.game.turn()
  }

  /** Get the pgn string for the current game  */
  getPGN () {
    return this.game.pgn()
  }

  /** Get the verbose history for the current game */
  getHistory () {
    return this.game.history({ verbose: true })
  }

  /** Get the board array to be rendered */
  getBoard () {
    const board = this.game.board()
    const boardArray = this.transformBoardToArray(board)

    if (this.reversed) {
      return boardArray.reverse()
    } else {
      return boardArray
    }
  }

  /** Convert the 2d board array into a 1d array with unique ids */
  transformBoardToArray (board) {
    const boardArray = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        boardArray.push({
          id: (i * 8) + j, // id will be equal to the original index position
          piece: board[i][j]
        })
      }
    }
    return boardArray
  }

  /** Calculate a move from one array index to another */
  calculateMove (sourceIndex, targetIndex) {
    const sourceStr = this.getPositionStringForIndex(sourceIndex)
    const targetStr = this.getPositionStringForIndex(targetIndex)

    return this.game.move({
      from: sourceStr,
      to: targetStr,
      promotion: 'q'
    })
  }

  // Get all available moves for a given index
  getAvailableMoves (index) {
    const moves = this.game.moves({
      square: this.getPositionStringForIndex(index),
      verbose: true
    })

    const moveIndeces = moves.map((move) => this.getIndexForPositionString(move.to))

    return moveIndeces
  }

  /** Get the x, y coordinates for an array index (based on an 8x8 grid)  */
  getCoordinates (index) {
    let row = Math.floor(index / 8)
    let column = index % 8

    if (this.reversed) {
      row = Math.abs(row - 7)
      column = Math.abs(column - 7)
    }

    return { row, column }
  }

  /** Check if a given index should have a light or dark background color */
  isSquareLight (index) {
    let { row, column } = this.getCoordinates(index)
    if ((row + column) % 2 === 0) {
      return true
    }
  }

  /** Get a position string, eg a1, from an array index */
  getPositionStringForIndex (index) {
    let { row, column } = this.getCoordinates(index)
    const number = Math.abs(row - 7) + 1
    const letter = String.fromCharCode(97 + column)
    return `${letter}${number}`
  }

  /** Get an array index, from given position string, eg a1 */
  getIndexForPositionString (positionString = 'a1') {
    const { row, column } = this.getCoordinatesForPositionString(positionString)
    let index = Math.abs(column - 8) + (row * 8)
    index = Math.abs(index - 64)
    return index
  }

  /** Get grid coordinates, from given position string, eg a1 */
  getCoordinatesForPositionString (positionString = 'a1') {
    let column = positionString.toLowerCase().charCodeAt(0) - 97
    let row = Number.parseInt(positionString[1]) - 1

    if (this.reversed) {
      column = Math.abs(column - 7)
      row = Math.abs(row - 7)
    }

    return { row, column }
  }
}
