# Portfolio as an Immersive 3D Museum

**Research and implementation brief for Awesome Akokayo**  
**Research date:** 25 October 2026  
**Existing site:** https://www.awesomeakokayo.cv/  
**Repository inspected:** https://github.com/awesomeakokayo/PORTFOLIO  
**Primary implementation workflow:** OpenCode with DeepSeek V4.1 Flash

---

## 1. Executive recommendation

Build **The Living Archive: The World Behind the Work**, an immersive, navigable digital gallery that combines:

1. A carefully researched environment inspired by Edo/Benin material culture, historical courtyard spaces, and contemporary West African museum architecture.
2. Your real software projects presented as interactive exhibits. Each exhibit opens a useful case study with actual product imagery, your role, the problem, the architecture or stack, current status, evidence, and a real CTA.
3. A discovery/reward layer that reveals small “behind the build” details as people explore, without making visitors complete a game before they can see your work or contact you.
4. A conventional, accessible portfolio path that works even if WebGL fails, the visitor prefers reduced motion, or the device cannot sustain 3D.

**Core creative principle:** The world should feel like a place, not a 3D-themed landing page. It needs coherent architecture, scale, lighting, material response, navigation, object interaction, spatial audio only if explicitly enabled, loading states, and clear ways to move between exhibits. At the same time, recruiters and clients must be able to reach your strongest work in seconds.

**Cultural principle:** This is an original portfolio world informed by Edo/Benin heritage, not an official museum, not an exact recreation of a royal palace, and not a claim that the portfolio contains original artefacts. Make the distinction clear in the heritage exhibit and all object credits.

**Technical principle:** Do not instruct a coding model to “make it immersive” and let it improvise the entire product. Work in small, testable phases with defined files, acceptance criteria, actual local assets, and browser checks. Keep the existing site working throughout.

---

## 2. Audit of the existing portfolio source

The public site’s indexed metadata identifies the portfolio as a Nigerian full-stack software engineer and product builder site, highlights OpenBooks, Elroi Hub, TechSkillHub, Southwest Flood Monitor, CCU Journal Platform and Blancquake Foundation, and states a website-project starting price. The public domain’s rendered visual experience could not be inspected as a live browser screenshot in this research pass; the following implementation audit is based on the public repository’s default-branch source, which should be confirmed against the current working tree before editing.

### Verified source structure

- **Framework:** React 18, Vite, Tailwind CSS, and Lucide React.
- **Application entry:** `src/main.jsx` mounts `src/App.jsx`.
- **Main composition:** `src/App.jsx` imports `PortfolioSiteClean.jsx`, `FramerMotionLayer.jsx`, `WhatsAppCTA.jsx`, and `BackToTop.jsx`, with Vercel Analytics and Speed Insights.
- **Main sections:** `src/PortfolioSiteClean.jsx` includes the hero, selected work, experience, capability/process content, about information, and contact flow. It imports `ProjectShowcase.jsx`, `HeroBuildScene` from `BlockWorld.jsx`, and `PricingPlayground.jsx`.
- **Current hero illustration:** `src/BlockWorld.jsx` constructs block-shaped characters with SVG and uses HTML/CSS for the workbench, bricks, panels and layout. It is a stylised illustration, not a true 3D scene.
- **Project exhibit data:** `src/ProjectShowcase.jsx` currently has four primary cards: OpenBooks, TechSkillHub, Southwest Flood Monitor, and Elroi Hub. Cards use local images in `/projects/` and real project links where configured.
- **Motion:** `FramerMotionLayer.jsx` uses `IntersectionObserver` for reveal animations and checks `prefers-reduced-motion`.
- **Contact and navigation:** a contact form submits to a FormSubmit endpoint; the app also has a WhatsApp CTA, a mobile navigation menu, and a back-to-top button.
- **Brand:** ink `#080808`, surface `#0e0e0d`, paper `#f4f3ef`, secondary text `#b8b7b1`, muted text `#9c9b94`, orange accent `#ff5c00`, hover orange `#ff7324`, mint `#9FE0C1`; display font Ojuju, body font Inter, mono font Space Mono.
- **Current package dependencies:** React 18 and standard Vite/UI packages. `three` and `@react-three/fiber` were not present in the inspected `package.json`.
- **Routing:** this is currently a compact single-page Vite app and no router is listed in the inspected dependencies. Prefer an in-place experience mode initially rather than adding routes and routing complexity without a reason.

### What this means for the rebuild

Do **not** discard the current portfolio and start from a generic demo. Keep the valuable parts: project content, local project thumbnails, contact flow, WhatsApp, SEO/metadata, analytics, responsive layout, typography, brand colours, and motion/accessibility foundations. Replace the hero illustration only after a real 3D prototype is working. Then integrate the gallery progressively.

The major addition is an actual WebGL scene and the supporting asset pipeline. The implementation must use real 3D geometry/models, controlled camera movement, raycast/hotspot interactions, accessible HTML panels, loading/fallback states, and performance controls—not merely perspective transforms or a video playing behind normal cards.

### Known content issues to verify before release

The coding agent should review all existing claims and link targets against the current live work. Do not upgrade a project from “built” or “in development” to “live” without checking. Do not invent metrics, user counts, employer names, results or testimonials. For each portfolio exhibit, source facts from the current project content and GitHub repository or ask for missing information rather than making it up.

---

## 3. Research findings and source guide

### 3.1 Name and scope: Benin Kingdom / Edo people

