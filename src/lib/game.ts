import { allBoxes, boxesBeside, readLine, sidesOf, type BoardSize } from './board'

/** One line drawn by one player. Moves are numbered from 0 within a round. */
export type Move = { number: number; line: string; playerId: string }

export type Round = { size: BoardSize; seats: readonly string[]; moves: readonly Move[] }

export type RoundState = {
  /** Line id → the player who drew it. */
  drawnLines: Record<string, string>
  /** Box id → the player who closed it. */
  boxOwners: Record<string, string>
  /** Box id → which stitch closed it, counting from 1. */
  boxStitch: Record<string, number>
  scores: Record<string, number>
  /** The player whose turn it is, or null once every box is taken. */
  turn: string | null
  winners: string[]
  lastLine: string | null
  /** The number the next move gets. */
  nextMoveNumber: number
}

/**
 * Replays a round's moves in order. Anyone with the code can write to the game, so a move that isn't that player's
 * turn, or draws a line twice or off the board, is skipped instead of trusted.
 */
export function playRound({ size, seats, moves }: Round): RoundState {
  const drawnLines: Record<string, string> = {}
  const boxOwners: Record<string, string> = {}
  const boxStitch: Record<string, number> = {}
  const scores = Object.fromEntries(seats.map((playerId) => [playerId, 0]))
  const boxCount = size * size
  let seat = 0
  let lastLine: string | null = null
  let nextMoveNumber = 0

  for (const move of [...moves].sort((first, second) => first.number - second.number)) {
    nextMoveNumber = Math.max(nextMoveNumber, move.number + 1)
    if (seats.length === 0 || Object.keys(boxOwners).length === boxCount) break
    if (move.playerId !== seats[seat]) continue
    const line = readLine(move.line, size)
    if (!line || drawnLines[move.line]) continue

    drawnLines[move.line] = move.playerId
    lastLine = move.line
    const closedBoxes = boxesBeside(line, size).filter((box) => sidesOf(box).every((side) => drawnLines[side]))
    for (const box of closedBoxes) {
      boxOwners[box] = move.playerId
      boxStitch[box] = Object.keys(drawnLines).length
    }
    scores[move.playerId] += closedBoxes.length
    // Closing a box earns another turn.
    if (closedBoxes.length === 0) seat = (seat + 1) % seats.length
  }

  const isFinished = Object.keys(boxOwners).length === boxCount
  return {
    drawnLines,
    boxOwners,
    boxStitch,
    scores,
    turn: isFinished || seats.length === 0 ? null : seats[seat],
    winners: isFinished ? winnersOf(scores) : [],
    lastLine,
    nextMoveNumber,
  }
}

export function boxesLeft(state: RoundState, size: BoardSize): number {
  return allBoxes(size).length - Object.keys(state.boxOwners).length
}

/** Everyone with the top score; more than one on a draw. */
export function winnersOf(scores: Record<string, number>): string[] {
  const best = Math.max(...Object.values(scores))
  return Object.keys(scores).filter((playerId) => scores[playerId] === best)
}
