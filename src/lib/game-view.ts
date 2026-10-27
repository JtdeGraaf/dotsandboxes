import type { BoardSize } from './board'
import { playRound, type RoundState } from './game'
import { MAX_PLAYERS, seatsForRound, type Player } from './players'
import type { SharedGame } from './shared-game'

/** One of the four fabrics; a player keeps theirs from joining, even as the starting seat moves each round. */
export type Fabric = 0 | 1 | 2 | 3

export type SeatedPlayer = { id: string; name: string; fabric: Fabric; score: number; isMe: boolean }

export type GameView = {
  phase: 'waiting' | 'playing' | 'finished'
  size: BoardSize
  round: number
  /** Everyone at the table, in the order they joined; the next round seats from this. */
  players: Player[]
  /** In turn order for this round; while waiting, the order the first round would use. */
  seated: SeatedPlayer[]
  /** Joined after the table filled up, or after this round began. They play from the next round. */
  watchers: Player[]
  roundState: RoundState | null
  turn: SeatedPlayer | null
  winners: SeatedPlayer[]
  isMyTurn: boolean
  isMeSeated: boolean
  isMeListed: boolean
  canStart: boolean
  /** Fabric per player id, for patches and stitches. */
  fabricOf: Record<string, Fabric>
}

export const MIN_PLAYERS = 2

/** Everything the screens show about a game, from what's in the shared space and who this phone is. */
export function viewGame(game: SharedGame, myId: string): GameView {
  const joinOrder = seatsForRound(game.players, 1)
  const fabricOf = Object.fromEntries(joinOrder.map((id, index) => [id, index as Fabric]))
  const playersById = new Map(game.players.map((player) => [player.id, player]))
  const seats = game.round === 0 ? joinOrder : game.seats.filter((id) => playersById.has(id)).slice(0, MAX_PLAYERS)
  const roundState = game.round === 0 ? null : playRound({ size: game.size, seats, moves: game.moves })

  const seated = seats.flatMap((id): SeatedPlayer[] => {
    const player = playersById.get(id)
    const fabric = fabricOf[id]
    if (!player || fabric === undefined) return []
    return [{ id, name: player.name, fabric, score: roundState?.scores[id] ?? 0, isMe: id === myId }]
  })
  const seatedIds = new Set(seats)
  const isFinished = roundState !== null && roundState.turn === null && seated.length > 0
  const turn = seated.find((player) => player.id === roundState?.turn) ?? null

  return {
    phase: game.round === 0 ? 'waiting' : isFinished ? 'finished' : 'playing',
    size: game.size,
    round: game.round,
    players: game.players,
    seated,
    watchers: game.players.filter((player) => !seatedIds.has(player.id)),
    roundState,
    turn,
    winners: seated.filter((player) => roundState?.winners.includes(player.id)),
    isMyTurn: turn?.isMe ?? false,
    isMeSeated: seatedIds.has(myId),
    isMeListed: playersById.has(myId),
    canStart: game.round === 0 && seated.length >= MIN_PLAYERS,
    fabricOf,
  }
}