This concept targets the **Kingdom of Benin and Edo artistic traditions in present-day Nigeria**, centred on Benin City. Do not conflate this with the modern Republic of Benin. Art associated with the kingdom includes cast copper-alloy/brass works, ivory, wood and other media. The term “Benin Bronzes” is widely used as a collective label, but it should not cause every object to be described literally as bronze.

Useful sources:

- National Museums Scotland, *The court arts and history of the Kingdom of Benin*: https://www.nms.ac.uk/discover-catalogue/the-court-arts-and-history-of-the-kingdom-of-benin
- The Metropolitan Museum of Art, *Benin Chronology*: https://www.metmuseum.org/essays/benin-chronology
- The Met, *Plaque with Warrior and Attendants* (Edo peoples, ca. 1540–70; Brass; object number 1990.332; image marked Public Domain): https://www.metmuseum.org/art/collection/search/316393
- Smithsonian National Museum of African Art, *Benin Bronzes: Ambassadors of the Oba*: https://my.si.edu/exhibitions/benin-bronzes

### 3.2 Palace landscape and courtyard architecture

A scholarly article using A. J. H. Goodwin’s archive at the University of Cape Town documents research on the old palace’s spatial layout. It describes a complex landscape of royal and chiefly compounds, courtyards, meeting spaces, shrines and earthen-walled enclosures. The article also notes that new maps are being developed from historical and archaeological evidence, which is a reminder not to claim that a speculative reconstruction is exact.

Use this research to guide **spatial rhythm and material cues**—enclosure, a sequence of thresholds, courtyard light, earthen walls, changes in ceiling height and the feeling of moving between spaces. Do not simply turn sacred compounds into decorative props. Avoid inventing exact dimensions, historical floor plans, iconography or ritual arrangements.

Source: Cambridge University Press, *Reconstructing the Old Palace Landscape of Benin City, Nigeria*: https://www.cambridge.org/core/journals/history-in-africa/article/reconstructing-the-old-palace-landscape-of-benin-city-nigeria-utilizing-a-j-h-goodwins-archive-at-the-university-of-cape-town-as-a-resource-on-edo-history-and-archaeology/76ABF91F5585B625E5165CFA46CC7C17

### 3.3 Contemporary museum reference: MOWAA

The Museum of West African Art (MOWAA) is based in Benin City. Its Institute opened in November 2025 and combines gallery/display areas with conservation, research, material science and educational/programme spaces. Its contemporary architecture and institutional approach can inform a modern museum environment, but the website should not claim that it digitally reproduces MOWAA or that its inaugural exhibition was a Benin Bronzes exhibition. Its architecture is a reference, not an asset library.

Sources:

- MOWAA — About: https://wearemowaa.org/about-us
- MOWAA — Opening week: https://wearemowaa.org/opening-week
- MOWAA — What we do: https://wearemowaa.org/what-we-do

### 3.4 Digital Benin: research, metadata and provenance

Digital Benin brings together images and documentation for thousands of Benin-related objects held in institutions internationally. Manchester Museum describes the database as covering more than 5,240 objects from 131 institutions across 20 countries, alongside historical photos, object research, provenance, Edo-language catalogue material, historical context, maps and collections information.

Use Digital Benin to discover appropriate objects and corroborate metadata. Do not assume every image can be downloaded and republished freely. For each object, record the title, date range, maker/attribution, culture, materials, current collection, object link, source of the interpretation, image rights and any uncertainty.

Sources:

- Digital Benin: https://digitalbenin.org/
- Manchester Museum, Digital Benin overview: https://www.museum.manchester.ac.uk/digital-benin

### 3.5 Existing 3D object models

The **Casting Memories** project created downloadable 3D models inspired by images of Benin Bronzes in the Smithsonian’s collection. It is directly relevant to this implementation because it offers a route to real, interactive object models without having to create every historical form from scratch. However, the project’s wording makes it clear these models were recreated using 3D modelling software from images; do not present them as scans of the actual original artefacts.

Relevant sources:

- Project site: https://asoa.cooperhewitt.org/castingmemories/
- Artist/model collection: https://sketchfab.com/castingmemories
- Ovonramwen’s Stool model: https://sketchfab.com/3d-models/ovonramwens-stool-540dbb52501b4da78dfb86775a83c5ea
- Head of an Oba I model: https://sketchfab.com/3d-models/head-of-an-oba-i-bd3a7d661efa485b88a7ef7d30270057
- Queen Mother Pendant Mask: Iyoba: https://sketchfab.com/3d-models/queen-mother-pendant-mask-iyoba-4b7cd885ef2e461783786f96d0483780

The reviewed Ovonramwen’s Stool, Head of an Oba I, and Queen Mother Pendant Mask: Iyoba model pages show **Creative Commons Attribution (CC BY)**. Check each downloaded asset’s current page and exact licence again immediately before use. Include author/model title, source URL, licence URL, and any modifications in a local credits file and a visitor-accessible credits view. The Head of an Oba I page shows a much higher triangle count than the stool or pendant mask, so test and optimise it before placing it in the first-load scene.

### 3.6 Public-domain images and collection metadata

The Met’s Open Access programme provides structured object data and high-resolution images marked public domain, and its API documentation says the relevant open-access data is available for unrestricted commercial and noncommercial use. Still, use the API’s public-domain indicator and the individual object page, rather than assuming every museum image is open access. Credit sources as a matter of transparency even when a licence does not require it.

