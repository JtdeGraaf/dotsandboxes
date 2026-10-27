import { allLines, lineId, sidesOf } from './board'
import type { Fabric } from './game-view'

/**
 * A half-sewn 4 by 4 quilt for the home screen, so a first-time visitor sees what a game becomes. Made up, not a
 * real game.
 */
export function sampleQuilt() {
  const boxOwners: Record<string, string> = {
    '0-0': 'red',
    '0-1': 'red',
    '1-0': 'mustard',
    '3-0': 'mustard',
    '2-2': 'teal',
    '2-3': 'teal',
    '1-3': 'pink',
    '3-3': 'pink',
  }
  const drawnLines: Record<string, string> = {}
  for (const [box, owner] of Object.entries(boxOwners)) {
    for (const side of sidesOf(box)) drawnLines[side] ??= owner
  }
  const loose = allLines(4).map(lineId).filter((line) => !drawnLines[line])
  for (const [index, line] of loose.entries()) if (index % 4 === 1) drawnLines[line] = ['teal', 'red', 'pink'][index % 3]
  const fabricOf: Record<string, Fabric> = { red: 0, mustard: 1, teal: 2, pink: 3 }
  return { size: 4 as const, boxOwners, drawnLines, fabricOf }
}
