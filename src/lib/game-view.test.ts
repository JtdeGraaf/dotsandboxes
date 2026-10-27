import { describe, expect, it } from 'vitest'
import { allLines, lineId } from './board'
import { viewGame } from './game-view'
import type { SharedGame } from './shared-game'

const anna = { id: 'anna', name: 'Anna', joinedAt: 1 }
const ben = { id: 'ben', name: 'Ben', joinedAt: 2 }
const cas = { id: 'cas', name: 'Cas', joinedAt: 3 }

function game(overrides: Partial<SharedGame>): SharedGame {
  return { size: 3, round: 0, seats: [], players: [anna, ben], moves: [], ...overrides }
}

describe('viewGame', () => {
  it('waits for players, seats them in join order and can start from two', () => {
    const view = viewGame(game({}), 'ben')

    expect(view.phase).toBe('waiting')
    expect(view.seated.map((player) => [player.name, player.fabric, player.isMe])).toEqual([
      ['Anna', 0, false],
      ['Ben', 1, true],
    ])
    expect(view.canStart).toBe(true)
    expect(viewGame(game({ players: [anna] }), 'anna').canStart).toBe(false)
  })

  it('keeps fabrics from join order while the starting seat moves', () => {
    const view = viewGame(game({ round: 2, seats: ['ben', 'anna'] }), 'anna')

    expect(view.seated.map((player) => [player.name, player.fabric])).toEqual([
      ['Ben', 1],
      ['Anna', 0],
    ])
    expect(view.turn?.name).toBe('Ben')
    expect(view.isMyTurn).toBe(false)
  })

  it('lets someone who joined mid-round watch until the next round', () => {
    const view = viewGame(game({ round: 1, seats: ['anna', 'ben'], players: [anna, ben, cas] }), 'cas')

    expect(view.watchers).toEqual([cas])
    expect(view.isMeSeated).toBe(false)
    expect(view.isMeListed).toBe(true)
  })

  it('is finished with winners once every box is taken', () => {
    const lines = allLines(3).map(lineId)
    let shared = game({ round: 1, seats: ['anna', 'ben'] })
    for (const line of lines) {
      const turn = viewGame(shared, 'anna').turn
      shared = { ...shared, moves: [...shared.moves, { number: shared.moves.length, line, playerId: turn?.id ?? 'anna' }] }
    }

    const view = viewGame(shared, 'anna')

    expect(view.phase).toBe('finished')
    expect(view.turn).toBeNull()
    expect(view.winners.length).toBeGreaterThan(0)
  })
})