Sources:

- Met Open Access API documentation: https://metmuseum.github.io/
- Met Open Access repository: https://github.com/metmuseum/openaccess
- Example plaque page: https://www.metmuseum.org/art/collection/search/316393

### 3.7 Historical and cultural framing

The British invasion of Benin City in 1897 resulted in the removal of the reigning Ọba Ovonramwen and the looting of royal objects. Objects have subsequently been dispersed across museums, institutions and private collections; questions of provenance, ownership and return remain important to how these works are presented. Keep the history factual and sourced. Do not use colonial violence as a dramatic game mechanic, turn objects into collectibles with points, or describe historical claims as certain when sources disagree.

The Smithsonian’s Benin Bronzes exhibition page provides relevant object and transfer context: https://my.si.edu/exhibitions/benin-bronzes

---

## 4. Creative direction

### Working title

**The Living Archive — The World Behind the Work**

Other usable names: **The Archive of Making**, **The House of Ideas**, or **A World Built by Hand**. Choose one final title before implementation; do not let the coding model randomly rename the project during later phases.

### The story

A visitor arrives at a contemporary gallery whose spatial language is informed by Edo/Benin compounds and the material richness of West African art. A clear threshold invites them to enter. Inside, the visitor discovers two connected stories: one about the depth and material culture of Benin/Edo art, and one about the systems and products Awesome has built. The museum metaphor links craft, research, and engineering, but does not suggest that the user’s software is equivalent to sacred or ancestral objects.

The primary portfolio exhibits should remain the main goal. The historical artwork room should have its own labels and sources, rather than making actual cultural objects into a prop for software projects.

### Suggested spatial sequence

1. **Arrival Court / Threshold**  
   A calm approach with a strong sense of scale: warm earthen material, shade, daylight, carefully framed openings, subtle vegetation and a visible entrance. The screen should immediately show who the visitor is visiting and what the space is. Main actions: **Enter the Gallery** and **View Portfolio Without 3D**.

2. **The Collection / Benin and Edo Context**  
   A small, carefully curated room featuring a few appropriately licensed objects or image-led exhibits. Use 2–4 strong examples rather than a large wall of undifferentiated assets. Every object label includes accurate naming, material, date/attribution where known, source institution/creator and rights. Include a short context panel about the object’s role and provenance when reliable sources support it.

3. **The Works Gallery / Selected Projects**  
   This is the central portfolio space. Place four principal exhibits for OpenBooks, TechSkillHub, Southwest Flood Monitor and Elroi Hub, using the existing local project screenshots. Make each display visually distinct but not so abstract that visitors cannot identify the actual product. Selecting an exhibit opens a crisp accessible case-study panel with project summary, your contribution, stack, evidence/status and links.

4. **The Workshop / How It Was Built**  
   A more technical room. Use a physical-feeling worktable, diagrams or small interactive installations to explain architecture, APIs, data, AI integration, product thinking and the build process. Only include technologies and work that are genuine. An interactable blueprint/flow is useful; a pile of floating code snippets is not.

5. **The Archive / Experience and Toolkit**  
   A compact display for experience, education, leadership, certifications and technical toolkit. Use searchable/readable panels and do not force visitors to walk to every single text block to learn basic facts.

6. **The Exit / Contact Studio**  
   A welcoming final location with direct email/WhatsApp/contact actions and the existing project enquiry form. Contact is always accessible via an overlay/navigation item, not only at the end of the virtual route.

### Visual language

- **Spatial references:** historically informed courtyards, thick walls, thresholds, sheltered passages, framed views, plinths and gallery transitions. Distinguish interpretive historical ideas from the contemporary gallery architecture.
- **Material palette:** earthen terracotta, burnt ochre, warm ivory, dark charcoal, aged brass/copper tones, restrained timber and carefully controlled natural greenery.
- **Existing brand colours remain:** carbon ink `#080808`, paper `#f4f3ef`, orange `#ff5c00`, mint `#9FE0C1`, with Ojuju, Inter and Space Mono. Orange should remain the brand/action accent, not be spread across every wall or used as a generic glow.
- **Lighting:** warm daylight for the arrival court, softer focused gallery lighting for artworks, controlled shadows, realistic roughness and reflections, and a visible hierarchy of bright/dim spaces. Avoid a constant orange bloom, excessive fog, neon tubes, extreme lens flares, generic cyberpunk lighting and overdone post-processing.
- **Interaction feedback:** objects should respond through a subtle highlight, focus cue or label reveal. Selection should feel deliberate, with a short smooth camera/door/curtain transition, never a long unskippable cinematic.
- **Typography:** use real DOM text and the existing font system; do not bake critical text into textures or render captions as 3D geometry.
- **Tone:** confident, crafted, curious, culturally grounded and contemporary—not a game lobby, generic metaverse, luxury-property walkthrough or AI-gradient template.

### The reward system

The reward is discovery and better understanding of your work, not points for consuming cultural heritage.

- Discoveries may unlock an extra case-study note, an architecture diagram, a short process clip or a small “behind the build” panel.
- Show modest progress such as **3 of 5 exhibits explored**, if it adds a genuine sense of completion.
- Give each discovery a useful takeaway or a working action: open a demo, inspect a case study, view a repo, or understand a design/engineering decision.
- Include 1–3 optional easter eggs related to your own product-building journey, never hide contact information or essential project information behind them.
- Persist exploration progress locally only if needed. Do not demand sign-in, collect personal information, or build a back end solely for visitor progress.
- Keep a conventional portfolio path available at all times.

