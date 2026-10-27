---
name: Dots and Boxes
description: A quilt sewn together by two to four phones, one stitch a turn.
colors:
  backing: "#1d2a4d"
  backing-deep: "#141e3a"
  backing-weave: "rgb(255 255 255 / 0.035)"
  label-cloth: "#f1e6d2"
  label-bright: "#fffaf0"
  label-ink: "#1d2a4d"
  label-ink-soft: "#4a5577"
  ink: "#f4ecdd"
  ink-soft: "#c3c9de"
  basting: "rgb(244 236 221 / 0.22)"
  basting-hover: "rgb(244 236 221 / 0.6)"
  pin: "#c99d3e"
  pin-shine: "#f6dc93"
  fabric-0: "#cf3f34"
  fabric-1: "#e0a22a"
  fabric-2: "#23928a"
  fabric-3: "#de6a9b"
  print-light-0: "rgb(255 244 236 / 0.42)"
  print-light-1: "#fff3d1"
  print-light-2: "#dcf3ee"
  print-light-3: "#ffeaf3"
  thread-0: "#ff7c6b"
  thread-1: "#ffcb4f"
  thread-2: "#58d6c8"
  thread-3: "#ff9fc8"
  problem: "#ffb4a6"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', 'Atkinson Hyperlegible', sans-serif"
    fontSize: "clamp(2rem, 10vw, 3rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Bricolage Grotesque Variable', 'Atkinson Hyperlegible', sans-serif"
    fontSize: "clamp(1.625rem, 7vw, 2.125rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Bricolage Grotesque Variable', 'Atkinson Hyperlegible', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  button:
    fontFamily: "'Bricolage Grotesque Variable', 'Atkinson Hyperlegible', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    letterSpacing: "-0.01em"
  score:
    fontFamily: "'Bricolage Grotesque Variable', 'Atkinson Hyperlegible', sans-serif"
    fontSize: "1.125rem"
    fontFeature: "tnum"
  body:
    fontFamily: "'Atkinson Hyperlegible', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Atkinson Hyperlegible', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
rounded:
  hem: "2px"
  cloth: "3px"
  card: "4px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2.25rem"
  "7": "3.5rem"
components:
  button-tag:
    backgroundColor: "{colors.label-cloth}"
    textColor: "{colors.label-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.cloth}"
    padding: "0.75rem 1rem"
    width: "100%"
  button-tag-on-cloth:
    backgroundColor: "{colors.label-ink}"
    textColor: "{colors.label-cloth}"
    typography: "{typography.button}"
    rounded: "{rounded.cloth}"
    padding: "0.75rem 1rem"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.cloth}"
    padding: "0.75rem 1rem"
    width: "100%"
  button-small:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.cloth}"
    padding: "0.25rem 0.75rem"
  field-input:
    backgroundColor: "{colors.label-cloth}"
    textColor: "{colors.label-ink}"
    rounded: "{rounded.cloth}"
    padding: "0.75rem"
  name-label:
    backgroundColor: "{colors.label-cloth}"
    textColor: "{colors.label-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.hem}"
    padding: "0.25rem 0.75rem 0.25rem 0.5rem"
  swatch:
    rounded: "{rounded.hem}"
    size: "1.375rem"
  score-tab:
    backgroundColor: "{colors.label-cloth}"
    textColor: "{colors.label-ink}"
    padding: "0.5rem 0.75rem"
  score-tab-winner:
    backgroundColor: "{colors.label-bright}"
    textColor: "{colors.label-ink}"
  code-card:
    backgroundColor: "{colors.label-cloth}"
    textColor: "{colors.label-ink}"
    rounded: "{rounded.card}"
    padding: "1.5rem 1rem"
  confirm-dialog:
    backgroundColor: "{colors.label-cloth}"
    textColor: "{colors.label-ink}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
---

# Design System: Dots and Boxes

## Overview

**Creative North Star: "The Quilt on the Table"**

Everything on screen is a piece of a quilt being sewn by the people around the table. The ground is deep indigo backing cloth with a fine plain weave drawn into it; the dots are brass quilting pins; a drawn line is a running stitch in its player's thread; a won box is a cotton patch in its player's print, laid in and hemmed. Interface chrome is made of the same sewing-box materials: buttons, fields, score strips, the four-word card and the dialog are woven clothing labels in cream cloth, and dividers, focus rings and label outlines are dashed stitches rather than rules.

