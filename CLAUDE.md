# Dots and Boxes

Frontend-only Vite + React + TypeScript app, deployed to https://dotsandboxes.graaf.dev (Cloudflare Workers; pushes to main deploy).

Follow the `house-style` and `react-slices` skills from the `graaf` marketplace (JtdeGraaf/agents), scaled to a
small frontend-only app: plain-English names, components only render, logic in `lib/` with tests. No backend beyond
the unsafe sync Worker (`worker/index.ts`, TinyBase on a Durable Object); only harmless data goes in it.
Verify with `npm run typecheck && npm test && npm run build`. `npx wrangler dev` after a build runs the site and the
Worker together; open it on `localhost` and on `127.0.0.1` to play as two phones.

The game's rules live in `src/lib/game.ts` and replay every move from the shared space, skipping moves that break
the rules, because anyone with the words can write to it. The visual system is described in DESIGN.md.
