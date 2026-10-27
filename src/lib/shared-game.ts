import { isBoardSize, type BoardSize } from './board'
import type { Move } from './game'
import type { Player } from './players'

/**
 * What a game looks like in the shared space. Anything in there may have been written by anyone with the code, or by
 * an older version of the app, so every value is checked and anything that doesn't fit is left out.
 *
 * Values: `startedAt` (ms), `size` (boxes per side), `round` (0 while waiting for players), `seats` (JSON list of
 * player ids, in turn order). Tables: `players` keyed by player id, `moves` keyed by `<round>-<number>`.
 */
export type SharedGame = {
  size: BoardSize
  round: number
  seats: string[]
  players: Player[]
  /** Only this round's moves. */
  moves: Move[]
}

type Cell = unknown
type Rows = Record<string, Record<string, Cell>>

/** The game, or null when nobody has started one in this space. */
export function readSharedGame(values: Record<string, Cell>, players: Rows, moves: Rows): SharedGame | null {
  if (typeof values.startedAt !== 'number') return null
  const size = isBoardSize(values.size) ? values.size : null
  if (size === null) return null
  const round = isWholeNumber(values.round) ? values.round : 0
  return {
    size,
    round,
    seats: round === 0 ? [] : readSeats(values.seats),
    players: Object.entries(players).flatMap(([id, row]) => readPlayer(id, row)),
    moves: Object.values(moves).flatMap((row) => readMove(row, round)),
  }
}

export function moveRowId(round: number, number: number): string {
  return `${round}-${number}`
}

function readPlayer(id: string, row: Record<string, Cell>): Player[] {
  if (typeof row.name !== 'string' || row.name === '' || typeof row.joinedAt !== 'number') return []
  return [{ id, name: row.name, joinedAt: row.joinedAt }]
}

function readMove(row: Record<string, Cell>, round: number): Move[] {
  if (row.round !== round || !isWholeNumber(row.number)) return []
  if (typeof row.line !== 'string' || typeof row.playerId !== 'string') return []
  return [{ number: row.number, line: row.line, playerId: row.playerId }]
}

function readSeats(text: Cell): string[] {
  if (typeof text !== 'string') return []
  try {
    const seats: unknown = JSON.parse(text)
    return Array.isArray(seats) ? seats.filter((seat) => typeof seat === 'string') : []
  } catch {
    return []
  }
}

function isWholeNumber(value: Cell): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0
}