The app is a single narrow column (30rem on phones, 44rem on wider screens) with the board as the largest thing on every game screen. Density is low and the type is large, because the screen is glanced at from arm's length while people talk. Colour is committed rather than sparing: four saturated prints and four bright threads carry player identity, and the leading player's thread takes over the quilt's binding, the turn line and the score tab at once.

Player identity is never colour alone. Each seat has its own print shape (check, polka dot, ticking stripe, star) and its own stitch rhythm, so a grayscale screenshot still tells the seats apart. The world rejects the category default of neon lines on black and the graph-paper notebook.

**Key Characteristics:**
- Indigo woven ground, cream woven labels, brass pins, cotton prints, coloured thread.
- Dividers, focus rings, label outlines and every line on the board are dashed stitches; solid strokes are reserved for the binding and selection rings.
- Four seats, each a print + a thread + a stitch rhythm; the three always travel together.
- Soft, cast shadows only where cloth sits on cloth; the backing itself is flat.
- Bricolage Grotesque for anything sewn on as a label or announced; Atkinson Hyperlegible for everything read.

## Colors

A dark indigo cloth ground lit by cream labels and four high-saturation sewing colours, each in two tones.

### Primary
- **Indigo Backing Cloth** (backing): the page ground and the quilt's backing. Always carries the 1px weave (backing-weave) at a 3px pitch on both axes, so it reads as cloth, never as flat colour.
- **Deep Backing** (backing-deep): recessed cloth, used for the unselected faces of the board-size picker.

### Secondary
- **Label Cream** (label-cloth): the woven label cloth for every surface a player touches or reads at length: primary buttons, text fields, name labels, the score strip, the four-word card and the dialog. Carries a vertical rib (1px every 3px in label-ink at 10-12%).
- **Bright Label** (label-bright): the winner's score tab only.
- **Label Ink** (label-ink): text and QR ink printed on cream cloth. It is the backing indigo by design, so labels look printed in the quilt's own dye.
- **Faded Label Ink** (label-ink-soft): secondary text and placeholders on cream.

### Tertiary
- **Brass Pin** (pin) and **Pin Shine** (pin-shine): the board's dots, drawn as a brass head with a highlight and a dark cast shadow; also the miniature pin grids in the size picker.
- **The four prints** (fabric-0 red, fabric-1 mustard, fabric-2 teal, fabric-3 pink, each with its pale motif colour print-light-0..3): patch grounds and swatches, and the leading edge of a score tab on cream.
- **The four threads** (thread-0 coral, thread-1 marigold, thread-2 aqua, thread-3 rose): stitches, the quilt binding and the turn line on indigo. Marigold (thread-1) doubles as the system focus and selection colour.

### Neutral
- **Unbleached Ink** (ink): body text on indigo.
- **Faded Ink** (ink-soft): field labels, hints, captions, the connection status.
- **Basting** (basting) and **Basting Pulled** (basting-hover): undrawn lines and quiet dividers at 22%, and the hover preview and quiet-button outline at 60%.
- **Unpicked** (problem): error text and its 2px inset outline on indigo.

### Named Rules
**The Ground Decides the Tone Rule.** On indigo, a seat shows in its bright thread colour (stitches, binding, turn text). On cream, it shows in its deeper print colour (score-tab edges, swatches). Never put a thread colour on cream or a print ground as text on indigo.

**The Seat Travels Together Rule.** A seat's print, thread and stitch rhythm always appear as a set. Anywhere a seat's colour appears, its print (as a swatch) or its stitch rhythm appears with it.

## Typography

**Display Font:** Bricolage Grotesque Variable (with Atkinson Hyperlegible, sans-serif)
**Body Font:** Atkinson Hyperlegible 400/700 (with system-ui, sans-serif)

**Character:** Bricolage is the voice of the label maker, chunky and tightly tracked at 700-800, used for anything stitched on or announced. Atkinson is the reading face, built for legibility at a glance across a table.

### Hierarchy
- **Display** (800, clamp(2rem, 10vw, 3rem), 1, -0.035em): the title sewn as a label across the home quilt. One per app.
- **Headline** (800, clamp(1.625rem, 7vw, 2.125rem), 1.1, -0.03em): the turn and result line above the board, in the leader's thread; it grows to clamp(2rem, 9vw, 2.75rem) when it is this phone's turn. The four words on the code card use the same voice at clamp(1.75rem, 9vw, 2.5rem).
- **Title** (700, 1.375rem, 1.15, -0.02em): panel headings ("Join a game", "At the table"); the dialog title is 1.5rem.
- **Button** (700, 1.25rem, -0.01em): primary label buttons; secondary buttons drop to 1.125rem, the small header button to 0.9375rem.
- **Score** (Bricolage, 1.125rem, tabular figures): scores in the strip; the winner's score grows to 1.5rem.
- **Body** (400, 1.0625rem, 1.5): pitch text, dialog text, hints at 0.9375rem.
- **Label** (700, 0.9375rem): field labels and size-option names in faded ink, sentence case.