---

## 5. Interaction and navigation specification

### Entry and exit

- Use one explicit action to start the heavy immersive experience, so the browser does not need to download and initialise every 3D asset before the visitor can read the page.
- The entry view must have a convincing static/HTML fallback while the 3D chunk is loading.
- Always offer **Browse portfolio without 3D** and **Exit immersive mode**.
- No forced pointer lock on page load. If pointer lock is used on desktop, request it only after a clear user gesture and ensure Escape reliably releases it.
- Do not trap keyboard focus or prevent normal browser navigation.

### Desktop

- Provide a discoverable interaction guide: WASD/arrow keys to move, mouse to look (if first-person controls are selected), click to inspect, Escape to leave immersive control.
- Prefer bounded movement and guided paths so the user cannot walk through walls, become stuck, or wander far from the projects. A combination of predefined points/click-to-move and simple first-person movement is acceptable.
- Make interactive objects keyboard reachable through a parallel DOM-based exhibit list. Do not rely only on raycasting.

### Mobile and touch

- Provide a touch-friendly movement/look control or simpler tap-to-move waypoints. Avoid assuming a keyboard exists.
- Use generously sized controls and avoid covering important artwork or text.
- Provide a low-effects mobile mode and avoid expensive real-time shadows/post-processing on weak devices.
- Test both portrait and landscape orientation. Do not make landscape orientation mandatory.

### Exhibit interaction

- Hover/focus: show the exhibit title and a clear interaction affordance.
- Click/tap/Enter: open the exhibit details in an accessible HTML panel, with close/back action and focus management.
- The panel includes actual project image(s), description, role, verified status, technologies, relevant outcome/evidence and a real next action.
- External links have useful labels and appropriate new-tab behavior where intended.
- Provide an object source/credits control in the heritage room.

### Accessibility and safety

- Keep content as semantic HTML wherever practical; the canvas is not the only source of information.
- Respect `prefers-reduced-motion`; avoid continuous camera movement or auto-rotating objects for reduced-motion users.
- No automatic sound. If ambient audio is introduced later, include an obvious mute control and captions/description where needed.
- Provide keyboard navigation, visible focus, readable contrast, accessible labels and error/loading states.
- If WebGL/canvas fails or is blocked, render a well-designed 2D version with all project content and CTA actions. No dead black canvas.

---

## 6. Technical architecture recommendation

### Rendering stack

The existing app uses React 18. React Three Fiber’s official guide explicitly pairs `@react-three/fiber@8` with React 18; version 9 pairs with React 19. The coding agent must verify peer dependencies before installing, and should not blindly install latest versions that may pull a React major mismatch.

- `three`
- `@react-three/fiber` version compatible with React 18 (normally v8)
- A compatible `@react-three/drei` version only if needed for helpers such as GLTF loading, camera controls, labels or pointer controls
- Reuse existing React, Vite, Tailwind and Lucide tools
- Do not add a state library, router, physics engine, post-processing suite or audio library unless a defined feature needs it

References:
- React Three Fiber installation/compatibility: https://r3f.docs.pmnd.rs/getting-started/installation
- Three.js GLTF loader: https://threejs.org/docs/pages/GLTFLoader
- Three.js resource disposal: https://threejs.org/manual/pages/how-to-dispose-of-objects.html

### Suggested source layout

Keep existing files until the new system is proven. Add a self-contained feature folder similar to:

```text
src/
  experience/
    MuseumExperience.jsx       # mode shell / entry and exit
    MuseumCanvas.jsx            # lazy canvas, loading and WebGL fallback boundary
    scene/
      ArrivalCourt.jsx
      GalleryRoom.jsx
      WorkshopRoom.jsx
      ExhibitPedestal.jsx
      GalleryLighting.jsx
      CollisionBounds.jsx
    controls/
      DesktopExplorerControls.jsx
      TouchExplorerControls.jsx
      useExperienceMode.js
    ui/
      ExperienceHUD.jsx
      ExhibitPanel.jsx
      ExhibitNavigation.jsx
      LoadingExperience.jsx
      MuseumCredits.jsx
    data/
      exhibits.js               # case-study and heritage exhibit metadata
      assetCredits.js           # title, author, URL, licence and modifications
    utils/
      deviceCapabilities.js
      assetLoader.js
public/
  models/
    ...                         # optimised local GLB assets
  textures/
    ...                         # optimised local textures only
  projects/
    ...                         # existing project images remain in place
  credits/
    3d-asset-credits.json
```

Adjust to the real codebase rather than creating a folder structure for its own sake. Avoid writing the entire feature into `PortfolioSiteClean.jsx`.

### Asset pipeline

- Use local, rights-cleared `.glb` assets for 3D objects. Prefer glTF/GLB because the format is designed for efficient delivery of 3D scenes and models.
- Keep a source/rights ledger for each image, model, texture, sound and font.
- Before asset use, record the exact licence, author, source URL, whether it is a scan or a reconstruction, and any modifications.
- Optimise meshes and textures before shipping. Consider Draco or Meshopt only where it materially helps and ensure the correct decoder is bundled/configured.
- Lazy-load secondary rooms and models when they become relevant. Do not place every full-resolution artefact in the initial download.
- Keep project screenshots locally served when possible; don't hotlink assets from museum/Sketchfab pages as the production strategy.
- Do not scrape collection sites wholesale or use images just because a URL is public.

