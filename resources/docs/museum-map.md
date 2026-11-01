# Museum Codebase Map (Phase 0 — read-only)

Generated: Oct 26 2026. Stack facts first, then every anchor string with its file, owner component/function, and one-line behaviour. "Shared" = rendered in more than one room or reused across flows.

## 3D stack

| Fact | Value |
|---|---|
| Renderer | `@react-three/fiber` **8.18.0** (no `@react-three/drei` anywhere in `package.json` or imports) |
| Three.js | `three` **0.169.0**; React 18.2; Vite 5 |
| Text in 3D | **Canvas textures**, never drei `<Html>`/troika: `makeLabelTexture` / `LabelPlane` (`src/museum/scene/labels.jsx`) and `BoardPlane` (`src/museum/world/boards.jsx`) draw 2D canvas, upload as `THREE.CanvasTexture` |
| Analytics | `@vercel/analytics` **is installed** (`trackMuseumEvent` wrapper at `src/museum/analytics.js` calls it via `/event` debug calls today) |
| Dev hooks | Only in dev builds: `window.__museumCamera` / `__museumEngine` / `__museumGl` / `__museumScene` (set in `src/museum/world/engine.jsx`) |

## HUD strings → owners

| String | File | Owner | How it works |
|---|---|---|---|
| `Leave museum` (+aria "Leave the museum and open the classic portfolio") | `src/museum/MuseumHud.jsx` (~L178) | `MuseumHud` → `onExit` prop | Top-bar button calls `exitMuseum` in `MuseumExperience`: pauses engine, closes the `<dialog>`, calls App `closeMuseum` — it does **not** navigate to a URL (see Classic Portfolio below) |
| `Directory` | `src/museum/MuseumHud.jsx` (~L167) | `MuseumHud` top-bar button → `onToggleMenu` | Toggles the `museum-menu` overlay; Esc/dialog-cancel also toggles it |
| `YOU ARE IN: <room>` | `src/museum/MuseumHud.jsx` (~L185) | `.museum-room-chip` `<p aria-live>` | Mirrors `roomTitle.toLowerCase().toUpperCase()` next to the big title; room comes from engine `roomAt` beats |
| `CONNECTED GALLERIES` | `src/museum/MuseumHud.jsx` (~L189) | `.museum-side-label` | Pure decoration, vertical mono text, left edge |
| `Where would you like to go?` | `src/museum/MuseumHud.jsx` (~L304) | Directory modal (`role="dialog"` `#museum-menu`) | Lists `TRAVELS` from plan.js; cards call `onTravel(roomId)` |
| **goToRoom** (the room-card mover) | `src/museum/MuseumExperience.jsx` `travel` (~L208) → `src/museum/world/engine.jsx` `MuseumController` effect `travel` (~L111) | `travel(roomId)` | Sets `engine.current.path = {points,…}` from BFS `findPath`; engine walks the visitor room-by-room each frame (or `snapTo` instantly under reduced motion). `api = { travel, goTo, snapTo }` |
| `Click to walk to the exhibit` / `Click or press E to open the exhibit` | `src/museum/MuseumHud.jsx` (~L204-212) | `.museum-hover-card` | Rendered while `hoverProject` is truthy; canvas click on an exhibit with focus → `onApproachExhibit` (`api.goTo(waypoint)`) or open panel |
| `Open the exhibit` (E-prompt family; also `Open the exhibit record`, `Open contact actions`, `Leave to the classic portfolio`) | `src/museum/MuseumHud.jsx` (`PROMPTS` L17-23, rendered `.museum-prompt` L214-231) | HUD prompt bar | Shown when engine reports a `nearInteractive`; `onInteract` opens the matching panel |
| `LOOK MODE · ESC TO RELEASE` | `src/museum/MuseumHud.jsx` (~L194) | `.museum-lock-note` | Pure DOM tooltip shown whenever `locked` is true |
| Crosshair `+` | `src/museum/MuseumHud.jsx` (~L199) `.museum-reticle` + CSS in `src/museum/museum.css` | DOM reticle | **Rendered unconditionally right now** — not gated on pointer lock; the "hand" cursors are CSS on `.museum-canvas` (`grab` / `is-dragging grabbing` / `is-over-exhibit pointer`) |
| `pointerLock` | `src/museum/MuseumExperience.jsx` L332-349 | pointer-lock effect + `requestLookMode` | End of a still drag (no exhibit nearby) calls `viewportRef.requestPointerLock()`; `pointerlockchange` sets `locked` state and `engine.current.locked`; `Esc` releases (browser) and clears movement |

## Classic Portfolio exit