### Named Rules
**The Typed Words Are Display Rule.** The four join words are always set in Bricolage 600-800, both when shown on the code card and inside the field where they are typed, so the words look the same on every phone.

**The Sentence Case Rule.** No uppercase, no letter-spaced small caps; labels are short sentence-case phrases.

## Layout

A single centred column: max 30rem with 1rem side padding and 3.5rem bottom padding on phones, widening to 44rem at 48rem viewport, where the home and waiting screens sit in a 34rem inner column and the in-game board is sized by height (100dvh minus 15rem) so the whole quilt fits without scrolling. Built for 360px wide portrait.

Spacing follows a seven-step scale (0.25, 0.5, 0.75, 1, 1.5, 2.25, 3.5rem). Screens are vertical grids: the home stack at 1.5rem gaps, the game stack at 1rem, panel interiors at 0.75rem. Sections are separated by a 2px dashed basting line with 1.5rem (home) or 1rem (invite) above the content, never by boxes.

On a game screen the order is fixed: header bar (title, connection, Leave), turn line, board, last-stitch caption, score strip, then the folding invite panel. The board always fills the column width on phones.

## Elevation & Depth

Depth is physical and shallow: cloth laid on cloth. The indigo backing is flat at all times; anything cream sits on it with a soft, cool cast shadow tinted with near-black indigo (rgb(8 12 28)), and the shadow grows with the size of the piece. Pins and patches cast small drop shadows inside the SVG. No glows, no blur, no hard offset shadows.

### Shadow Vocabulary
- **Sewn-in label** (`box-shadow: 0 2px 4px rgb(8 12 28 / 0.35)`): name labels.
- **Label at rest** (`box-shadow: 0 3px 8px rgb(8 12 28 / 0.4)`): primary buttons and the score strip.
- **Label lifted** (`box-shadow: 0 6px 14px rgb(8 12 28 / 0.45)`): primary button on hover, with a 1px rise.
- **Big label** (`box-shadow: 0 6px 16px rgb(8 12 28 / 0.45)`): the four-word card.
- **Title label** (`box-shadow: 0 8px 18px rgb(8 12 28 / 0.5)`): the sewn title over the home quilt.
- **Dialog** (`box-shadow: 0 16px 40px rgb(8 12 28 / 0.6)`): the confirm dialog over a 70% indigo-black backdrop.
- **Patch** (`filter: drop-shadow(1px 3px 2px rgb(8 12 28 / 0.45))`) and **pin** (a dark circle offset 1.5/2.5 units under the head): in-board depth.

### Named Rules
**The Backing Stays Flat Rule.** The indigo ground never takes a shadow or a gradient beyond its weave. Only cloth laid on top of it casts.

## Shapes

Corners are barely softened, like cut and hemmed cloth: 2px for small sewn-in pieces (name labels, swatches), 3px for buttons, fields, score strip and picker faces, 4px for the big card and dialog. The quilt itself has a 10-unit corner with its binding at 7. Nothing is pill-shaped or circular except pins, the last-stitch tag and the connection dot.

Outlines are stitches. Primary buttons, the code card and the home title carry a 2px dashed inner outline in label ink at 35-40%, inset 7-10px from the edge. Patches and swatches carry a dashed white hem inset from their edge. Name labels have folded ends: a 7px darker rib band at each side.

## Components

### Buttons
Labels you can press; the primary is cloth, the rest are basted outlines.
- **Shape:** gently hemmed (3px).
- **Primary (label button):** full-width cream label cloth with rib, label-ink Bricolage 700 at 1.25rem, 0.75rem by 1rem padding, a dashed inner stitch 7px in, and the "label at rest" shadow.
- **Hover / Focus:** rises 1px into the "label lifted" shadow over 160ms on the ease-out curve; focus turns the inner stitch solid label ink.
- **Primary inside the dialog:** inverted, label ink cloth with cream text and a cream stitch.
- **Quiet:** transparent, full width, 2px inset outline in pulled basting, unbleached ink at 1.125rem; hover darkens the outline to full ink. Used for the second of two choices on a screen.
- **Small:** the header's Leave; 1.5px basted outline, 0.9375rem.
- **Disabled:** 45% opacity, default cursor.

