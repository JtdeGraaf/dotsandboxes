import type { ReactNode } from 'react'
import type { Fabric } from '@/lib/game-view'
import { Swatch } from './Swatch'

type NameLabelProps = { fabric: Fabric; name: string; children?: ReactNode; isCurrent?: boolean }

/** A woven clothing label with a player's print and name, like the ones sewn into the corner of a quilt. */
export function NameLabel({ fabric, name, children, isCurrent = false }: NameLabelProps) {
  return (
    <span className={`name-label${isCurrent ? ' is-current' : ''}`}>
      <Swatch fabric={fabric} />
      <span className="name-label-name">{name}</span>
      {children}
    </span>
  )
}