### Render and performance controls

- Load the immersive bundle only on entry or when clearly needed. Keep the normal page quick and readable before 3D is activated.
- Use `Suspense` or equivalent loading UI for models. Show a useful loading state; allow exit/cancel and avoid indefinite spinners.
- Cap device pixel ratio, reduce effects on mobile, limit visible lights/shadows, and avoid real-time reflections everywhere.
- Use on-demand rendering or pause rendering while idle where compatible with camera movement and interaction. Avoid an unconditional expensive animation loop when nothing is changing.
- Dispose of unused GPU resources when scenes are removed; Three.js resources are not all automatically freed when no longer referenced.
- Detect missing WebGL/context loss and return to the HTML portfolio path gracefully.
- No auto-playing video wall, giant monolithic GLB, external runtime dependency on a single third-party asset URL, or 3D scene that blocks contact controls.

### Content architecture

Make exhibits data-driven. Separate objects and content from rendering code. A project exhibit should have fields such as:

- `id`, `title`, `category`, `shortDescription`
- `role`, `stack`, `status`, `evidence`
- `coverImage`, optional `screenshots[]`
- `repoUrl`, `liveUrl`, optional `caseStudyUrl`
- `displayPosition`, `roomId`, and relevant interaction state

A heritage exhibit should additionally include source institution, source record URL, date/attribution, culture, material, dimensions if sourced, image/model author, licence and note about uncertainty/reconstruction. Do not invent these data. Show only verified fields and omit unavailable ones.

---

## 7. Delivery plan with gates

### Phase 0 — Read-only audit

**Goal:** ensure the agent knows the current project before touching it.

1. Confirm repository path, branch, working-tree state, package manager and deployed/default branch.
2. Read `package.json`, `src/App.jsx`, `src/PortfolioSiteClean.jsx`, `src/ProjectShowcase.jsx`, `src/BlockWorld.jsx`, `src/index.css`, `index.html` and related assets.
3. Inventory all live links, forms, analytics, metadata, images, animations and current content.
4. Identify any changes already in the working tree. Never reset or overwrite them.
5. Return a concise audit and a proposed file-level diff before major code changes.

**Gate:** no files modified yet; the existing feature and risk map is accurate.

### Phase 1 — Design and content specification

**Goal:** freeze the concept before coding.

1. Produce a simple spatial map of rooms, entrances, exits and interactions.
2. Provide desktop and mobile behavior states.
3. Create a project-exhibit data schema and a heritage-object data schema.
4. Create an asset-rights ledger; identify at least 2 suitable objects and one fallback image per room.
5. Specify colours, materials, lighting, camera framing, transitions and loading UI.
6. Mark all historic reconstruction details as verified, interpreted or unknown.

**Gate:** a coherent, buildable design exists; no generic visual invention or unverified historical claims.

### Phase 2 — Small true-3D proof of concept

**Goal:** prove that the chosen stack works before building the whole museum.

1. Add compatible Three.js / React Three Fiber dependencies.
2. Build one small room or arrival court with floor, wall geometry, lighting, camera and one interactive object.
3. Implement hover/focus feedback and an accessible details panel.
4. Add a simple movement/navigation method plus Exit.
5. Add `Suspense` loading and a 2D fallback.
6. Run a production build and check the browser on desktop and mobile.

**Gate:** the scene is genuinely rendered in WebGL, interactions work, there is no major console error, and the existing portfolio still renders.

### Phase 3 — Build out the museum route

**Goal:** add spatial depth and multiple exhibits without losing usability.

1. Add the arrival threshold and rooms in the agreed sequence.
2. Add the first licensed heritage 3D model(s) and source labels.
3. Add project pedestals/exhibits using current `/projects/` images and verified project data.
4. Add workshop/process exhibits and experience/toolkit content.
5. Add contact overlay/exit with existing contact actions preserved.
6. Add discovery state/rewards only after all main tasks work.

**Gate:** a first-time visitor can enter, navigate, inspect a project, open a working project link, view credits, reach contact, and exit without getting lost.

### Phase 4 — Accessibility, performance, responsive behavior

1. Test desktop keyboard and mouse.
2. Test phone touch controls in portrait and landscape.
3. Test reduced motion, keyboard focus, screen-reader-friendly content panels, low-end mode and unsupported WebGL fallback.
4. Optimise model and texture sizes; lazy-load scenes and images.
5. Inspect resource cleanup and context loss handling.
6. Ensure project links, contact form, WhatsApp, back-to-top, metadata and analytics still work.

**Gate:** all essential information and contact actions work without 3D; immersive features degrade gracefully; no major accessibility regression.

### Phase 5 — Visual QA and release preparation

1. Run `npm run build` and the scripts actually present in `package.json`. Do not invent unavailable test commands.
2. Test the production build with a real browser or local preview, not only a successful compilation.
3. Inspect screenshots at desktop wide, laptop, tablet, phone portrait and phone landscape.
4. Check all internal/external links and each local model/image request for 404s.
5. Review attribution and rights ledger. Confirm every downloaded asset has a valid current licence.
6. Verify SEO title, description, canonical URL, Open Graph, keyboard access, reduced motion, loading, fallback, form, WhatsApp and all project actions.
7. Summarise files changed, tests run, results, known limitations and deployment risk. Do not deploy or push without explicit approval.

---

## 8. Acceptance criteria

The work is not complete simply because the canvas renders or the build passes.

### Experience

