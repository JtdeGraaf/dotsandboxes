import { useState } from 'react'
import type { BoardSize } from '@/lib/board'
import { newGameCode, readGameCode } from '@/lib/game-code'
import { problemWithTypedCode, type JoinProblem } from '@/lib/join-problems'
import { cleanName } from '@/lib/players'
import { isSharedGameStarted, OfflineError, startSharedGame } from './shared-space'

type Busy = 'starting' | 'joining' | null

/** Starting a new game or joining one by its words. Either ends with the code to enter. */
export function useStartOrJoin(onEnter: (code: string, name: string) => void) {
  const [busy, setBusy] = useState<Busy>(null)
  const [problem, setProblem] = useState<JoinProblem | null>(null)

  async function start(typedName: string, size: BoardSize) {
    const name = cleanName(typedName)
    if (name === null) return setProblem({ code: 'no-name' })
    setBusy('starting')
    setProblem(null)
    const code = newGameCode()
    await startSharedGame(code, size)
    setBusy(null)
    onEnter(code, name)
  }

  async function join(typedName: string, typedCode: string) {
    const name = cleanName(typedName)
    if (name === null) return setProblem({ code: 'no-name' })
    const typed = readGameCode(typedCode)
    const codeProblem = problemWithTypedCode(typed)
    if (codeProblem !== null || typed.status !== 'ok') return setProblem(codeProblem)
    setBusy('joining')
    setProblem(null)
    try {
      if (!(await isSharedGameStarted(typed.code))) return setProblem({ code: 'not-started' })
      onEnter(typed.code, name)
    } catch (error) {
      if (!(error instanceof OfflineError)) throw error
      setProblem({ code: 'offline' })
    } finally {
      setBusy(null)
    }
  }

  return { busy, problem, start, join }
}
