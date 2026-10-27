import { useEffect, useRef, type ReactNode } from 'react'

type ConfirmDialogProps = {
  isOpen: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/** Asks before something that's hard to take back. The confirm button names the action, never "OK". */
export function ConfirmDialog({ isOpen, title, children, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (isOpen && !element.open) element.showModal()
    if (!isOpen && element.open) element.close()
  }, [isOpen])

  return (
    <dialog ref={dialog} className="confirm" onCancel={onCancel} aria-labelledby="confirm-title">
      <h2 id="confirm-title" className="confirm-title">
        {title}
      </h2>
      <div className="confirm-text">{children}</div>
      <div className="confirm-actions">
        <button type="button" className="button-quiet" onClick={onCancel}>
          Stay
        </button>
        <button type="button" className="button-tag" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}
