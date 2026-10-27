import { useState } from 'react'
import { Quilt } from '@/components/Quilt'
import { BOARD_SIZES, type BoardSize } from '@/lib/board'
import { describeJoinProblem } from '@/lib/join-problems'
import { MAX_NAME_LENGTH } from '@/lib/players'
import { sampleQuilt } from '@/lib/sample-quilt'
import { useStartOrJoin } from '@/features/game/useStartOrJoin'

const SAMPLE = sampleQuilt()

type HomeScreenProps = {
  savedName: string | null
  /** Words from a scanned QR code, ready to join with. */
  linkedCode: string | null
  onEnter: (code: string, name: string) => void
}

/** Put your name on a label, then start a new quilt or join one with four words. */
export function HomeScreen({ savedName, linkedCode, onEnter }: HomeScreenProps) {
  const { busy, problem, start, join } = useStartOrJoin(onEnter)
  const [name, setName] = useState(savedName ?? '')
  const [size, setSize] = useState<BoardSize>(4)
  const [typedCode, setTypedCode] = useState(linkedCode?.replaceAll('-', ' ') ?? '')

  return (
    <main className={`home${linkedCode ? ' is-joining' : ''}`}>
      <header className="home-hero">
        <Quilt
          size={SAMPLE.size}
          drawnLines={SAMPLE.drawnLines}
          boxOwners={SAMPLE.boxOwners}
          fabricOf={SAMPLE.fabricOf}
          label="A half-sewn quilt: each patch is a box someone won"
        />
        <h1 className="sewn-title">Dots and Boxes</h1>
      </header>
      <p className="home-pitch">
        Sew a quilt together, one stitch a turn. Close a square and it's your patch, and you go again. Two to four
        players, each on their own phone.
      </p>
      {linkedCode && <p className="home-pitch-short">A friend asked you to join their quilt.</p>}

      <label className="field">
        <span className="field-label">Your name</span>
        <input
          className="field-input"
          value={name}
          maxLength={MAX_NAME_LENGTH}
          autoComplete="given-name"
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      {problem && (
        <p className="problem" role="alert">
          {describeJoinProblem(problem)}
        </p>
      )}

      <form
        className="home-panel"
        onSubmit={(event) => {
          event.preventDefault()
          void join(name, typedCode)
        }}
      >
        <h2 className="panel-title">Join a game</h2>
        <label className="field">
          <span className="field-label">The four words</span>
          <input
            className="field-input field-input-words"
            value={typedCode}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="otter lamp fig violin"
            onChange={(event) => setTypedCode(event.target.value)}
          />
        </label>
        <button type="submit" className={linkedCode ? 'button-tag' : 'button-quiet'} disabled={busy !== null}>
          {busy === 'joining' ? 'Finding the table…' : 'Join'}
        </button>
      </form>

      <form
        className="home-panel"
        onSubmit={(event) => {
          event.preventDefault()
          void start(name, size)
        }}
      >
        <h2 className="panel-title">Start a new quilt</h2>
        <fieldset className="size-picker">
          <legend className="field-label">Squares per side</legend>
          {BOARD_SIZES.map((option) => (
            <label key={option} className="size-option">
              <input
                type="radio"
                name="size"
                value={option}
                checked={size === option}
                onChange={() => setSize(option)}
              />
              <span className="size-option-face" aria-hidden="true">
                <span className="size-option-grid" data-size={option} />
              </span>
              <span className="size-option-text">
                {option} by {option}
              </span>
            </label>
          ))}
        </fieldset>
        <button type="submit" className={linkedCode ? 'button-quiet' : 'button-tag'} disabled={busy !== null}>
          {busy === 'starting' ? 'Laying out the pins…' : 'Start a game'}
        </button>
      </form>
    </main>
  )
}
