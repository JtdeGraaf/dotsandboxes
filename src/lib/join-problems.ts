import type { TypedCode } from './game-code'

export type JoinProblem =
  | { code: 'no-name' }
  | { code: 'wrong-word-count'; wordCount: number }
  | { code: 'unknown-words'; unknownWords: string[] }
  | { code: 'not-started' }
  | { code: 'offline' }

export function problemWithTypedCode(typed: TypedCode): JoinProblem | null {
  if (typed.status === 'ok') return null
  if (typed.status === 'wrong-word-count') return { code: 'wrong-word-count', wordCount: typed.wordCount }
  return { code: 'unknown-words', unknownWords: typed.unknownWords }
}

export function describeJoinProblem(problem: JoinProblem): string {
  switch (problem.code) {
    case 'no-name':
      return 'Put your name on a label first, so the others know whose stitches are whose.'
    case 'wrong-word-count':
      return `The code is four words. That was ${problem.wordCount}.`
    case 'unknown-words':
      return `${quoteList(problem.unknownWords)} ${problem.unknownWords.length === 1 ? "isn't" : "aren't"} in the word list. Check the spelling.`
    case 'not-started':
      return 'Nobody is playing with these words yet. Check them for typos, or start a game yourself.'
    case 'offline':
      return "Couldn't reach the game. Check your connection and try again."
  }
}

function quoteList(words: string[]): string {
  const quoted = words.map((word) => `"${word}"`)
  if (quoted.length === 1) return quoted[0]
  return `${quoted.slice(0, -1).join(', ')} and ${quoted[quoted.length - 1]}`
}
