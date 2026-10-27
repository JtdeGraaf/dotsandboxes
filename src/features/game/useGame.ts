import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useTable, useValues } from 'tinybase/ui-react'
import { viewGame, type GameView } from '@/lib/game-view'
import { seatsForRound } from '@/lib/players'
import { moveRowId, readSharedGame } from '@/lib/shared-game'
import { sharedSpaceFor, type SharedSpace } from './shared-space'

const NO_SPACE_ONLINE = { subscribe: () => () => {}, read: () => false }

/** The game behind a code as this phone sees it, and the moves this phone can make in it. */
export function useGame(code: string, me: { id: string; name: string }) {
  const space = useSharedSpace(code)
  const store = space?.store
  const values = useValues(store)
  const players = useTable('players', store)
  const moves = useTable('moves', store)
  const isOnline = useSyncExternalStore(
    space?.onOnlineChange ?? NO_SPACE_ONLINE.subscribe,
    space?.isOnline ?? NO_SPACE_ONLINE.read,
  )

  const view: GameView | null = useMemo(() => {
    const game = readSharedGame(values, players, moves)
    return game === null ? null : viewGame(game, me.id)
  }, [values, players, moves, me.id])

  // Taking a seat is automatic: being in the game on this phone means being at the table.
  const isListed = view?.isMeListed ?? true
  useEffect(() => {
    if (!store || isListed) return
    store.setRow('players', me.id, { name: me.name, joinedAt: Date.now() })
  }, [store, isListed, me.id, me.name])

  const drawLine = useCallback(
    (line: string) => {
      if (!store || !view?.isMyTurn || !view.roundState || view.roundState.drawnLines[line]) return
      const number = view.roundState.nextMoveNumber
      store.setRow('moves', moveRowId(view.round, number), { round: view.round, number, line, playerId: me.id })
    },
    [store, view, me.id],
  )

  const startRound = useCallback(() => {
    if (!store || !view) return
    const round = view.round + 1
    store.setPartialValues({ round, seats: JSON.stringify(seatsForRound(view.players, round)) })
  }, [store, view])

  return { isOpening: space === null, isOnline, view, drawLine, startRound }
}

function useSharedSpace(code: string): SharedSpace | null {
  const [opened, setOpened] = useState<{ code: string; space: SharedSpace } | null>(null)
  useEffect(() => {
    let isCurrent = true
    void sharedSpaceFor(code).then((space) => isCurrent && setOpened({ code, space }))
    return () => {
      isCurrent = false
    }
  }, [code])
  return opened?.code === code ? opened.space : null
}
