// inputs -> fen string
// outputs -> onmove, ongameover, oncapture, onstatechange

import Chessboard from '../../components/chessboard/chessboard.vue'
import Chat from '../../components/chat/chat.vue'

import Chess from 'chess.js'

export default {
  name: 'chess',
  components: {
    Chessboard,
    Chat
  },
  data () {
    return {
      pgn: undefined,
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
    const chess = this.newGame()
    console.log(this.$route.query.page)
    this.pgn = chess.pgn()
  },
  methods: {
    boardChange (pgn) {
      this.pgn = pgn

      if (this.twoplayer) {
        setTimeout(this.swapSides, 1000)
      }
    },
    newGame () {
      const chess = Chess()
      return chess
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
      this.game.move(move)
      this.pgn = this.game.pgn()
    },
    reset () {
      const chess = this.newGame()
      this.pgn = chess.pgn()
    }
  }
}
