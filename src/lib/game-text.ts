import type { GameView, SeatedPlayer } from './game-view'

/** Whose turn it is, said from this phone's side of the table. */
export function turnText(view: GameView): string {
  if (!view.turn) return ''
  if (view.turn.isMe) return 'Your turn'
  return `${possessive(view.turn.name)} turn`
}

export function resultText(view: GameView): string {
  const [first, ...others] = view.winners
  if (!first) return ''
  if (others.length > 0) return `A draw between ${nameList(view.winners)}, ${patches(first.score)} each`
  if (first.isMe) return `You win, with ${patches(first.score)}`
  return `${first.name} wins, with ${patches(first.score)}`
}

/** Who sewed a patch and on which stitch, for tapping a patch on the board. */
export function patchText(view: GameView, box: string): string {
  const owner = view.roundState?.boxOwners[box]
  const stitch = view.roundState?.boxStitch[box]
  const player = view.seated.find((seated) => seated.id === owner)
  if (!player || stitch === undefined) return ''
  return `${player.isMe ? 'You' : player.name} closed this patch on stitch ${stitch}.`
}

/** Says who sewed the last seam, so a look up from the table shows what changed. */
export function lastStitchText(view: GameView): string {
  const line = view.roundState?.lastLine
  const sewer = line ? view.seated.find((seated) => seated.id === view.roundState?.drawnLines[line]) : undefined
  if (!sewer) return 'No stitches yet.'
  return `Last seam by ${sewer.isMe ? 'you' : sewer.name}.`
}

function patches(count: number): string {
  return count === 1 ? '1 patch' : `${count} patches`
}

function possessive(name: string): string {
  return name.endsWith('s') ? `${name}'` : `${name}'s`
}

function nameList(players: SeatedPlayer[]): string {
  const names = players.map((player) => (player.isMe ? 'you' : player.name))
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}