- There is a coherent, spatially navigable 3D environment with believable scale, lighting, materials and transitions.
- At least one real licensed 3D model is loaded and can be viewed/interacted with in the scene.
- Project exhibits are interactive and show actual project content, not placeholder cards or fake products.
- Entry, navigation, exhibit close/back, conventional browsing and contact/exit work.
- The reward layer reveals useful case-study/process information; no important information is locked behind discovery.

### Portfolio integrity

- Existing project URLs, contact form, WhatsApp, metadata, responsive behavior and analytics are preserved or intentionally migrated and tested.
- Existing facts and project states remain truthful.
- All major work and contact options are accessible via conventional HTML without requiring 3D.

### Cultural accuracy and rights

- Historical and object descriptions come from cited sources.
- The site distinguishes a real object, a digital reconstruction based on images, and an original speculative scene.
- No object/image/model is used without a clear rights basis.
- A visitor-accessible credits section and a project-side credits ledger exist.
- No invented sacred meanings, ritual behavior, provenance or precise historical architecture claims.

### Engineering quality

- React 18 and installed Three/Fiber dependency versions are compatible.
- No new permanent console errors, missing assets, broken external links or broken mobile menu/contact flows.
- The scene and models load progressively, are bounded/controlled, and can be exited.
- WebGL failure and reduced-motion preferences produce a usable portfolio, not a blank or frozen screen.
- The production build passes and the live preview is manually checked in a browser.

---

## 9. Copy-ready master prompt for a fresh planning AI

Copy the prompt below into a new research/planning chat. Its job is to turn this brief into a precise, phased set of instructions for OpenCode with DeepSeek V4.1 Flash. It should not improvise a generic 3D portfolio or begin coding blindly.

