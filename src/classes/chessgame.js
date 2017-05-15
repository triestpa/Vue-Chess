import Chess from '../assets/js/chess.js'

export default class ChessGame {
  constructor () {
    this.game = Chess()
    this.reversed = false
  }

  reverse () {
    this.reversed = !this.reversed
  }

  reset () {
    this.game.reset()
    this.reversed = false
  }

  getBoard () {
    const updatedBoard = this.game.board()
    const updatedBoardArray = this.transformBoardToArray(updatedBoard)
    return updatedBoardArray
  }

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
  }

  calculateMove (sourceIndex, targetIndex) {
    const sourceStr = this.getPositionStringForIndex(sourceIndex)
    const targetStr = this.getPositionStringForIndex(targetIndex)

    return this.game.move({
      from: sourceStr,
      to: targetStr,
      promotion: 'q'
    })
  }

  getAvailableMoves (index) {
    const moves = this.game.moves({
      square: this.getPositionStringForIndex(index),
      verbose: true
    })

    const moveIndeces = []
    for (let move of moves) {
      moveIndeces.push(this.getIndexForPositionString(move.to))
    }

    return moveIndeces
  }

  getCoordinates (index) {
    let row = Math.floor(index / 8)
    let column = index % 8

    if (this.reversed) {
      row = Math.abs(row - 7)
      column = Math.abs(column - 7)
    }

    return {
      row,
      column
    }
  }

  isPrimarySquareColor (index) {
    let { row, column } = this.getCoordinates(index)
    if ((row + column) % 2 === 0) {
      return true
    }
  }

  getPositionStringForIndex (index) {
    let { row, column } = this.getCoordinates(index)
    const number = Math.abs(row - 7) + 1
    const letter = String.fromCharCode(97 + column)
    return `${letter}${number}`
  }

  getPositionStringForXY (row, column) {
    const number = Math.abs(column - 7) + 1
    const letter = String.fromCharCode(97 + row)
    return `${letter}${number}`
  }

  getIndexForPositionString (positionString = 'a1') {
    const { row, column } = this.getCoordinatesForPositionString(positionString)
    let index = Math.abs(column - 8) + (row * 8)
    index = Math.abs(index - 64)
    return index
  }

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
