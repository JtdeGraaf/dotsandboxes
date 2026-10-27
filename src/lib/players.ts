export type Player = { id: string; name: string; joinedAt: number }

export const MAX_PLAYERS = 4
export const MAX_NAME_LENGTH = 16

/** Who plays this round, in turn order: the first four to join, and each round the next one starts. */
export function seatsForRound(players: readonly Player[], round: number): string[] {
  const seated = [...players]
    .sort((first, second) => first.joinedAt - second.joinedAt || first.id.localeCompare(second.id))
    .slice(0, MAX_PLAYERS)
    .map((player) => player.id)
  if (seated.length === 0) return []
  const shift = (round - 1) % seated.length
  return [...seated.slice(shift), ...seated.slice(0, shift)]
}

/** A name as typed, trimmed and cut to fit on the board, or null when nothing is left. */
export function cleanName(typed: string): string | null {
  const name = typed.trim().replace(/\s+/g, ' ').slice(0, MAX_NAME_LENGTH)
  return name === '' ? null : name
}