```text
You are a principal product designer, senior UI/UX architect, creative developer, technical lead for WebGL/Three.js, and digital-heritage researcher. You are planning an implementation for a real portfolio, not writing a generic concept article.

OWNER AND PROJECT
- Owner: Awesome Akokayo, a Nigerian full-stack software engineer and AI-integrated product builder.
- Live site: https://www.awesomeakokayo.cv/
- Public repository: https://github.com/awesomeakokayo/PORTFOLIO
- Coding environment: OpenCode.
- Coding model: DeepSeek V4.1 Flash.
- Goal: rebuild the portfolio as an immersive, interactive 3D world with a reward/discovery layer, inspired by museum experiences and specifically researched Edo/Benin art and spatial design.

READ THIS FIRST
Use the supplied “Portfolio as an Immersive 3D Museum” brief as the source of truth. Do not ignore the existing app, brand, project data, cultural-research notes, asset licences, accessibility requirements, or staged acceptance criteria. Before generating instructions, examine the live website and the current repository/default branch as far as the available tools allow. If you cannot inspect the browser-rendered page, explicitly say so and use the source code without claiming a visual screenshot audit was completed.

VERIFIED CURRENT IMPLEMENTATION (CONFIRM AGAINST CURRENT TREE)
- React 18 + Vite + Tailwind + Lucide React.
- Main files include src/App.jsx, src/PortfolioSiteClean.jsx, src/ProjectShowcase.jsx, src/BlockWorld.jsx, src/FramerMotionLayer.jsx, src/WhatsAppCTA.jsx, src/BackToTop.jsx, src/index.css and index.html.
- Existing hero “3D” illustration in BlockWorld.jsx is SVG/HTML/CSS, not real WebGL 3D.
- The inspected package.json does not currently include three or @react-three/fiber.
- Brand tokens to preserve and evolve: #080808, #0e0e0d, #f4f3ef, #b8b7b1, #9c9b94, #ff5c00, #ff7324, #9FE0C1; Ojuju display font, Inter body, Space Mono monospace.
- Preserve all genuine portfolio content, project images/links, enquiry form, WhatsApp action, responsive behavior, SEO metadata, analytics and motion/accessibility foundations unless you prove a specific migration is necessary.
- Current primary project cards in ProjectShowcase.jsx include OpenBooks, TechSkillHub, Southwest Flood Monitor and Elroi Hub. Verify their facts and URLs from the repo before using them.

CORE CREATIVE CONCEPT
Working title: “The Living Archive — The World Behind the Work.” Build a contemporary digital gallery informed by Edo/Benin material culture, historical courtyard compounds and modern West African museum design. It is an original portfolio world, not an official museum and not an exact reconstruction of a palace or MOWAA. The user's software projects remain the main attraction; the researched heritage collection is a clearly labelled, separate contextual gallery.

SUGGESTED SPATIAL SEQUENCE
1. Arrival Court/Threshold with a strong sense of place and clear “Enter the Gallery” and “Browse Portfolio Without 3D” controls.
2. A small Benin/Edo context room with two to four sourced, properly credited artefact exhibits.
3. The main Works Gallery containing actual portfolio projects as interactive exhibits/pedestals, with real project screenshots and useful HTML case-study panels.
4. Workshop/Process room showing truthful architecture, product, AI, data/API and build-process information.
5. Archive room for experience, toolkit, education and leadership.
6. Contact Studio/Exit with working email, WhatsApp and current project enquiry form.

INTERACTION VISION
- The site should feel like a place you can enter and explore, with coherent room geometry, believable scale, natural/specialised lighting, materials, shadows and navigation—not merely a 3D background behind ordinary cards.
- Users may use desktop keyboard/mouse and touch-friendly mobile controls. Prefer clear bounded navigation or guided waypoints to free roaming that can get the visitor lost.
- Hover/focus reveals a title cue; select/click/Enter opens an accessible HTML exhibit panel; visitors can close/back and continue exploring.
- Reward exploration with useful behind-the-build notes, case-study details and a modest optional discovery-progress indicator. Never lock important portfolio content or contact actions behind achievements. Do not turn culturally significant artefacts into game collectibles or points.
- No auto-playing audio, no long unskippable cinematics, no forced pointer lock at page load and no trap that prevents visitors exiting to the normal portfolio.

RESEARCH AND CULTURAL REQUIREMENTS
- Research the Kingdom of Benin/Edo people in present-day Nigeria; do not conflate them with the modern Republic of Benin.
- Read and cite the National Museums Scotland Benin court arts/history page, The Met Benin chronology, the Cambridge University Press article about reconstruction of the old palace landscape, MOWAA's official pages, Digital Benin/Manchester Museum, The Met Open Access API and Cooper Hewitt's Casting Memories project.
- Explain which architectural elements are supported by historical sources and which are interpretive design choices. Do not invent palace plans, exact room layouts, dates, iconographic meanings, names, provenance or sacred/ritual use.
- Distinguish an original artwork, a museum photograph, a 3D scan and a 3D reconstruction inspired by images.
- Review each asset's current licence and record creator, source URL, object/model name, licence URL, attribution text, and modifications. The reviewed Casting Memories pages for Ovonramwen's Stool, Head of an Oba I and Queen Mother Pendant Mask: Iyoba displayed CC BY, but verify again before use and retain attribution. Never assume every Sketchfab asset has the same licence.
- For museum images, use only images with an explicit public-domain/open-access status or permission. The Met's object page for “Plaque with Warrior and Attendants” marks its image Public Domain and the Met API exposes rights metadata. Do not assume Digital Benin images are all freely reusable.
- Be transparent about the 1897 British invasion/looting and provenance where relevant. Avoid sensationalism or gamification of sacred heritage.

TECHNICAL DIRECTION
- Preserve React 18 and Vite unless repository evidence gives a strong reason to change.
- Use a React 18-compatible version of React Three Fiber (official pairing: Fiber 8 with React 18; Fiber 9 pairs with React 19). Verify package peer dependencies before installing. Only add compatible drei helpers if needed. Avoid blind latest-version upgrades.
- Use GLB/glTF assets and local serving for stable runtime. Organise the new feature in a dedicated folder rather than putting everything into PortfolioSiteClean.jsx.
- Lazy-load the 3D scene/assets after user intent; keep the initial page quick. Use a loading state, recover from errors/context loss, and provide a 2D HTML fallback with all project links/content.
- Use semantic HTML overlays for text, controls and exhibit information. The canvas cannot be the only way to navigate or read content.
- Respect prefers-reduced-motion; cap pixel ratio; reduce shadows/post-processing on mobile; pause rendering when idle where viable; clean up unused GPU resources; avoid oversized models and blocking initial downloads.
- Do not add libraries unless tied to a specific requirement. Do not create a backend or user login just to store discovery progress.

SAFETY AND CHANGE CONTROL
- First inspect the existing working tree and current branch. Preserve user edits. Never run destructive git commands, clean resets, force pushes, deploys or production-changing actions.
- Do not change unrelated product content, logos, brand colours or links to fit a generic template.
- Do not fake live data, user numbers, testimonials, awards, project success metrics or project statuses.
- Build in phases. Each phase must end with explicit files changed, commands run, test/build results, what was visually checked and known issues. Never claim the scene works merely because the TypeScript/build step passes.

YOUR DELIVERABLE IN THIS CHAT
Do not start coding. Create an implementation-ready package that I can hand to OpenCode/DeepSeek V4.1 Flash. Include:
1. A concise research synthesis with sources and specific visual insights.
2. A source-verified current-code audit and risk register.
3. A final experience concept, spatial story, desktop/mobile interaction map and UI component inventory.
4. A technical architecture with file/folder plan and dependency/version strategy.
5. A vetted asset plan, starting with a small list of suitable objects and their licence/attribution checks; identify any asset that still needs confirmation instead of treating it as cleared.
6. A data schema for portfolio exhibits and heritage objects.
7. A phased implementation plan with gates and testable acceptance criteria.
8. Separate copy/paste OpenCode prompts for Phase 0 (read-only audit), Phase 1 (prototype design/spec only), Phase 2 (single-room real-3D proof of concept), Phase 3 (integrate exhibits and full route), Phase 4 (accessibility/performance), and Phase 5 (release QA). Make each prompt precise enough to execute without the next prompt, but do not let a single phase make a huge risky rewrite.
9. A final regression checklist for the form, WhatsApp, project links, metadata, analytics, mobile menu, reduced motion, WebGL failure, keyboard access, asset credits and production build.
10. A definition of done that prevents “it compiles” from being mistaken for “the experience works.”

Be specific. Refer to real filenames and existing project content. Prefer implementation trade-offs with reasons over abstract inspiration adjectives. Avoid generic AI design language such as “make it pop,” “premium futuristic,” “next-level,” or “use a beautiful immersive experience.” The output must tell a coding agent exactly what to inspect, what to build, what to preserve, how to test it, and when to stop and report a blocker.
```

---

## 10. First implementation prompt for OpenCode (optional direct path)

Use this only after you have reviewed the research/architecture plan. It starts the coding process conservatively.