### Inputs / Fields
- **Style:** cream label cloth, no border, 3px corners, label ink text at 1.125rem, 0.75rem padding; a faded-ink label above in Atkinson 700.
- **Focus:** 2px dashed marigold stitch 3px outside the field.
- **Error:** a separate unpicked-coral message with a 2px inset outline, never a red border on the field.

### Chips: Name Labels and Swatches
- **Name label:** a woven clothing label with folded ends, the player's swatch then their name in Atkinson 700; the current player's label gets a dashed cream stitch 3px outside.
- **Swatch:** a 1.375rem square of the player's print with a dashed white hem, 2px corners. It stands for the seat beside any name, score or turn line, and scales to 1.1em in the turn line.

### Cards / Containers
- **Code card:** the big label, cream with rib, 4px corners, dashed stitch 10px in, "big label" shadow, 1.5rem by 1rem padding; four words in display weight, an instruction in faded label ink, the QR printed in label ink on the label cloth.
- **Confirm dialog:** plain cream cloth (no rib), 4px corners, 1.5rem padding, two equal buttons side by side; the confirm button names the action.
- **Section panels:** no container at all; a dashed basting rule above.

### Navigation
A single header bar on game screens: the app name in Bricolage 800 on the left, the connection state (a small dot, aqua thread when connected, basting when reconnecting) and the small Leave button on the right.

### The Quilt (signature)
The board, in SVG: woven backing with a 26-unit margin, a binding round the edge in the leader's thread (8 units, or plain cream at 35% when nobody leads), brass pins at every dot, basting stitches (2px, 3/9 dash) on undrawn lines, running stitches (6 units) in each player's thread and rhythm on drawn lines, and printed patches hemmed in claimed boxes.
- **Stitch rhythms:** seat 0 `9 5`, seat 1 `3 4`, seat 2 `14 4 3 4`, seat 3 `6 3 1 3`.
- **Tap targets:** each undrawn line has a 34-unit invisible hit stroke; hover or focus shows a 5-unit pulled-basting preview, and focus also tints the hit stroke marigold.
- **Motion:** a stitch is pulled from pin to pin through a growing mask (420ms); a patch drops in from 82% scale and -4deg (520ms) and is hemmed left to right after it lands (480ms, 380ms delay); the last seam gets a small round tag in the sewer's print (pops in at 360ms after 300ms); when the quilt is whole the binding is sewn on all the way round at 12 units (1600ms). All on cubic-bezier(0.16, 1, 0.3, 1); reduced motion collapses every duration to 1ms.
- **Patch tap:** a claimed patch is a button that names who sewed it and on which move, shown as a caption under the board.

### Score Strip
One woven cream strip with a tab per seat, tabs ruled apart by a 2px dashed stitch. Each tab: swatch, name (ellipsised), score. The current player's tab gets a 6px band of their print along its bottom edge; the winner's tab turns bright cream, keeps the band and gains a 3px inset outline in their print, with the score enlarged.

### Board-size Picker
Three square faces of deep backing, each showing a miniature grid of brass pins (3, 4, 5 per side), with a basting inset outline; the chosen face gets a marigold inset stitch plus a marigold ring 3px outside.

## Do's and Don'ts

### Do:
- **Do** draw dividers and focus rings as a 2px dashed stitch, marigold (thread-1) for focus on indigo.
- **Do** put any surface a player reads closely or presses first on cream label cloth with its 1px-every-3px rib, printed in label ink.
- **Do** keep the 1px weave on the indigo ground everywhere, including inside the board backing.
- **Do** show a seat with its swatch next to its name, score or turn line, and draw its lines in its own stitch rhythm.
- **Do** let the leading seat's thread take the binding and the turn line together, so whose turn it is reads from across the table.
- **Do** use the ease-out curve cubic-bezier(0.16, 1, 0.3, 1) for all motion, and honour reduced motion.

### Don't:
- **Don't** draw a player's line or an undrawn line as a solid stroke; on the board only the binding round the edge is solid.
- **Don't** tell seats apart by colour alone, or add a fifth colour without a fifth print shape and stitch rhythm.
- **Don't** put thread colours on cream or print grounds as text on indigo (see The Ground Decides the Tone Rule).
- **Don't** use corners rounder than 4px on rectangular pieces, or pill shapes.
- **Don't** give the indigo backing shadows, gradients or glows.
