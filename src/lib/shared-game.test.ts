import { describe, expect, it } from 'vitest'
import { cleanName, seatsForRound } from './players'
import { readSharedGame } from './shared-game'

const started = { startedAt: 1000, size: 4, round: 2, seats: '["ben","anna"]' }

describe('readSharedGame', () => {
  it('finds no game in a space nobody started', () => {
    expect(readSharedGame({}, {}, {})).toBeNull()
  })

  it('reads players and only the moves of the current round', () => {
    const game = readSharedGame(
      started,
      { anna: { name: 'Anna', joinedAt: 1 }, ben: { name: 'Ben', joinedAt: 2 } },
      {
        '1-0': { round: 1, number: 0, line: 'h-0-0', playerId: 'anna' },
        '2-0': { round: 2, number: 0, line: 'v-1-1', playerId: 'ben' },
      },
    )

    expect(game).toEqual({
      size: 4,
      round: 2,
      seats: ['ben', 'anna'],
      players: [
        { id: 'anna', name: 'Anna', joinedAt: 1 },
        { id: 'ben', name: 'Ben', joinedAt: 2 },
      ],
      moves: [{ number: 0, line: 'v-1-1', playerId: 'ben' }],
    })
  })

  it('leaves out players and moves that are missing a field', () => {
    const game = readSharedGame(
      started,
      { anna: { name: 'Anna' }, ben: { name: '', joinedAt: 2 } },
      { '2-0': { round: 2, number: 0, line: 'v-1-1' }, '2-1': { round: 2, number: 1.5, line: 'h-0-0', playerId: 'x' } },
    )

    expect(game?.players).toEqual([])
    expect(game?.moves).toEqual([])
  })

  it('treats a board size it does not know as no game, and broken seats as none', () => {
    expect(readSharedGame({ ...started, size: 9 }, {}, {})).toBeNull()
    expect(readSharedGame({ ...started, seats: 'not json' }, {}, {})?.seats).toEqual([])
  })
})

describe('seatsForRound', () => {
  const players = [
    { id: 'cas', name: 'Cas', joinedAt: 3 },
    { id: 'anna', name: 'Anna', joinedAt: 1 },
    { id: 'ben', name: 'Ben', joinedAt: 2 },
  ]

  it('seats players in the order they joined, and lets the next one start each round', () => {
    expect(seatsForRound(players, 1)).toEqual(['anna', 'ben', 'cas'])
    expect(seatsForRound(players, 2)).toEqual(['ben', 'cas', 'anna'])
    expect(seatsForRound(players, 4)).toEqual(['anna', 'ben', 'cas'])
  })

  it('seats only the first four', () => {
    const six = Array.from({ length: 6 }, (_, index) => ({ id: `p${index}`, name: 'P', joinedAt: index }))

    expect(seatsForRound(six, 1)).toEqual(['p0', 'p1', 'p2', 'p3'])
  })
})

describe('cleanName', () => {
  it('trims, squeezes spaces and cuts long names', () => {
    expect(cleanName('  Anna   Maria  ')).toBe('Anna Maria')
    expect(cleanName('Bartholomew the Great')).toBe('Bartholomew the ')
    expect(cleanName('   ')).toBeNull()
  })
})