```text
We are beginning Phase 0 only for the “Living Archive — The World Behind the Work” portfolio rebuild.

Do a read-only audit. Do not edit, install packages, delete assets, reset the working tree, switch branches, commit, push, or deploy.

Inspect the current repository, branch and working-tree state. Read package.json, src/App.jsx, src/PortfolioSiteClean.jsx, src/ProjectShowcase.jsx, src/BlockWorld.jsx, src/index.css, index.html and any relevant components/assets. Confirm the present dependencies, project entry points, project links/images, contact form, WhatsApp CTA, analytics, motion settings, metadata, and current responsive behavior. Identify any discrepancy between the current working tree and the public default branch.

Return:
1. Confirmed architecture and component tree.
2. Current content/URL and existing UX behavior inventory.
3. A list of features that must remain working.
4. Risks, likely conflicts and unknowns.
5. A proposed minimal file-level implementation plan for a true WebGL 3D museum experience using a React 18-compatible React Three Fiber release.
6. An asset-rights checklist for all proposed 3D models/images.
7. The commands and browser checks you recommend for subsequent phases.

Be explicit about anything you cannot verify. Do not start Phase 1 or change a file until the audit is reported and reviewed.
```

---

## 11. Asset and content worksheet

Create and maintain this worksheet in the repository, for example at `docs/museum-asset-register.md`.

| Asset | Role | Source | Type | Licence/rights verified? | Attribution stored? | Optimised? | Ready to publish? |
|---|---|---|---|---|---|---|---|
| Benin/Edo object model A | Heritage gallery centrepiece | Exact model page | GLB/glTF | Must re-check | Required | Pending | No until checked |
| Benin/Edo object model B | Secondary exhibit | Exact model page | GLB/glTF | Must re-check | Required | Pending | No until checked |
| Met plaque image | Context/object case | The Met object 1990.332 | Public-domain image | Yes on object page; reconfirm | Recommended | Pending | After local asset prep |
| OpenBooks cover | Portfolio exhibit | Existing `/projects/openbooks-cover.webp` | Local image | Owned/project screenshot; verify | Not applicable/record source | Check | After link check |
| TechSkillHub cover | Portfolio exhibit | Existing `/projects/tech-skill-hub.webp` | Local image | Owned/project screenshot; verify | Not applicable/record source | Check | After link check |
| Flood Monitor cover | Portfolio exhibit | Existing `/projects/flood-monitor.webp` | Local image | Owned/project screenshot; verify | Not applicable/record source | Check | After link check |
| Elroi Hub cover | Portfolio exhibit | Existing `/projects/elroi-hub.webp` | Local image | Owned/client permission; verify | Record permission | Check | After link check |

Every row should include the exact URL and a checked date. “Found online” is not a rights status. A source page being accessible does not guarantee that its image or 3D model may be republished commercially.

---

## 12. Final recommendation

Treat the first release as one excellent, navigable 3D gallery—not an attempt to recreate an entire historical city. Build one high-quality entrance and one gallery, load one properly attributed 3D object, and prove camera/navigation, object selection, exhibit details, exit, and fallback. Then add the project rooms and discovery layer. This gives the project a real path to completion and prevents a coding model from producing a huge, fragile scene that looks impressive in a screenshot but does not function as a portfolio.

The central rule for OpenCode/DeepSeek is simple: **inspect first, build one reliable slice, validate it in a real browser, and then expand.**

## Source index

1. National Museums Scotland — The court arts and history of the Kingdom of Benin: https://www.nms.ac.uk/discover-catalogue/the-court-arts-and-history-of-the-kingdom-of-benin
2. The Metropolitan Museum of Art — Benin Chronology: https://www.metmuseum.org/essays/benin-chronology
3. The Metropolitan Museum of Art — Plaque with Warrior and Attendants: https://www.metmuseum.org/art/collection/search/316393
4. Smithsonian National Museum of African Art — Benin Bronzes: Ambassadors of the Oba: https://my.si.edu/exhibitions/benin-bronzes
5. Cambridge University Press — Reconstructing the Old Palace Landscape of Benin City: https://www.cambridge.org/core/journals/history-in-africa/article/reconstructing-the-old-palace-landscape-of-benin-city-nigeria-utilizing-a-j-h-goodwins-archive-at-the-university-of-cape-town-as-a-resource-on-edo-history-and-archaeology/76ABF91F5585B625E5165CFA46CC7C17
6. MOWAA — About: https://wearemowaa.org/about-us
7. MOWAA — Opening week: https://wearemowaa.org/opening-week
8. Digital Benin: https://digitalbenin.org/
9. Manchester Museum — Digital Benin: https://www.museum.manchester.ac.uk/digital-benin
10. Cooper Hewitt — Casting Memories: https://asoa.cooperhewitt.org/castingmemories/
11. Casting Memories on Sketchfab: https://sketchfab.com/castingmemories
12. The Met Open Access API: https://metmuseum.github.io/
13. React Three Fiber — Installation and React-version pairing: https://r3f.docs.pmnd.rs/getting-started/installation
14. Three.js — GLTFLoader: https://threejs.org/docs/pages/GLTFLoader
15. Three.js — How to dispose of objects: https://threejs.org/manual/pages/how-to-dispose-of-objects.html
16. Awesome Akokayo portfolio: https://www.awesomeakokayo.cv/
17. Portfolio repository: https://github.com/awesomeakokayo/PORTFOLIO
