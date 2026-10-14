# Work Smart Tutorials

The active site is a Next.js App Router application in `src/`, using strict TypeScript, Tailwind v4 and Effect. The user rejected the initial three prototypes and requested an education-institute layout with a full-size header and rotating photographic hero. The current design follows that brief in the style of Aakash, Physics Wallah and ALLEN (white base, contained banner carousel, sentence-case two-tone headings, pill buttons, dark navy footer). The user rejected a navy/teal version and a dark ink/yellow condensed-type version as unprofessional. Scraped evidence is in the gitignored `.firecrawl/` directory. Product context lives in `PRODUCT.md`.

- Brand colours come from the real WST logo and HSC channel banner: blue `#3f3c9b` (primary), maroon `#7e2634`, navy `#213f73`, cream `#d9cfbe`. Font: Plus Jakarta Sans, self-hosted in `public/fonts/`. The logo at `public/images/wst-logo.png` is cropped from the official Work Smart HSC YouTube avatar; replace it when the owner supplies an original file.
- Use pnpm only (`pnpm-lock.yaml`); running npm here mixes `node_modules` layouts and breaks installs. Run `pnpm dev` on port 3000. The Playwright suite in `e2e/` expects that server to be running. Verification: `pnpm typecheck`, `pnpm build`, `pnpm test`. Chromium is required (`pnpm exec playwright install chromium`).
- The design system is documented in `DESIGN_SYSTEM.md`: role tokens in `src/app/tokens.css`, one page background, shadcn Button, Card, Item, Toggle Group and Native Select (picked through the Col MCP at `https://usecol.com/api/mcp`) styled by plain classes in `globals.css`. Use these instead of one-off styles; `pnpm check:design` checks contrast and token references. Hero motion must fall back to plain text under `prefers-reduced-motion`.
- Site copy follows the user's `unslop` skill: plain, short, no slogans or eyebrow labels.
- `src/lib/catalog.ts` validates course data with Effect Schema. Course pages use Effect for typed lookup errors. Keep client components free of server-side Effect runtimes.
- `/demo` is a design trial ("printed annual" direction from the Fleet taste-skill, sheet in `.taste-skill/direction.json`). It has its own header and footer; `SiteChrome` hides the shared ones there. Styles are scoped in `src/app/demo/demo.css` and it is light-only.
- Original `index.html`, `prototype.*` files are preserved but are not served by Next.js. `pnpm preview:legacy` serves them on port 4173. They are rejected concepts, not visual authority.
- User-confirmed courses: SSC, HSC, NEET, JEE, MHT-CET and HSC Computer Science. Location: Naya Nagar, Mira Road.
- Result scores, result year, contact number, precise address, original logo, classroom photography and future exam dates still require owner or official-source confirmation. Never turn example data into published claims.
- Banner photos are illustrative Unsplash photos, locally stored with credits at `/image-credits` (the user asked for the page to stay out of the footer; Unsplash does not require attribution). Classroom video thumbnails link to the user-provided YouTube channels. The first hero slide, video cards and results feature use real thumbnails from those channels (the user approved featuring teachers). Verified results go in the empty `results` array in `src/lib/catalog.ts`; the homepage results board renders them automatically. Do not represent stock photos as Work Smart students or premises.
- Enquiries currently link to the institute's official Instagram accounts. No enquiry storage or external submission API exists.
- Student authentication and private resources are NOT connected. `/student-portal` explicitly explains this and does not accept credentials. Supabase is a recommendation, not a confirmed or provisioned service; private videos need a hosting/access decision too.
- Keep indexing disabled until the institute verifies content and approves launch. Update the privacy page before adding accounts, analytics, forms or external storage.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
