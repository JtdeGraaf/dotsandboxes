import type { Fabric } from '@/lib/game-view'

/** A little square of a player's print, the way their seat is shown next to their name. */
export function Swatch({ fabric }: { fabric: Fabric }) {
  return (
    <svg className="swatch" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect width="40" height="40" fill={`url(#fabric-${fabric})`} />
      <rect className="swatch-stitch" x="4" y="4" width="32" height="32" />
    </svg>
  )
}