| File | Owner | How it works |
|---|---|---|
| `src/museum/world/atrium.jsx` (~L155-176) | `AtriumSignage` door plaque `title="Classic Portfolio"` | A `LabelPlane variant="plaque"` on the south header above the non-auto door (plan.js `DOORS` id `classic`, `auto: false`) |
| `src/museum/world/plan.js` (DOORS L68, ROOMS `vestibule` L34) | plan data | Door is interaction-only; engine always treats non-auto doors as solids |
| `src/museum/MuseumHud.jsx` `ExitPanel` (~L575) | Exit choice panel | `Press E` at the door opens it; "Stay" → `onClosePanel`, "Open the classic portfolio" → `onExit` |
| `src/museum/MuseumExperience.jsx` `exitMuseum` (~L236) → `src/App.jsx` `closeMuseum` (L26-40) | Exit handler | Closes the dialog (`setMuseumOpen(false)`), deletes `museum=1` from the URL via `history`, refocuses the classic page's museum-entry button. **The "classic site" is the same SPA page — PortfolioSiteClean sections behind the dialog — there is no external URL anywhere** |

## Info boards & placards

| String | File | Owner | How it works |
|---|---|---|---|
| `Based in Nigeria · Working remotely` (kicker of Contact board) | `src/museum/world/studio.jsx` `ContactWallBoard` (~L89) → `src/museum/world/content.js` `STUDIO.location` (L139) | `BoardPlane` | Canvas-drawn board: kicker row at y≈76, title 58px at y≈116, rows below |
| `Let's talk` | `src/museum/world/studio.jsx` (title of `ContactWallBoard`) | `BoardPlane` | Same canvas board as above |
| `Toolkit` kicker / `Tools, daily` | `src/museum/world/workshop.jsx` `ToolkitBoard` (~L119-136) | `BoardPlane` | Canvas board with toolkit rows from `WORKSHOP.toolkit` |
| Second workshop board (`About` / "Awesome Akokayo") | `src/museum/world/workshop.jsx` `AboutBoard` (~L139-155) | `BoardPlane` | Same shared canvas board component |
| `The court at Benin City` / Benin placards | `src/museum/world/heritage.jsx` (`HeritageGallery` L171-213 + `HeritageCase` L~112-153) + texts in `src/museum/world/content.js` (`HERITAGE.exhibit`, `context.timeline`) | `LabelPlane variant="plaque"` | One canvas plaque per case at the case's west face (`rotation [0, π/2, 0]`, x=15.83); exhibit/context/sources kinds |
| `Built with` (panel row `BUILT WITH`) / `Business product | src/museum/MuseumHud.jsx `ProjectPanel` (~L390-414) + `src/data/projects.js` (`category` field) | Project panel | dl rows ROLE / BUILT WITH render `project.role`, `project.tags.join(" · ")`; figure shows `project.image` (the cropped-headline card) — data file is **shared with the classic site** (`src/ProjectShowcase.jsx` consumes the same array) |

## Per-room world modules (each imports the shared families)

`src/museum/world/atrium.jsx` (hub + wayfinding + door plaques) · `works.jsx` (pedestals/exhibits) · `heritage.jsx` (vitrine cases + booklets) · `workshop.jsx` (table + boards) · `studio.jsx` (desk + plants + wall board) · `doors.jsx` (`AutoDoor` leaf pairs + status lamps) · `exit.jsx` (`ClassicExit` geometry) · all orchestrated by `MuseumWorld.jsx` inside `WorldContext`.

## Shared components (used by more than one room/flow)

| Component | File | Used by |
|---|---|---|
| `LabelPlane` / `useLabelTexture` | `src/museum/scene/labels.jsx` | Door plaques (atrium, all except classic have auto lamps), Room wall titles, DoorSign back-labels, Heritage case placards, Exhibition guardrail note, number medallions |
| `BoardPlane` | `src/museum/world/boards.jsx` | Workshop (Toolkit, About) AND Studio (Contact wall board) — the only two drawers of structured rows |
| `WorldContext`/`useWorld` + `WallFabric`/`RoomCeilings`/`DoorwayFrames` | `src/museum/world/shell.jsx` | Every room via `MuseumWorld` (walls, coves, headers, signs all derive from `plan.js`) |
| `plan.js` exports (`ROOMS`, `WALL_RECTS`, `DOORS`, `HEADERS`, `TRAVELS`, `roomAt`, `findPath`, `FURNITURE_RECTS`, `INTERACTIVES`) | `src/museum/world/plan.js` | Engine controller, shell, every room module, HUD (`TRAVEL_LABELS`, `roomAt`) |
| `AutoDoor` | `src/museum/world/doors.jsx` | Every auto doorway pair (5 of 6 doors; `classic` is `auto:false`) |
| `Exhibit` | `src/museum/scene/exhibits.jsx` | Works gallery pedestals (onHover/onSelect wired to HUD cards) |
| `projects` array | `src/data/projects.js` | Museum `ProjectPanel` AND classic-site `ProjectShowcase` (must stay backward-compatible in Phase 5) |
| `trackMuseumEvent` | `src/museum/analytics.js` | Experience + every panel/door/travel interaction (wraps `@vercel/analytics` with try/catch console fallback) |
