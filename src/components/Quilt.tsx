import { useState, type KeyboardEvent } from 'react'
import { allBoxes, allLines, lineId, readLine, type BoardSize, type Line } from '@/lib/board'
import type { Fabric } from '@/lib/game-view'

/** Board units between two neighbouring pins. */
const STEP = 100
const MARGIN = 26

type QuiltProps = {
  size: BoardSize
  drawnLines: Record<string, string>
  boxOwners: Record<string, string>
  fabricOf: Record<string, Fabric>
  lastLine?: string | null
  /** The binding round the edge is sewn in this thread: whose turn it is, or who won. Plain cloth when null. */
  bindingFabric?: Fabric | null
  /** Sews the binding on all the way round, once, when the quilt is whole. */
  isFinished?: boolean
  /** Says who sewed a patch when it's tapped. Leave out to make patches silent. */
  describePatch?: (box: string) => string
  /** Lets this phone sew. Leave out while it isn't this phone's turn. */
  onSew?: (line: string) => void
  label: string
}

/** The board as a quilt: pins at the dots, running stitches on drawn lines, a patch in every claimed box. */
export function Quilt(props: QuiltProps) {
  const { size, drawnLines, boxOwners, fabricOf, lastLine, bindingFabric = null, isFinished = false } = props
  const { describePatch, onSew, label } = props
  const [tappedBox, setTappedBox] = useState<string | null>(null)
  const extent = size * STEP
  const frame = { x: -MARGIN, y: -MARGIN, width: extent + 2 * MARGIN, height: extent + 2 * MARGIN }
  const lastStitch = lastLine ? readLine(lastLine, size) : null
  const lastOwner = lastLine ? drawnLines[lastLine] : undefined

  return (
    <figure className="quilt">
      <svg className="quilt-board" viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`} role="group" aria-label={label}>
        <rect className="quilt-backing" {...frame} rx="10" fill="url(#backing-cloth)" />
        <rect
          className={`quilt-binding${bindingFabric === null ? '' : ` binding-${bindingFabric}`}${isFinished ? ' is-sewn-on' : ''}`}
          x={frame.x + 4}
          y={frame.y + 4}
          width={frame.width - 8}
          height={frame.height - 8}
          rx="7"
          pathLength="100"
        />
        {allBoxes(size).map((box) => {
          const owner = boxOwners[box]
          if (owner === undefined) return null
          return (
            <Patch
              key={box}
              box={box}
              fabric={fabricOf[owner] ?? 0}
              description={describePatch?.(box)}
              onTap={() => setTappedBox(box)}
            />
          )
        })}
        {allLines(size).map((line) => {
          const id = lineId(line)
          const owner = drawnLines[id]
          if (owner !== undefined) return <Stitch key={id} id={id} line={line} fabric={fabricOf[owner] ?? 0} frame={frame} />
          return <Basting key={id} line={line} onSew={onSew ? () => onSew(id) : undefined} />
        })}
        {pinPositions(size).map(([x, y]) => (
          <g key={`${x}-${y}`} className="pin" transform={`translate(${x} ${y})`}>
            <circle className="pin-shadow" cx="1.5" cy="2.5" r="7" />
            <circle className="pin-head" r="6.5" />
            <circle className="pin-shine" cx="-2" cy="-2.2" r="2" />
          </g>
        ))}
        {lastStitch && lastOwner !== undefined && (
          <LastStitchTag key={lastLine} line={lastStitch} fabric={fabricOf[lastOwner] ?? 0} />
        )}
      </svg>
      {tappedBox && describePatch && boxOwners[tappedBox] && (
        <figcaption className="quilt-caption" aria-live="polite">
          {describePatch(tappedBox)}
        </figcaption>
      )}
    </figure>
  )
}

type PatchProps = { box: string; fabric: Fabric; description?: string; onTap: () => void }

function Patch({ box, fabric, description, onTap }: PatchProps) {
  const [row, column] = box.split('-').map(Number)
  const x = column * STEP + 7
  const y = row * STEP + 7
  const asButton = description === undefined ? {} : { role: 'button', tabIndex: 0, 'aria-label': description, onClick: onTap }
  return (
    <g className={`patch fabric-${fabric}`} {...asButton}>
      <rect className="patch-cloth" x={x} y={y} width={STEP - 14} height={STEP - 14} rx="3" fill={`url(#fabric-${fabric})`} />
      <rect className="patch-hem" x={x + 6} y={y + 6} width={STEP - 26} height={STEP - 26} rx="1.5" />
    </g>
  )
}

type Frame = { x: number; y: number; width: number; height: number }

/**
 * A drawn line as a running stitch. The stitch pattern is the stroke's dashes, so the pull from pin to pin is a
 * solid line growing inside a mask.
 */
function Stitch({ id, line, fabric, frame }: { id: string; line: Line; fabric: Fabric; frame: Frame }) {
  const [x1, y1, x2, y2] = endsOf(line)
  const maskId = `sewn-${id}`
  return (
    <g>
      <mask id={maskId} maskUnits="userSpaceOnUse" {...frame}>
        <line className="stitch-pull" x1={x1} y1={y1} x2={x2} y2={y2} pathLength="100" />
      </mask>
      <line className={`stitch thread-${fabric}`} x1={x1} y1={y1} x2={x2} y2={y2} mask={`url(#${maskId})`} />
    </g>
  )
}

/** A small round tag in the sewer's print, pinned to the middle of the last seam. */
function LastStitchTag({ line, fabric }: { line: Line; fabric: Fabric }) {
  const [x1, y1, x2, y2] = endsOf(line)
  return (
    <g className="last-tag" transform={`translate(${(x1 + x2) / 2} ${(y1 + y2) / 2})`} aria-hidden="true">
      <circle className="last-tag-ring" r="13" />
      <circle r="10" fill={`url(#fabric-${fabric})`} />
    </g>
  )
}

/** An undrawn line: a faint tacking stitch, and the button to sew it when it's this phone's turn. */
function Basting({ line, onSew }: { line: Line; onSew?: () => void }) {
  const [x1, y1, x2, y2] = endsOf(line)
  const basting = <line className="basting" x1={x1} y1={y1} x2={x2} y2={y2} />
  if (!onSew) return basting

  function sewOnKey(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    onSew?.()
  }

  return (
    <g className="seam-button" role="button" tabIndex={0} aria-label={describeLine(line)} onClick={onSew} onKeyDown={sewOnKey}>
      <line className="seam-target" x1={x1} y1={y1} x2={x2} y2={y2} />
      <line className="seam-preview" x1={x1} y1={y1} x2={x2} y2={y2} />
      {basting}
    </g>
  )
}

/** The line's ends, pulled back from the pins so the thread starts at the pin's edge. */
function endsOf({ direction, row, column }: Line): [number, number, number, number] {
  const x = column * STEP
  const y = row * STEP
  const inset = 10
  if (direction === 'h') return [x + inset, y, x + STEP - inset, y]
  return [x, y + inset, x, y + STEP - inset]
}

function pinPositions(size: BoardSize): [number, number][] {
  return Array.from({ length: (size + 1) ** 2 }, (_, index) => [
    (index % (size + 1)) * STEP,
    Math.floor(index / (size + 1)) * STEP,
  ])
}

function describeLine({ direction, row, column }: Line): string {
  if (direction === 'h') return `Sew across, row ${row + 1}, from pin ${column + 1} to pin ${column + 2}`
  return `Sew down, column ${column + 1}, from pin ${row + 1} to pin ${row + 2}`
}
