# Product

<!-- impeccable:product-schema 1 -->

All facts below come from the ship-app brief; the user delegated every product and design decision for ship-app runs
in advance. Facts marked *(inferred)* were not stated and are the builder's reading of the brief.

## Platform

web

## Stack

Vite + React + TypeScript, frontend-only, Cloudflare Workers static assets (pinned by ship-app), plus one Worker with
a Durable Object for unsafe sharing between devices (TinyBase), per ship-app's sharing-between-devices rule.

## Users

2 to 4 people in the same room (a sofa, a café table, a train) who want a quick game, each holding their own phone
*(inferred)*. One person starts; the others join by typing four words or scanning a QR code.

## Product Purpose

Play Dots and Boxes together without passing one phone around or making an account. Success: from "want to play?" to
the first line drawn in under a minute, and a full game on a 4 by 4 board in a few minutes.

## Positioning

No sign-up, no app store, no lobby browser: four everyday words are the table. The game lives on everyone's own phone
and keeps going through a dropped connection.

## Operating Context

Phones held in portrait, one hand, often glancing between the screen and each other. Players talk across the table;
the screen confirms whose turn it is and what just happened. Joining happens by reading words aloud or scanning
another phone's screen.

## Capabilities and Constraints

- Board sizes: 3, 4 or 5 boxes per side. 2 to 4 players seated in join order; later arrivals watch until the next round.
- Classic rules: drawing the last side of a box claims it and earns another turn; most boxes wins; draws are possible.
- Rematch rotates who starts. Leaving only forgets the game on this phone; the words bring you back.
- Unsafe sharing: anyone with the words can read and change the game; the server can read it. No hidden information
  is ever stored, so the game never needs secrecy. No accounts, no chat, no personal data beyond a first name.
- English only *(inferred)*.

## Evidence on Hand

None. No testimonials, player counts or press exist; do not invent any.

## Product Principles

- Whose turn it is must be obvious from across the table.
- Joining is reading four words aloud; never more steps than that.
- Honest about being unsafe: say plainly that anyone with the words can see and change the game.
- A dropped connection is normal, not an error.

## Accessibility & Inclusion

Player identity never rests on colour alone *(inferred)*: each seat also has its own mark. Works at 360px wide,
keyboard playable, respects reduced motion.
