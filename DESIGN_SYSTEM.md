# WST design system

Clean, minimal and soft. One page background, white surfaces with soft shadows, rounded shapes and one blue accent. The rotating photographic hero and the full-size header stay as the main layout.

## Tokens

`src/app/tokens.css` holds every value. `globals.css` reads the role names only, so light and dark mode share one set of components.

- **Colour roles:** `background` (the one page colour, `#f5f5f9`), `surface` (cards, white), `surface-sunken` (rows inside cards), `foreground` and `foreground-soft` (text), `border`, `accent` (brand blue for fills), `accent-text` (blue for text and icons; lighter in dark mode), `accent-soft` (icon tiles, hover).
- **Brand:** blue `#3f3c9b`, maroon `#7e2634`, navy `#213f73`, night `#111f3c`, cream `#efe7d8`. Maroon and navy appear only in the logo text, hero slides and the header and footer bars.
- **Radius:** `sm` 10px (icon tiles), `md` 16px (rows, inputs), `lg` 24px (cards), `pill` (buttons, filters).
- **Shadow:** `sm` for cards at rest, `md` for hovered buttons, `lg` for hovered cards and floating menus. Shadows are soft, offset and tinted with the night blue. Dark mode replaces them with a 1px ring.
- **Space:** 4, 8, 12, 16, 24, 32, 48, 64, 96px.
- **Type:** Plus Jakarta Sans. Note 13px, small 14px, body 16px, title 18px, heading 28 to 40px, display 34 to 52px.

Dark mode uses a black background, near-black surfaces and white text.

## Components

Components were chosen through the [Col MCP](https://usecol.com/api/mcp) (`search_components`, `get_component`), all from shadcn/ui (Radix variant), and live in `src/components/ui/`:

- **Button:** every action. Variants: primary, light, outline, on-dark.
- **Card:** every content block. Tones: default (white), primary (solid blue with white text), muted.
- **Item:** every list row: highlights, channels, results, exam dates, updates, portal features. Variants: default, muted; sizes: default, sm.
- **Toggle Group:** the course and update filters, through `FilterTabs`, which adds the sliding pill.
- **Native Select** and **Label:** the enquiry course picker.

## Layout rules

- Every homepage section opens with the same head: heading on the left, one line of supporting text on the right.
- Two-column sections use `split-grid` (wide main card, narrow side card), so lessons, results and updates line up.
- Cards never sit inside cards. Inside a card, use muted Item rows.
- No eyebrow labels, no uppercase labels, no section numbers.
- One video card per page section at most. Results and updates use photos and rows, not more video cards.
- Filters have three options at most so they fit a phone without scrolling. HSC Computer Science sits under "Board exams".
- Footer (taken from the `/demo` trial): night blue, four link columns and the copyright line, then "Work Smart" across the full width, set a few shades lighter than the ground with a pressed-in edge and running off the bottom, so it reads as part of the background. On desktop it stays pinned under the page and is uncovered as the last section scrolls away; on phones it scrolls normally.
- Phone header (also from `/demo`): logo and a "Menu" pill. The menu holds the links, student login, the dark mode switch and the enquiry button.

## Motion

The hero slides fade between photos and colours, the filter pill slides between options, and sections rise once as they enter (`Reveal`). Everything uses transform and opacity and stops under `prefers-reduced-motion`.

## Verification

`pnpm check:design` checks the role pairs for 4.5:1 contrast in both themes and that every token used in `globals.css` exists. `pnpm typecheck`, `pnpm build` and `pnpm test` cover the rest.
