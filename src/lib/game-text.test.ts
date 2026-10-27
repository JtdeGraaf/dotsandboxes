import { describe, expect, it } from 'vitest'
import { lastStitchText, patchText, resultText, turnText } from './game-text'
import { viewGame } from './game-view'
import type { SharedGame } from './shared-game'

const anna = { id: 'anna', name: 'Anna', joinedAt: 1 }
const jess = { id: 'jess', name: 'Jess', joinedAt: 2 }
const boxClosingMoves = ['h-0-0', 'h-1-0', 'v-0-0', 'v-0-1'].map((line, number) => ({
  number,
  line,
  playerId: number % 2 === 0 ? 'anna' : 'jess',
}))

function playing(moves: SharedGame['moves']): SharedGame {
  return { size: 3, round: 1, seats: ['anna', 'jess'], players: [anna, jess], moves }
}

describe('game text', () => {
  it('speaks to this phone on its turn and names the other player otherwise', () => {
    expect(turnText(viewGame(playing([]), 'anna'))).toBe('Your turn')
    expect(turnText(viewGame(playing([]), 'jess'))).toBe("Anna's turn")
    expect(turnText(viewGame(playing(boxClosingMoves.slice(0, 1)), 'anna'))).toBe("Jess' turn")
  })

  it('says who closed a patch, on which stitch, and who sewed last', () => {
    const view = viewGame(playing(boxClosingMoves), 'anna')

    expect(patchText(view, '0-0')).toBe('Jess closed this patch on stitch 4.')
    expect(lastStitchText(view)).toBe('Last seam by Jess.')
    expect(lastStitchText(viewGame(playing([]), 'anna'))).toBe('No stitches yet.')
  })

  it('names the winner, or everyone tied on a draw', () => {
    const view = viewGame(playing([]), 'anna')
    const [me, jessSeat] = view.seated

    expect(resultText({ ...view, winners: [{ ...jessSeat, score: 5 }] })).toBe('Jess wins, with 5 patches')
    expect(resultText({ ...view, winners: [{ ...me, score: 1 }] })).toBe('You win, with 1 patch')
    expect(resultText({ ...view, winners: [{ ...me, score: 4 }, { ...jessSeat, score: 4 }] })).toBe(
      'A draw between you and Jess, 4 patches each',
    )
  })
})
