import { useState } from 'react'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { NameLabel } from '@/components/NameLabel'
import { Quilt } from '@/components/Quilt'
import { Swatch } from '@/components/Swatch'
import { lastStitchText, patchText, resultText, turnText } from '@/lib/game-text'
import type { GameView } from '@/lib/game-view'
import { CodeCard } from './CodeCard'
import { useGame } from './useGame'

type GameScreenProps = { code: string; me: { id: string; name: string }; onLeave: () => void }

export function GameScreen({ code, me, onLeave }: GameScreenProps) {
  const { isOpening, isOnline, view, drawLine, startRound } = useGame(code, me)
  const [isLeaving, setIsLeaving] = useState(false)

  return (
    <main className="game">
      <header className="game-bar">
        <span className="game-bar-title">Dots and Boxes</span>
        <span className={`connection${isOnline ? ' is-online' : ''}`}>{isOnline ? 'Connected' : 'Reconnecting…'}</span>
        <button type="button" className="button-small" onClick={() => setIsLeaving(true)}>
          Leave
        </button>
      </header>

      <GameBody
        isOpening={isOpening}
        view={view}
        code={code}
        onSew={drawLine}
        onStartRound={startRound}
      />

      <ConfirmDialog
        isOpen={isLeaving}
        title="Leave this table?"
        confirmLabel="Leave"
        onConfirm={onLeave}
        onCancel={() => setIsLeaving(false)}
      >
        <p>
          The game goes on without this phone, and the others wait at your turn. You can come back with the words{' '}
          <strong>{code.replaceAll('-', ' ')}</strong>.
        </p>
      </ConfirmDialog>
    </main>
  )
}

type GameBodyProps = {
  isOpening: boolean
  view: GameView | null
  code: string
  onSew: (line: string) => void
  onStartRound: () => void
}

function GameBody({ isOpening, view, code, onSew, onStartRound }: GameBodyProps) {
  if (isOpening) return <p className="game-status">Unrolling the quilt…</p>
  if (!view) return <p className="game-status">Waiting for the game to arrive from the other phones…</p>
  if (view.phase === 'waiting') return <WaitingTable view={view} code={code} onStart={onStartRound} />
  return <QuiltTable view={view} code={code} onSew={onSew} onPlayAgain={onStartRound} />
}

function WaitingTable({ view, code, onStart }: { view: GameView; code: string; onStart: () => void }) {
  return (
    <div className="waiting">
      <CodeCard code={code} />
      <section className="seats" aria-labelledby="seats-title">
        <h2 id="seats-title" className="panel-title">
          At the table
        </h2>
        <ul className="seat-list">
          {view.seated.map((player) => (
            <li key={player.id}>
              <NameLabel fabric={player.fabric} name={player.isMe ? `${player.name} (you)` : player.name} />
            </li>
          ))}
        </ul>
        {view.watchers.length > 0 && <p className="hint">The table seats four. {view.watchers.length} more watching.</p>}
        <button type="button" className="button-tag" disabled={!view.canStart} onClick={onStart}>
          Start sewing
        </button>
        {!view.canStart && <p className="hint">Waiting for a second player to join with the words.</p>}
      </section>
    </div>
  )
}

type QuiltTableProps = { view: GameView; code: string; onSew: (line: string) => void; onPlayAgain: () => void }

function QuiltTable({ view, code, onSew, onPlayAgain }: QuiltTableProps) {
  const state = view.roundState
  if (!state) return null
  const isFinished = view.phase === 'finished'
  // The thread that leads: whoever's turn it is, or the winner once the quilt is whole.
  const leaders = isFinished ? view.winners : view.turn ? [view.turn] : []
  const winnerIds = new Set(view.winners.map((player) => player.id))

  return (
    <div className={`table${view.isMyTurn ? ' is-my-turn' : ''}${isFinished ? ' is-finished' : ''}`}>
      <p className={`turn${leaders[0] ? ` fabric-${leaders[0].fabric}` : ''}`} aria-live="polite">
        {leaders.map((player) => (
          <Swatch key={player.id} fabric={player.fabric} />
        ))}
        <span>{isFinished ? resultText(view) : turnText(view)}</span>
      </p>
      <Quilt
        size={view.size}
        drawnLines={state.drawnLines}
        boxOwners={state.boxOwners}
        fabricOf={view.fabricOf}
        lastLine={isFinished ? null : state.lastLine}
        bindingFabric={leaders[0]?.fabric ?? null}
        isFinished={isFinished}
        describePatch={(box) => patchText(view, box)}
        onSew={view.isMyTurn ? onSew : undefined}
        label={`The quilt, ${view.size} by ${view.size}`}
      />
      <p className="last-stitch">{lastStitchText(view)}</p>
      <ol className="score-strip" aria-label="Patches so far">
        {view.seated.map((player) => (
          <li
            key={player.id}
            className={`score-tab tab-thread-${player.fabric}${player.id === view.turn?.id ? ' is-current' : ''}${winnerIds.has(player.id) ? ' is-winner' : ''}`}
          >
            <Swatch fabric={player.fabric} />
            <span className="score-name">{player.isMe ? 'You' : player.name}</span>
            <span className="score">{player.score}</span>
          </li>
        ))}
      </ol>
      {!view.isMeSeated && <p className="hint">The table is full this round. You play from the next quilt.</p>}
      {isFinished && (
        <button type="button" className="button-tag" onClick={onPlayAgain}>
          Sew another quilt
        </button>
      )}
      <details className="invite">
        <summary>Invite someone</summary>
        <CodeCard code={code} />
      </details>
    </div>
  )
}
