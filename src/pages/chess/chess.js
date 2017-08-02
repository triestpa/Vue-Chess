// inputs -> fen string
// outputs -> onmove, ongameover, oncapture, onstatechange

import Chessboard from '../../components/chessboard/chessboard.vue'
// import Socket from '../../services/chess-socket'
import StockfishApi from '../../services/stockfish-api'
import Chess from 'chess.js'

export default {
  name: 'chess',
  components: {
    Chessboard
  },
  data () {
    return {
      pgn: undefined,
      userid: Math.floor(Math.random() * 1000),
      side: 'w',
      twoplayer: false,
      iconDir: 'static/icons/'
    }
  },
  computed: {
    game () {
      const chess = Chess()
      chess.load_pgn(this.pgn)
      return chess
    }
  },
  created () {
    this.newGame()
    this.stockfishApi = new StockfishApi()
    // this.ai = new Ai()
    // this.socket = new Socket(this.userid)

    // this.socket.onNewMove((newMove) => {
    //   console.log(newMove)
    //   this.move(newMove.move)
    // })
  },
  methods: {
    newGame () {
      const chess = Chess()
      this.pgn = chess.pgn()
    },
    boardChange (pgn) {
      this.pgn = pgn

      if (this.twoplayer) {
        setTimeout(this.swapSides, 1000)
      } else if (this.game.turn() !== this.side) {
        this.stockfishApi.getBestMove(this.game.fen()).then(response => {
          console.log(response)
          this.move(response.data)
        })
        // const history = this.game.history()
        // const lastMove = history[history.length - 1]
        // this.socket.emitMove(lastMove)
      }
    },
    swapSides () {
      if (this.side === 'w') {
        this.side = 'b'
      } else {
        this.side = 'w'
      }
    },
    randomMove () {
      const moves = this.game.moves()
      const move = moves[Math.floor(Math.random() * (moves.length - 1))]
      this.move(move)
    },
    move (move) {
      const result = this.game.move(move, {sloppy: true})
      console.log(result)
      this.pgn = this.game.pgn()
    },
    reset () {
      const chess = this.newGame()
      this.pgn = chess.pgn()
    }
  }
}
