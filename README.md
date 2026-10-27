> [!WARNING]
> **🤖 One-prompt app — please ignore the code.**
> This entire project — idea, design, code, GitHub repo, and Cloudflare deployment — was generated and shipped by [Claude Code](https://claude.com/claude-code) from a **single prompt**, in a **single run**. No human wrote or reviewed this code. It is not an example of how I write software; judge the idea, not the implementation.
>
> **The prompt:** "Ok can you do some test with the skill to check if its working, so a new project. Maybe a multi-player card game or something like that or something else turn based"

# Dots and Boxes

**Live:** https://dotsandboxes.graaf.dev

Dots and Boxes for 2 to 4 players, each on their own phone. One person starts a game and gets four words; the others
type them (or scan the QR code) to sit down at the same table. Take turns sewing a seam between two pins. Close a
square and it becomes your patch, and you go again. Most patches when the quilt is finished wins.

- **Start or join with four words.** No accounts, no app store. A typo is caught instead of opening an empty game.
- **Live turns on every phone.** Moves show up on the other phones as they're made, and a dropped connection catches
  up on its own.
- **Your own print.** Red gingham, mustard polka dots, teal ticking or pink stars, so seats are told apart without
  colour too. Tap a patch to see who sewed it and on which stitch.
- **Rematch.** "Sew another quilt" starts a new round, and the next player begins.
- **3 by 3, 4 by 4 or 5 by 5** boards.

## Sharing between devices (unsafe)

The game is kept in sync by a small Cloudflare Worker with one Durable Object per game
([TinyBase](https://tinybase.org) on both ends). It is **unsafe on purpose**, which is fine for a game and nothing
else:

- **Anyone with the four words can see and change the game**, including undoing moves or adding players. There are no
  accounts. The app replays every move by the rules and skips illegal ones, but it can't stop someone rewriting the
  game.
- **The server can read everything in it.** Games are stored as plain data in the Durable Object.
- **Guessing a code is hard, not impossible.** Four words from a list of 904 is about 39 bits, and nothing limits how
  fast someone tries.
- **No backups.** A game that someone breaks is gone.
- The only personal data is the first name each player types. Don't type anything else in it.

The words never leave the phone: the server only sees a SHA-256 hash of them.

## Running it

```bash
npm install
npm run dev        # the site only, no syncing
npm run build && npx wrangler dev   # the site and the sync Worker; open localhost and 127.0.0.1 to play as two phones
npm run deploy     # build and deploy to Cloudflare
```

Pushes to `main` deploy automatically through GitHub Actions.
