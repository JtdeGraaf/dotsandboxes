import { useMemo } from 'react'
import { joinLink } from '@/lib/game-code'
import { qrCodeFor } from '@/lib/qr-code'

/** The four words and a QR code, sewn on a big label, for friends to read aloud or scan. */
export function CodeCard({ code }: { code: string }) {
  const qr = useMemo(() => qrCodeFor(joinLink(location.origin, code)), [code])
  return (
    <section className="code-card" aria-label="The four words for this game">
      <p className="code-words">
        {code.split('-').map((word) => (
          <span key={word} className="code-word">
            {word}
          </span>
        ))}
      </p>
      <p className="code-instruction">Read these aloud, or let a friend scan the code.</p>
      <svg className="code-qr" viewBox={`-2 -2 ${qr.size + 4} ${qr.size + 4}`} role="img" aria-label="QR code that opens this game">
        <rect className="code-qr-paper" x="-2" y="-2" width={qr.size + 4} height={qr.size + 4} />
        <path className="code-qr-ink" d={qr.path} />
      </svg>
      <p className="unsafe-note">
        Anyone with these words can see and change this game. That's fine for a game, so don't type anything private in
        your name.
      </p>
    </section>
  )
}
