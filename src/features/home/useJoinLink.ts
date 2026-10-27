import { useCallback, useEffect, useState } from 'react'
import { codeInLink } from '@/lib/game-code'

/** The words from a scanned join link (`#join=…`), until they've been used. */
export function useJoinLink() {
  const [linkedCode, setLinkedCode] = useState(() => codeInLink(location.hash))

  useEffect(() => {
    const readLink = () => setLinkedCode(codeInLink(location.hash))
    window.addEventListener('hashchange', readLink)
    return () => window.removeEventListener('hashchange', readLink)
  }, [])

  const clearLink = useCallback(() => {
    history.replaceState(null, '', location.pathname)
    setLinkedCode(null)
  }, [])

  return { linkedCode, clearLink }
}
