# CLIENT-CONVERTING PORTFOLIO WEBSITE
## Complete Strategy, Copy, and Implementation Prompt for Kimi K2.5

---

> **HOW TO USE THIS DOCUMENT**
> This document contains two things: (1) a strategic breakdown of every section of the website with the exact copy and reasoning, and (2) a ready-to-paste implementation prompt at the bottom for Kimi K2.5. Read the strategy first to understand what you're building and why. Then paste the Implementation Prompt directly into Kimi K2.5 with your IDE open.

---

# PART 1: STRATEGY & STRUCTURE

## The Core Principle: This Is a Sales Page, Not a Portfolio

Most developer portfolios fail because they are built to impress other developers — showcasing tech stacks, GitHub commits, and code complexity. Your target clients (startup founders, business owners) do not care about any of that. They care about one thing: **"Can this person solve my problem and make me money?"**

Every word, every section, every button on this website must answer that question.

---

## Page Architecture Decision: Single Page vs. Multi-Page

**Use a single long-scrolling page as the primary experience, with two supporting pages.**

**Why single page works better for conversion:**
- Visitors never get lost in navigation
- You control the exact story they read, in the exact order you want
- Every scroll is a micro-commitment that builds trust
- No decision fatigue from clicking between pages
- Mobile-first audiences (especially in emerging markets) expect long-scroll formats

**The three pages:**
1. `/` — Home (the main long-scroll sales page — where 95% of conversion happens)
2. `/work` — Case Studies (for visitors who want proof before deciding)
3. `/contact` — Contact (a clean, friction-free form)

The navigation links point to `/work` and `/contact`. Everything else lives on the homepage.

---

## The Homepage: Section-by-Section Blueprint

The homepage follows a psychological conversion sequence:
**Attention → Clarity → Desire → Trust → Action**

Every section has one job. Do not mix jobs.

---

### SECTION 1: NAVIGATION BAR
**Position:** Fixed top, full width
**Job:** Orient the visitor and make the CTA always visible

**What goes here:**
- Your name or logo (left side) — keep it simple, first name + last name or a wordmark
- Navigation links (right side): `Work` | `About` | `Contact`
- A single CTA button (far right): **"Let's Talk"** — this button should be in your brand accent color, always visible as they scroll

**What does NOT go here:**
- No social media icons in the nav (distractions)
- No "Home" link (they're already home)
- No dropdown menus
- No hamburger menu on desktop

**Design note:** The navbar should be transparent at the top and transition to a frosted-glass/solid background on scroll. The "Let's Talk" button should stand out from the nav links — different color, slightly rounded.

---

### SECTION 2: HERO
**Position:** First thing visible above the fold
**Job:** Tell the visitor exactly who you are, who you help, and what you do — in under 5 seconds

**This is the most important section on the website. If they do not understand within 5 seconds, they leave.**

**Structure:**
- Pre-headline tag (small, uppercase): `FREELANCE WEB & APP DEVELOPER`
- Main headline (large, bold, 2-3 lines max)
- Sub-headline (1-2 sentences explaining the outcome you deliver)
- Two CTA buttons side-by-side
- A social proof trust strip below the buttons
- A hero visual (right side on desktop, below on mobile)

**Copy:**

```
[Pre-headline tag]
WEB & APP DEVELOPMENT FOR GROWING BUSINESSES

[Main Headline]
I Build Websites and Apps That
Bring You Paying Clients.

[Sub-headline]
I help startup founders and business owners turn their ideas
into fast, professional digital products — built to attract customers,
not just look good.

[Button 1 — Primary, filled]  →  See My Work
[Button 2 — Secondary, outlined]  →  Let's Talk

[Trust Strip below buttons]
✦ 20+ projects delivered  ✦ Startups & SMEs  ✦ Fast turnaround  ✦ Clean, scalable code
```

**Hero Visual:**
- Do NOT use a photo of yourself here (save it for the About section)
- Use a strong visual: a mockup of a recent project on a laptop/phone, OR an abstract graphic that feels premium
- If you have a great project screenshot, use that — it immediately shows proof

**Design notes:**
- The headline should be the biggest text on the page
- "Paying Clients" or the key outcome phrase should be in the accent color or have a highlight/underline treatment
- The pre-headline tag should have a small accent bar or background pill to draw the eye
- Subtle animated gradient or geometric background — not distracting, just adds depth

---

### SECTION 3: THE PROBLEM / EMPATHY STATEMENT
**Position:** Immediately below the hero
**Job:** Make the visitor feel understood. Show that you know their pain.

**Why this works:** Most visitors arrive with frustration — bad past experiences, confusion about what they need, fear of wasting money. If you name their pain before they have to explain it, they trust you instantly.

**Structure:**
- Short intro sentence
- 3–4 pain points in a grid or column layout, each with an icon and a short description
- A closing empathy sentence

**Copy:**

```
[Section Label]
DOES THIS SOUND FAMILIAR?

[Intro]
Building a website or app for your business should be straightforward.
But for most founders and business owners, it rarely is.

[Pain Point 1 — Icon: confused face or broken page]
"I don't know where to start."
You have an idea but no clear picture of what to build, what it costs,
or who to trust. Every developer you talk to gives a different answer.

[Pain Point 2 — Icon: clock or calendar]
"My last developer disappeared mid-project."
You've been burned before — slow responses, missed deadlines,
half-finished work. You need someone you can actually rely on.

[Pain Point 3 — Icon: dollar sign or warning]
"I paid a lot and got very little."
The site looks outdated, doesn't show up on Google, and doesn't
bring in any business. It was money spent, not invested.

[Pain Point 4 — Icon: phone/laptop]
"My site looks terrible on mobile."
Over 70% of your visitors are on their phones. If your site isn't
built for mobile, you're already losing customers.

[Closing line — slightly bold or italicized]
If any of this sounds familiar, you're in the right place.
```

**Design notes:**
- This section should have a slightly different background from the hero — a soft off-white, light gray, or dark alternate — to signal a new "chapter"
- Pain point cards should not feel clinical; use warm, honest language
- Icons should be simple line icons, not emoji

---

### SECTION 4: THE SOLUTION / WHAT I DO
**Position:** Directly after the problem section
**Job:** Position yourself as the answer to every pain point above

**Structure:**
- Section label
- A clear, confident statement of what you do
- 3 core service offerings as cards
- Each card: Icon + Service name + 1-sentence description + What the client gets

**Copy:**

```
[Section Label]
WHAT I DO

[Intro headline]
Fast, Clean Digital Products
Built Around Your Business Goals.

[Intro body]
I'm not just a developer. I'm a builder who understands business.
Every project I take on is designed from the ground up to help you
attract customers, establish credibility, and grow.

---

[Service Card 1]
🖥️  Business Websites
For businesses that need a professional online presence that converts.
→ Landing pages, company websites, portfolios
→ SEO-ready structure from day one
→ Mobile-first, fast-loading, easy to update

[Service Card 2]
📱  Web Applications
For founders who need a custom tool, platform, or digital product.
→ MVPs and startup products
→ Client portals, dashboards, booking systems
→ Scalable, clean code you can hand off to any future developer

[Service Card 3]
🔧  Redesigns & Fixes
For businesses whose existing site isn't performing.
→ Speed optimization and performance fixes
→ Modern redesigns of outdated sites
→ Conversion-focused improvements

---

[CTA at bottom of section]
Not sure which one you need? [Let's Figure It Out →]
(This is a text link or soft button that opens the contact page)
```

**Design notes:**
- Cards should have a subtle border or shadow, clean hover state
- Each card should feel like a mini-proposal, not just a label
- The arrow CTA at the bottom is low-pressure — it works for people who are curious but not ready to commit

---

### SECTION 5: HOW IT WORKS (THE PROCESS)
**Position:** After services
**Job:** Eliminate fear and uncertainty. Show that working with you is easy, structured, and safe.

**Why this matters:** Fear of the unknown is the #1 reason clients don't reach out. They've been burned before. They don't know how to hire a developer. Showing your process in a simple numbered flow makes you feel professional and trustworthy.

**Structure:**
- Section label
- A short reassurance sentence
- 4 numbered steps in a horizontal timeline (desktop) / vertical stack (mobile)
- A closing CTA

**Copy:**

```
[Section Label]
HOW WE WORK TOGETHER

[Intro]
Working with me is simple, transparent, and built around your schedule.
No technical jargon. No surprises. Just clear communication and results.

[Step 1]
01. Discovery Call (Free)
We spend 30 minutes on a call — no sales pitch, no pressure.
I learn about your business, your goals, and what you actually need.
You leave with clarity, even if we don't end up working together.

[Step 2]
02. Proposal & Plan
I send you a clear, written proposal within 48 hours.
Fixed scope. Fixed price. Exact timeline. No hidden costs.
You know exactly what you're getting before you pay a single naira/dollar.

[Step 3]
03. Build & Communicate
I build your project in clear milestones and show you progress regularly.
You're never left wondering what's happening. Fast replies. Zero ghosting.

[Step 4]
04. Launch & Support
We launch your project together. I handle the technical setup.
After launch, I stay available for questions, adjustments, and updates.
You are never left alone after handoff.

---

[CTA]
[Book a Free Discovery Call →]  ← Primary button, centered
```

**Design notes:**
- The 4 steps should be connected with a visual line or arrow (subtle, not childish)
- Each step number should be in the accent color, large
- The "Free Discovery Call" CTA button here is very high converting because you've just made the process feel safe
- This section works best on a slightly dark or contrasting background

---

### SECTION 6: SOCIAL PROOF — NUMBERS
**Position:** After the process section
**Job:** Build credibility with hard numbers before showing case studies

**Structure:**
- 4–5 stats in a clean row
- Each stat: Big number + short label

**Copy (customize with your actual numbers):**

```
[Section Label — optional, or no label to let the numbers speak]

20+          3 yrs          100%          48hrs          5★
Projects    Experience    On-Time        Avg. Turnaround    Average
Delivered               Delivery       For Response         Rating
```

**Design notes:**
- Large, bold numbers in the accent color
- Labels in smaller, lighter text
- Optionally add a subtle animated count-up effect when the section scrolls into view
- This section should be full-width with a strong background — dark works very well here

---

### SECTION 7: SELECTED WORK / PORTFOLIO PREVIEW
**Position:** After social proof numbers
**Job:** Show proof. Let the work do the talking. Give enough to impress without overwhelming.

**Do NOT show everything here. Show 2–3 best projects only.**

**Structure:**
- Section label + intro
- 2–3 project cards (not a grid of 10 tiny thumbnails)
- Each card: Large image/mockup + Project name + Client type + Short outcome description + CTA
- A "View All Work" link at the bottom

**Copy:**

```
[Section Label]
SELECTED WORK

[Intro]
A few recent projects. Each one was built with a specific business
goal in mind — not just to look good, but to perform.

---

[Project Card 1]
[Large Project Image / Mockup]
Project Name: Kolade Foods E-Commerce
Client Type: Food & Beverage Business
What I built: Full e-commerce website with product catalog, cart, and payment integration
Result: Launched in 3 weeks. Client reported a 40% increase in online orders in the first month.
[View Case Study →]

[Project Card 2]
[Large Project Image / Mockup]
Project Name: LegalEdge Client Portal
Client Type: Law Firm Startup
What I built: Custom web application for client document management and case tracking
Result: Eliminated paper-based process. Saved the firm 10+ hours per week in admin work.
[View Case Study →]

[Project Card 3]
[Large Project Image / Mockup]
Project Name: FitPro Booking App
Client Type: Fitness Coach / Solopreneur
What I built: Booking and payment system with client dashboard
Result: Replaced manual WhatsApp booking. Fully automated client onboarding.
[View Case Study →]

---

[Bottom CTA]
[View All Projects →]  ← Links to /work page
```

**Design notes:**
- Each project card should be LARGE — at least half the screen width
- Show the actual product mockup prominently, not a tiny thumbnail
- The "Result" line is critical — always frame it as a business outcome, not a technical feature
- Hover effects on cards (slight lift/shadow) feel premium
- If you don't have case studies yet, use a shorter card format without the "View Case Study" link, but always include a result/outcome line

---

### SECTION 8: TESTIMONIALS
**Position:** After the portfolio
**Job:** Let clients speak for you. Third-party validation is 10x more powerful than anything you say about yourself.

**Structure:**
- Section label
- 2–3 testimonials in a clean layout (not a tiny carousel)
- Each: Quote + Client name + Client title/company + Client photo (if available)

**Copy template (use real testimonials — rewrite these with your actual ones):**

```
[Section Label]
WHAT CLIENTS SAY

---

[Testimonial 1]
"I had tried two developers before finding [Your Name]. The difference was
night and day. He actually listened to what I needed, explained everything
clearly, and delivered on time. My website has already brought in three new
clients in the first month."

— Adaeze Okonkwo, Founder — Kemi Skin Studio

---

[Testimonial 2]
"We needed an MVP built fast without wasting budget. [Your Name] gave us
a clear proposal, stuck to it, and delivered a product our investors
were genuinely impressed by. He's the first developer I've trusted
in a long time."

— Tunde Adeyemi, CEO — LogiTrack Nigeria

---

[Testimonial 3]
"Professional, communicative, and genuinely invested in making sure
the product works for our business. He didn't just build what we asked —
he made it better. We'll be working together for the long term."

— Sarah Mensah, Operations Director — PrimePath Consulting

```

**Design notes:**
- Large quotation marks as visual decorators
- Client photos (even LinkedIn-style headshots) build massive trust
- If you don't have photos, use initials in a colored circle
- Star ratings (5 stars) next to each testimonial add visual credibility
- Do NOT use a sliding carousel — it hides social proof. Show all testimonials at once.

---

### SECTION 9: ABOUT / WHO I AM
**Position:** After testimonials
**Job:** Build a human connection. Clients hire people, not portfolios.

**This section is short and personal. Do not write your CV here.**

**Structure:**
- Your photo (professional but approachable — not a stiff headshot, not a selfie)
- Short personal statement (3–4 short paragraphs)
- 3–4 bullet values or working principles
- A CTA button

**Copy template (personalize with your own story):**

```
[Section Label]
ABOUT ME

[Headline]
I Build for Business, Not for Portfolios.

[Photo: Your professional photo — warm, approachable, good lighting]

[Body — 3 short paragraphs]

My name is [Your Name]. I'm a web and application developer based in [City, Nigeria].
I've spent the last [X] years building digital products for businesses across industries —
from first-time founders launching their first product to established businesses
modernizing their operations.

I got into development because I love building things that work. Not things that look
good in a portfolio. Not things that only a developer can understand. Things that
actual people use to run their businesses, reach their customers, and make money.

When I'm not building, I'm studying how businesses grow, what makes users convert,
and how technology can remove friction from everyday business problems.
That obsession is what I bring to every project.

[Values/Principles — small cards or bulleted list]
✦ I don't take on projects I can't deliver
✦ I communicate clearly, and often
✦ I write code that can be handed off to anyone
✦ I care about your business outcome, not just my deliverable

[CTA]
[Work With Me →]
```

**Design notes:**
- Photo should be on the left, text on the right (or full-width text with photo above on mobile)
- This section should feel human and warm — lighter background, warmer tones
- Values/principles as a clean list or icon-bullets, not a wall of text

---

### SECTION 10: FAQ
**Position:** After About
**Job:** Handle objections before the visitor even has to ask them

**The FAQ is a hidden sales weapon.** Every question answered here is a reason NOT to leave the page. Target the exact fears and hesitations your clients have.

**Structure:**
- Section label
- 6–8 questions in an accordion or clean two-column layout
- Keep answers short and honest — do not write marketing copy here

**Copy:**

```
[Section Label]
FREQUENTLY ASKED QUESTIONS

---

Q: How much does it cost to build a website or app?
A: Every project is different, so I don't have a flat price list. Most business websites start
from ₦250,000 (or $300 USD) and go up depending on complexity. Web applications and custom
platforms start higher. On our first call, I'll give you a clear budget range for your specific
project — no obligation, no surprise fees later.

---

Q: How long does a project take?
A: A standard business website takes 2–4 weeks. A web application or MVP typically takes
4–10 weeks depending on scope. I'll give you an exact timeline in the proposal before we start.

---

Q: I've been burned by a developer before. How is this different?
A: I understand that fear completely. Here's what I do differently: fixed-price proposals
(no scope creep), milestone-based delivery (you see progress before final payment),
and a written agreement before any work starts. I also check in every few days — you're
never left wondering what's happening.

---

Q: Do I need to know anything technical to work with you?
A: Not at all. I've built projects with clients who couldn't define what HTML stands for,
and it works fine. My job is to handle the technical side entirely.
Your job is to tell me your business goals.

---

Q: Will I own the website after it's built?
A: Yes. 100%. You own all the code, the domain, the hosting, everything.
I hand over full control at the end of the project. No lock-in.

---

Q: Can you redesign my existing website?
A: Yes. Redesigns are a significant part of my work. If your current site is outdated,
slow, or not converting, I can audit it and give you a clear recommendation on what
to fix and what to rebuild.

---

Q: Do you offer maintenance after launch?
A: Yes. I offer optional monthly maintenance packages so you always have someone
to call when something needs to change or goes wrong.

---

Q: I'm not ready yet. Can I contact you to just ask questions?
A: Absolutely. The first call is free with zero pressure. Many people come to me months
before they're ready to start, and that's completely fine. Better to plan early
than rush it later.
```

**Design notes:**
- Accordion style (click to expand) keeps the section clean
- Alternatively, a two-column list format works well on desktop
- The last FAQ is critically important — it removes the "I'm not ready" excuse and gives hesitant visitors a low-barrier next step

---

### SECTION 11: FINAL CTA / CLOSING SECTION
**Position:** Second-to-last section, before the footer
**Job:** Make the final ask. This is your closing pitch.

**By this point, the visitor has scrolled through everything. They are warm. This section needs to be bold, confident, and make it completely obvious what to do next.**

**Structure:**
- A strong headline that speaks to the outcome
- 2–3 supporting sentences
- One large, unmissable CTA button
- A secondary "soft" option (email link or WhatsApp) for people who don't like forms

**Copy:**

```
[Background: Dark, rich color — high contrast, full width]

[Headline — large, bold]
Your Business Deserves a
Digital Product That Actually Works.

[Body]
If you've read this far, you already know you need to take action.
Whether you have a full brief or just a rough idea, the best next step
is a 30-minute conversation — free, no pressure, just clarity.

[Primary CTA Button — very large, accent color]
→  Book Your Free Discovery Call

[Secondary option below the button — smaller text]
Prefer to send a message first?
Email me at hello@[yourname].com  or  WhatsApp me →
```

**Design notes:**
- This section should be dramatically different from the sections before it — full dark background, large text, centered layout
- The CTA button should be the largest button on the entire page
- Adding a short line like "Usually responds within 24 hours" below the button reduces hesitation
- This is NOT the place for more content — just the ask

---

### SECTION 12: FOOTER
**Position:** Last section
**Job:** Provide navigation fallbacks and build a final layer of trust

**Keep it minimal. A bloated footer is a distraction.**

**Structure (two-column layout):**

Left side:
- Your name/logo
- One-line description: `Web & App Developer · [City, Nigeria]`
- Social links: LinkedIn, GitHub, Twitter (just icons, no labels)

Right side:
- Quick links: Home | Work | About | Contact
- Email address (clickable)
- Optional: WhatsApp link

Bottom bar (full width):
- `© 2025 [Your Name]. All rights reserved.`
- Optionally: `Built by [Your Name]` — a small flex

**What does NOT go in the footer:**
- No long paragraphs
- No newsletter signup (wrong audience)
- No random links to other sites
- No photo

---

## THE /WORK PAGE (Case Studies)

**Job:** Give in-depth proof to serious, research-minded clients who want to see the full story before committing.

**Structure per case study:**

```
[Project Hero Image — full width]
[Project Name]
[Client Type | Industry | Year]

THE CHALLENGE
2–3 sentences explaining the problem the client came to you with.

THE APPROACH
2–3 sentences on your strategy/methodology. What decisions did you make and why?

THE RESULT
The measurable outcome. Always lead with the business result, not the tech.

[Full project screenshots / mockups]
[Technologies used — small, subtle badges at the bottom]
[← Back to all work]   [Start a project like this →]
```

---

## THE /CONTACT PAGE

**Job:** Remove every possible reason NOT to send a message.

**Structure:**

```
[Headline]
Let's Build Something Together.

[Sub-headline]
Tell me about your project. I'll respond within 24 hours with my thoughts
and whether it's a good fit. No sales pitch. Just clarity.

[Form — keep it short, max 5 fields]
Name *
Email *
What do you need? (dropdown: Business Website / Web Application / Redesign / Not Sure Yet)
Tell me about your project (textarea — optional, but encouraged)
Budget range (optional dropdown: Under ₦200k / ₦200k–₦500k / ₦500k–₦1M / Let's discuss)

[Submit Button]
→ Send Message

[Below the form]
Prefer a call? [Book a 30-min call on Calendly →]
Or email directly: hello@[yourname].com
WhatsApp: [+234 XXX XXXX]

[Reassurance lines — small, below contact methods]
✦ Free first consultation   ✦ Response within 24 hours   ✦ No pressure, no spam
```

**Form design notes:**
- No CAPTCHA visible (use honeypot instead)
- Short = more submissions. Every extra field drops conversion by ~10%
- "What do you need?" dropdown makes the client feel understood immediately
- The budget dropdown is IMPORTANT — it pre-qualifies leads and saves both sides time

---

# PART 2: DESIGN DIRECTION

## Visual Identity

**Overall aesthetic:** Professional, confident, modern — but human. Not cold tech. Not startup-bro. Think: the design equivalent of a well-dressed freelancer who shows up on time, speaks clearly, and delivers.

**Color Palette:**
- Background (light mode): Off-white `#F8F7F4` or `#FAFAF8`
- Background (dark sections): Deep charcoal `#0F0F0F` or dark navy `#0A0F1E`
- Text primary: Near-black `#1A1A1A`
- Text secondary: Medium gray `#6B7280`
- Accent / CTA color: Choose ONE strong color — amber `#F59E0B`, electric blue `#2563EB`, or emerald `#10B981`. This is used on buttons, highlights, numbers, and section accents ONLY.
- Card backgrounds: Pure white `#FFFFFF` with soft box-shadow

**Typography:**
- Headline font: A strong display serif or geometric sans — Fraunces, Playfair Display, Cabinet Grotesk, or Neue Haas Grotesk
- Body font: A clean, readable sans-serif — DM Sans, Outfit, or Sora
- Code/tech labels: Monospaced for tech stack badges — JetBrains Mono
- Font sizes: Hero headline 64–80px / Section headlines 40–52px / Body 16–18px / Small labels 12–13px uppercase tracked

**Motion/Animation:**
- Fade-in-up on scroll for section elements (subtle, fast — 0.3s)
- Count-up animation on stat numbers when scrolled into view
- Smooth hover lift on project cards (translateY -4px + shadow increase)
- CTA button: subtle pulse or shimmer on the primary hero CTA to draw the eye
- Page transitions: smooth fade if using a SPA framework

**Spacing:**
- Generous. Padding between sections: 80–120px vertical
- Do not crowd elements. White space communicates confidence and premium quality.

---

# PART 3: CONVERSION PRINCIPLES SUMMARY

These are the rules that separate a converting website from a beautiful decoration:

1. **Lead with outcomes, not skills.** Never say "I know React and Node.js" before saying "I build apps that help your business grow." Tech is a footnote, outcome is the headline.

2. **One CTA per section.** Every section should have at most one primary action. Multiple CTAs compete with each other and cause inaction.

3. **The primary CTA button must always be visible.** The "Let's Talk" button in the navbar is fixed and follows the visitor everywhere.

4. **The word "Free" is your most powerful word.** "Free discovery call," "free consultation," "free quote" — it eliminates the first barrier to contact.

5. **Price range anchoring.** Mentioning a starting price range (even in FAQ) filters out time-wasters and builds trust with real clients. Hiding price signals insecurity.

6. **Social proof at every level.** Numbers (Section 6), work samples (Section 7), testimonials (Section 8), and FAQ reassurances. Stack the proof from multiple angles.

7. **Mobile is not an afterthought.** Over 70% of your clients will view this on a phone. Build mobile-first. Every section should be tested on a 390px viewport.

8. **Speed is credibility.** A slow portfolio is a contradiction. Target < 3 second load. Compress all images. Use lazy loading. This is especially important for clients in Nigeria where network speeds vary.

9. **The FAQ is a conversion tool.** It handles objections passively, 24/7. Never skip it.

10. **Short forms, always.** Every additional form field you add reduces submission rate. Name, email, project type. That's all you need to start.

---

---

# PART 4: IMPLEMENTATION PROMPT FOR KIMI K2.5

---

> **INSTRUCTIONS FOR USE:**
> Copy everything from the line below marked `=== BEGIN PROMPT ===` to the line marked `=== END PROMPT ===` and paste it directly to Kimi K2.5 in your IDE.

---

=== BEGIN PROMPT ===

# TASK: Build a Client-Converting Portfolio Website

You are building a complete, production-ready portfolio website for a freelance web and application developer whose primary goal is to **convert visitors into paying clients** — specifically startup founders, business owners, and entrepreneurs who need websites or apps built for their businesses.

This is NOT a creative showcase website. This is a **sales-driven professional website** that guides visitors through a conversion funnel. Every design and copy decision must serve the goal of getting the visitor to book a call or send a message.

---

## TECH STACK

- **Framework:** [Use whatever is already in the project. If starting fresh: Next.js 14+ with App Router, or plain HTML/CSS/JS if that's simpler for this project]
- **Styling:** Tailwind CSS (if available) OR plain CSS with CSS variables
- **Fonts:** Import from Google Fonts — use `Fraunces` for display/headlines and `DM Sans` for body text
- **Icons:** Lucide React (if React) or inline SVGs
- **Animations:** CSS transitions and keyframes (no heavy animation libraries needed)
- **Forms:** HTML form with a service like Formspree (https://formspree.io) for the contact form — replace the action URL with a placeholder `YOUR_FORMSPREE_ID`
- **Deployment-ready:** No build-breaking errors, all images use proper alt tags, semantic HTML throughout

---

## FILE STRUCTURE

Create the following pages/files:

```
/                   → Home page (main long-scroll sales page)
/work               → Portfolio / Case Studies page
/contact            → Contact page
```

Global components:
- `Navbar` — fixed, transparent on load, solid/blurred on scroll
- `Footer` — minimal two-column layout

---

## DESIGN SYSTEM

### Colors (define as CSS variables or Tailwind config)
```
--color-bg:         #F8F7F4       /* Off-white background */
--color-bg-dark:    #0A0F1E       /* Dark navy for contrast sections */
--color-text:       #1A1A1A       /* Primary text */
--color-text-muted: #6B7280       /* Secondary/muted text */
--color-accent:     #2563EB       /* Electric blue — primary CTA and highlights */
--color-accent-hover: #1D4ED8     /* Darker accent on hover */
--color-card:       #FFFFFF       /* Card background */
--color-border:     #E5E7EB       /* Subtle borders */
```

### Typography
```
Display / Headlines: 'Fraunces', Georgia, serif — weights 400, 700, 900
Body / UI text: 'DM Sans', sans-serif — weights 300, 400, 500, 600

Hero headline: 64px (mobile: 40px), font-weight 800, line-height 1.1
Section headline: 44px (mobile: 32px), font-weight 700, line-height 1.2
Card headline: 24px, font-weight 600
Body text: 17px, line-height 1.7, font-weight 400
Small label: 12px, uppercase, letter-spacing 0.15em, font-weight 600
```

### Spacing
```
Section vertical padding: 100px top/bottom (mobile: 60px)
Container max-width: 1200px, centered, horizontal padding 24px
Card padding: 32px
Button padding: 14px 28px
```

### Components

**Primary Button:**
```css
Background: var(--color-accent)
Text: white, font-weight 600, font-size 16px
Border-radius: 8px
Padding: 14px 28px
Hover: slightly darker background + translateY(-1px) + box-shadow
Transition: all 0.2s ease
```

**Secondary Button (outlined):**
```css
Background: transparent
Border: 2px solid var(--color-accent)
Text: var(--color-accent), font-weight 600
Same padding and border-radius as primary
Hover: background fills with accent color, text turns white
```

**Section Label (small pre-heading):**
```css
Font: DM Sans, 12px, uppercase, letter-spacing 0.15em, font-weight 600
Color: var(--color-accent)
Display as a small pill or with a short line/bar accent before it
```

---

## PAGE 1: HOME (/)

Build each section exactly in this order. Do not reorder sections.

---

### COMPONENT: NAVBAR

```
Position: fixed, top: 0, full width, z-index: 100
Default state: background transparent, text white (works over hero)
Scrolled state (after 60px scroll): background white/blur, text dark, box-shadow subtle
Height: 68px

LEFT: Logo/Name — "[Developer Name]" in Fraunces, 20px, font-weight 700
RIGHT: 
  - Nav links: "Work" | "About" | "Contact" — DM Sans, 15px, font-weight 500
  - Spacing between links: 32px
  - CTA Button: "Let's Talk" — Primary button style, smaller (padding: 10px 20px)

Mobile (< 768px):
  - Hamburger icon (3-line) opens a full-screen overlay nav
  - Show: Name, Work, About, Contact, "Let's Talk" button
  - Close on link click

Smooth scroll behavior on nav link clicks (Work, About, Contact scroll to sections with those IDs)
```

---

### SECTION 1: HERO

```
Layout: Two-column on desktop (text left 55%, visual right 45%). Single column on mobile.
Background: var(--color-bg-dark) with a subtle radial gradient or noise texture overlay
Text color: white on dark background
Minimum height: 100vh (full viewport)
Vertical center content

LEFT COLUMN:
  [Pre-heading label — accent color, small caps]
  "WEB & APP DEVELOPMENT FOR GROWING BUSINESSES"

  [Main Headline — Fraunces, 70px, weight 800, line-height 1.05]
  "I Build Websites and Apps That
  Bring You Paying Clients."
  
  → The word "Paying Clients" (or "Clients") should have a wavy underline or
    highlighted background in the accent color. Use CSS or an SVG underline.

  [Sub-headline — DM Sans, 18px, weight 400, color: rgba(255,255,255,0.75), max-width 520px]
  "I help startup founders and business owners turn their ideas into fast,
  professional digital products — built to attract customers, not just look good."

  [CTA Row — margin-top: 40px]
  [Primary Button: "See My Work"] [gap: 16px] [Secondary Button (outlined white): "Let's Talk"]
  
  → Secondary button: border white, text white. Hover: white bg, dark text.

  [Trust Strip — margin-top: 48px, flex row, gap 24px, flex-wrap]
  Each item: small accent-colored dot + text in muted white/gray
  "✦ 20+ projects delivered"
  "✦ Startups & SMEs"  
  "✦ Fast turnaround"
  "✦ Clean, scalable code"
  Font: 14px, DM Sans

RIGHT COLUMN:
  A large device mockup (laptop or phone) showing a project screenshot.
  Use a placeholder image with a gradient placeholder: 
  → Create a stylized rectangle with subtle gradient and a browser chrome frame drawn in CSS,
    or use a <div> styled to look like a floating device card with inner content placeholder.
  Slight floating animation (CSS keyframe: translate Y -8px to 8px, 4s ease infinite).

Scroll indicator at bottom center:
  A small animated arrow pointing down with "Scroll to explore" text, 12px, opacity 0.5
```

---

### SECTION 2: PROBLEM / EMPATHY

```
Layout: Single column, centered text intro, then 2x2 grid of pain point cards
Background: var(--color-bg)
Section label: "DOES THIS SOUND FAMILIAR?"

Intro headline (Fraunces, 40px, centered):
"Building a Website for Your Business
Should Be Simple. It Rarely Is."

Intro body (DM Sans, 17px, centered, max-width 600px, margin 0 auto):
"Most business owners come to me after a frustrating experience.
Here are the four problems I hear most often."

Pain Point Cards Grid (2 columns on desktop, 1 on mobile, gap: 24px, margin-top: 56px):
Each card: white background, border: 1px solid var(--color-border), border-radius: 12px,
padding: 32px, box-shadow: 0 2px 12px rgba(0,0,0,0.06)

  Card 1:
    Icon: A simple SVG — confused face or question mark (24px, accent color)
    Heading (20px, Fraunces, weight 700): "I don't know where to start."
    Body (15px, DM Sans, color muted): "You have an idea but no clear picture of what
    to build, what it costs, or who to trust. Every developer gives a different answer."

  Card 2:
    Icon: Clock SVG
    Heading: "My last developer disappeared."
    Body: "Slow responses, missed deadlines, half-finished work. You need someone
    you can actually rely on from start to finish."

  Card 3:
    Icon: Dollar/money SVG
    Heading: "I paid a lot and got very little."
    Body: "The site looks outdated, doesn't rank on Google, and doesn't bring in business.
    It was money spent — not invested."

  Card 4:
    Icon: Mobile phone SVG
    Heading: "My site looks terrible on mobile."
    Body: "Over 70% of your visitors are on phones. If your site isn't built mobile-first,
    you're already losing customers every single day."

Closing line below grid (centered, italic, 17px, Fraunces weight 400):
"If any of this sounds familiar, you're in the right place."
```

---

### SECTION 3: SERVICES / WHAT I DO

```
Background: White or very light gray (#F3F4F6)
Section label: "WHAT I DO"

Headline (Fraunces, 44px, centered):
"Fast, Clean Digital Products
Built Around Your Business Goals."

Body (DM Sans, 17px, centered, max-width 580px):
"Every project I take on is designed from the ground up to help you attract customers,
establish credibility, and grow your business online."

Service Cards (3 columns on desktop, 1 column on mobile, margin-top: 60px):
Each card: white bg, padding 36px, border-radius 16px, soft shadow,
border-top: 4px solid var(--color-accent), hover: translateY(-4px) transition 0.2s

  Card 1:
    Icon: Monitor/screen SVG (32px, accent color)
    Name (Fraunces, 22px, weight 700): "Business Websites"
    Description (15px, DM Sans): "For businesses that need a professional online presence
    that works around the clock to attract and convert customers."
    Feature list (14px, DM Sans, muted, line-height 2):
    → Landing pages & company websites
    → SEO-ready from day one
    → Mobile-first, fast-loading

  Card 2:
    Icon: Code/brackets SVG
    Name: "Web Applications"
    Description: "For founders who need a custom platform, tool, or digital product built to scale."
    Features:
    → MVPs and startup products
    → Portals, dashboards, booking systems
    → Clean code you can build on later

  Card 3:
    Icon: Wrench/settings SVG
    Name: "Redesigns & Fixes"
    Description: "For businesses whose existing site isn't performing or looks outdated."
    Features:
    → Speed and performance fixes
    → Modern redesigns
    → Conversion-focused improvements

Below cards (centered):
Soft text CTA: "Not sure which one you need?" 
Link: "Let's figure it out together →" (links to #contact or /contact)
Font: 16px, DM Sans, accent color link
```

---

### SECTION 4: PROCESS / HOW WE WORK

```
Background: var(--color-bg-dark) — dark section for visual contrast
Text: white
Section label: "HOW WE WORK TOGETHER" (accent color label)

Headline (Fraunces, 44px, white):
"Working With Me Is Simple,
Transparent, and Built Around You."

Sub-line (DM Sans, 17px, rgba white 0.7):
"No technical jargon. No surprises. Just clear communication and results."

Process Steps (4 steps, horizontal on desktop / vertical on mobile):
Connect steps with a horizontal dashed or dotted line on desktop.

Step layout: number (large, accent color, Fraunces 72px, weight 900, opacity 0.15 behind the card) + 
step card (white background, 24px border-radius, padding 28px)

  Step 1:
    Number label: "01"
    Title (Fraunces, 20px): "Discovery Call"
    Badge: small green pill "FREE" next to the title
    Body (14px, DM Sans, muted dark): "30 minutes, no pressure. I learn about your business
    and goals. You leave with clarity — even if we don't work together."

  Step 2:
    Number: "02"
    Title: "Proposal & Plan"
    Body: "You receive a written proposal within 48 hours. Fixed scope, fixed price,
    exact timeline. No hidden costs. Ever."

  Step 3:
    Number: "03"
    Title: "Build & Communicate"
    Body: "I build in clear milestones and update you regularly. Fast replies.
    Zero ghosting. You always know what's happening."

  Step 4:
    Number: "04"
    Title: "Launch & Support"
    Body: "We launch together. I handle the technical setup. After launch, I stay
    available for questions, fixes, and updates."

CTA below steps (centered, margin-top: 56px):
Primary button (white background, dark text, accent border on hover):
"Book a Free Discovery Call →"
Small text below button: "Usually responds within 24 hours"
Font: 13px, DM Sans, opacity 0.6
```

---

### SECTION 5: STATS / SOCIAL PROOF NUMBERS

```
Background: var(--color-accent) — solid accent color, full width
Text: white
Layout: 5 stats in a single centered row (wrap on mobile: 2-3 per row)

Each stat:
  Number (Fraunces, 64px, weight 900, white): Add data-target attribute for count-up JS
  Label (DM Sans, 14px, uppercase, letter-spacing 0.1em, rgba white 0.75)

Stats:
  "20+"    → "Projects Delivered"
  "3"      → "Years Experience"
  "100%"   → "On-Time Delivery"  
  "48hrs"  → "Average Response"
  "5★"     → "Client Rating"

Implement a simple count-up animation using Intersection Observer:
When the section enters the viewport, animate numbers from 0 to their target value
over 1.5 seconds using easeOutCubic easing.
For numbers with "+" or "★" suffix, append the suffix after counting completes.
```

---

### SECTION 6: PORTFOLIO PREVIEW

```
Background: var(--color-bg)
Section label: "SELECTED WORK"

Headline (Fraunces, 44px):
"Projects Built to Perform."

Body (DM Sans, 17px, centered, max-width 560px):
"A few recent projects. Each one was built with a specific business goal in mind —
not just to look good, but to work."

Project Cards (2 columns on desktop, 1 column on mobile, gap: 32px, margin-top: 60px):
Each card: white bg, border-radius: 20px, overflow: hidden, box-shadow subtle

Card structure:
  TOP: Image area (aspect-ratio 16/9, background: gradient placeholder in accent shades)
       → Use a <div> with a styled inner content showing browser chrome and placeholder blocks
       → OR: <img src="./images/project-1.jpg" alt="[Project Name] preview">
       → Add a hover overlay with "View Case Study" button that appears on hover

  BOTTOM: Content padding 28px
    Category pill (small, accent bg, white text, 11px uppercase): "E-COMMERCE"
    Project name (Fraunces, 24px, weight 700): "Kolade Foods"
    Client type (DM Sans, 14px, muted): "Food & Beverage · 2024"
    Result line (DM Sans, 15px, weight 600, color: #16a34a — green):
      → "Result: 40% increase in online orders in month one."
    CTA link (14px, accent color, with arrow): "View Case Study →"

Show 2 project cards. 
(Placeholder content is fine — mark with TODO comments for easy replacement)

Below cards (centered):
Link button (outlined): "View All Projects →" (links to /work)
```

---

### SECTION 7: TESTIMONIALS

```
Background: White
Section label: "WHAT CLIENTS SAY"

Headline (Fraunces, 44px, centered):
"Don't Take My Word For It."

Testimonial layout: 3 cards in a row (desktop) / 1 column (mobile)

Each testimonial card:
  Background: var(--color-bg) (#F8F7F4)
  Border-radius: 16px
  Padding: 36px

  Star rating: ★★★★★ in accent color (16px, top of card)
  
  Quote (Fraunces, 17px, weight 400, line-height 1.7, italic, margin: 20px 0):
  Open with a large decorative quotation mark " in accent color, opacity 0.2, absolute positioned

  Example quotes (mark with TODO for replacement):
  Card 1: "I had tried two developers before. [Your Name] actually listened, explained clearly,
  and delivered on time. My website brought in three new clients in the first month."
  — Adaeze Okonkwo, Founder — Kemi Skin Studio
  
  Card 2: "We needed an MVP built fast. He gave us a clear proposal, stuck to it, and delivered
  a product our investors were genuinely impressed by."
  — Tunde Adeyemi, CEO — LogiTrack

  Card 3: "Professional, communicative, and genuinely invested in our business outcome.
  He didn't just build what we asked — he made it better."
  — Sarah Mensah, Operations Director — PrimePath

  Client info at bottom:
    Avatar: circular div, 44px, with initials (colored background) OR <img>
    Name (DM Sans, 15px, weight 600)
    Title & Company (DM Sans, 13px, muted)
```

---

### SECTION 8: ABOUT (id="about")

```
Background: var(--color-bg)
Section label: "ABOUT ME"

Layout: Two-column — Left: photo, Right: text (reverse on mobile: text first)

LEFT (40%): 
  Developer photo: circular or rounded-square (border-radius: 24px), 
  max-width: 400px, with a subtle border or shadow
  Placeholder: a styled div with gradient background and initials, if no photo provided

RIGHT (60%):
  Headline (Fraunces, 40px, weight 700):
  "I Build for Business, Not for Portfolios."

  Body paragraphs (DM Sans, 16px, line-height 1.8, gap between paragraphs: 20px):
  [Paragraph 1 — Introduction]
  "My name is [Your Name]. I'm a web and application developer based in [City, Nigeria].
  I've spent the last [X] years building digital products for businesses across
  industries — from first-time founders to established businesses modernizing operations."

  [Paragraph 2 — Philosophy]
  "I got into development because I love building things that work. Not things that look
  good in a portfolio — things that actual people use to run their businesses,
  reach their customers, and make money."

  [Paragraph 3 — Personal]
  "When I'm not building, I'm studying how businesses grow, what makes users convert,
  and how technology removes friction from everyday business problems.
  That obsession is what I bring to every project."

  Working principles (margin-top: 32px):
  Grid: 2 columns, gap 12px
  Each item: checkmark icon (accent) + 14px DM Sans text
  ✓ I don't take on work I can't deliver
  ✓ I communicate clearly, and often
  ✓ I write code that any developer can maintain
  ✓ Your business outcome > my deliverable

  CTA (margin-top: 36px):
  Primary button: "Work With Me →"
```

---

### SECTION 9: FAQ

```
Background: White
Section label: "FAQ"

Headline (Fraunces, 44px, centered):
"Common Questions, Honest Answers."

Layout: Single column, max-width 720px, centered

Implement as an ACCORDION:
- Each FAQ item: border-bottom: 1px solid var(--color-border)
- Question row: flex, space-between, padding: 20px 0, cursor pointer
- Question text: DM Sans, 17px, weight 600
- Arrow icon: rotates 180deg on open, smooth CSS transition
- Answer: DM Sans, 16px, line-height 1.7, muted color, padding: 0 0 20px 0
- Animate height from 0 to auto using max-height CSS transition

FAQ Items:

  Q1: "How much does it cost to build a website or app?"
  A: "Every project is different. Most business websites start from ₦250,000 and go up
  depending on complexity. Web applications start higher. On our first call, I'll give
  you a clear budget range — no obligation, no hidden fees."

  Q2: "How long does a typical project take?"
  A: "A standard business website takes 2–4 weeks. A web application typically takes
  4–10 weeks. I'll give you an exact timeline in the proposal before we start."

  Q3: "I've been burned by developers before. How is this different?"
  A: "I use fixed-price proposals, milestone-based delivery (you see progress before
  final payment), and a written agreement before any work starts.
  I also check in every few days — you're never left wondering."

  Q4: "Do I need technical knowledge to work with you?"
  A: "Not at all. My job is to handle the technical side entirely.
  Your job is to tell me your business goals."

  Q5: "Will I own the website after it's built?"
  A: "Yes, 100%. You own all the code, the domain, the hosting — everything.
  No lock-in, no ongoing fees unless you choose my maintenance package."

  Q6: "Can you redesign my existing website?"
  A: "Yes. Redesigns are a major part of my work. If your site is outdated, slow, or
  not converting visitors, I can audit it and recommend what to fix and what to rebuild."

  Q7: "Do you offer support after the website launches?"
  A: "Yes. I offer optional monthly maintenance packages so you always have
  someone to call when something needs to change."

  Q8: "I'm not ready to start yet. Can I still reach out?"
  A: "Absolutely. The first call is free with zero pressure. Many clients come to me
  months before they're ready — and that's completely fine. Better to plan early."
```

---

### SECTION 10: FINAL CTA

```
Background: var(--color-bg-dark) — dark navy
Layout: Centered, full width, padding 120px vertical

Headline (Fraunces, 56px, white, centered, max-width 700px, margin: 0 auto):
"Your Business Deserves a Digital Product That Actually Works."

Body (DM Sans, 18px, rgba white 0.7, centered, max-width 540px, margin: 24px auto 0):
"Whether you have a full brief or just a rough idea, the best next step is a
30-minute conversation — free, no pressure, just clarity."

CTA Button (margin-top: 48px, centered):
Very large primary button (padding: 18px 48px, font-size: 18px):
"→ Book Your Free Discovery Call"

Below button (DM Sans, 13px, rgba white 0.5, centered, margin-top: 12px):
"Usually responds within 24 hours"

Secondary options (margin-top: 36px, centered, DM Sans, 15px, rgba white 0.6):
"Prefer to send a message first?"  
[Link: "Email →"] | [gap] | [Link: "WhatsApp →"]
Links: accent color, no underline, hover underline
```

---

### COMPONENT: FOOTER

```
Background: #050A14 (very dark, near-black)
Padding: 60px top, 32px bottom
Border-top: 1px solid rgba(255,255,255,0.08)

Two-column layout on desktop, stacked on mobile:

LEFT:
  Name/Logo: "[Developer Name]" Fraunces, 20px, white
  Tagline: "Web & App Developer · Lagos, Nigeria" DM Sans, 14px, rgba white 0.5
  Social icons row (margin-top: 20px): LinkedIn, GitHub, Twitter/X — 20px each, rgba white 0.4, hover white
  (Use simple SVG icons or lucide-react)

RIGHT:
  Quick links (DM Sans, 14px, rgba white 0.6, hover white):
  "Home" | "Work" | "About" | "Contact"
  (vertical list, gap 12px)
  
  Email (margin-top: 24px): DM Sans, 14px, accent color, hover underline
  "hello@[yourname].com"

Bottom bar (margin-top: 48px, padding-top: 24px, border-top: 1px solid rgba white 0.06):
Flex, space-between
Left: "© 2025 [Your Name]. All rights reserved." DM Sans, 13px, rgba white 0.3
Right: "Built with care →" DM Sans, 13px, rgba white 0.3
```

---

## PAGE 2: /work (Case Studies)

```
Layout: Standard page with navbar and footer
Hero: Simple — white background, headline "My Work", sub-line "Selected projects.
Each built with a specific business goal."

Projects grid (2 columns desktop, 1 mobile):
Each project card:
  Large image (16/9 ratio)
  Category tag
  Project name (Fraunces, 22px)
  Short description (2 lines)
  Result line (green, bold)
  "View Case Study →" link

For case study detail pages (optional — use if you have time):
Route: /work/[slug]
Include: Hero image, Challenge, Approach, Result, Screenshots, Tech stack, 
Back button, "Start a similar project →" CTA button at the bottom

Placeholder: Create 3 placeholder project entries with TODO comments for replacement.
```

---

## PAGE 3: /contact

```
Layout: Split layout — Left: context/reasons to reach out, Right: form
Background: White

LEFT COLUMN (40%):
  Headline (Fraunces, 36px): "Let's Build Something Together."
  Body (DM Sans, 16px, muted): "Tell me about your project. I'll respond within 24 hours
  with my initial thoughts. No sales pitch, just clarity."
  
  Reassurance list (margin-top: 32px):
  ✓ Free first consultation
  ✓ Response within 24 hours  
  ✓ No pressure, no spam
  ✓ Fixed pricing, no surprises

  Contact alternatives (margin-top: 40px):
  Email: hello@[yourname].com
  WhatsApp: +234 XXX XXXX
  Book directly: [Calendly link] — "Book a 30-min call"

RIGHT COLUMN (60%):
  Form (no <form> wrapping div if in React, use form with action for plain HTML):
  Action: "https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST"
  
  Fields (each: label above, input/select below, DM Sans):
    Name * (text input)
    Email * (email input)
    What do you need? * (select dropdown):
      → Please select...
      → Business Website
      → Web Application
      → Redesign / Fix Existing Site
      → Not Sure Yet — Let's Talk
    Tell me about your project (textarea, 4 rows, optional)
    Budget range (select, optional):
      → Prefer not to say
      → Under ₦200,000
      → ₦200,000 – ₦500,000
      → ₦500,000 – ₦1,000,000
      → Above ₦1,000,000 / Let's discuss

  Submit button (full width, primary style): "Send Message →"
  
  Below button (DM Sans, 13px, centered, muted):
  "I read every message personally and respond within 24 hours."

Form styling:
  Input: border: 1.5px solid var(--color-border), border-radius: 8px, padding: 12px 16px
  Focus: border-color: var(--color-accent), box-shadow: 0 0 0 3px rgba(37,99,235,0.1)
  Label: DM Sans, 14px, weight 600, margin-bottom: 6px
  Gap between fields: 20px
```

---

## SCROLL ANIMATIONS

Implement a simple, lightweight scroll reveal for all major sections:
```javascript
// Add this to main JS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Apply to elements with class "reveal"
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```
Apply `.reveal` class to: section headlines, service cards, project cards, testimonial cards, process steps, stat numbers.

Add staggered delays for grids (e.g., card-1: delay 0s, card-2: delay 0.1s, card-3: delay 0.2s).

---

## MOBILE RESPONSIVENESS

Every section must be fully responsive. Key breakpoints:
- Desktop: 1200px+
- Tablet: 768px–1199px
- Mobile: < 768px

Mobile-specific rules:
- Hero: Stack columns, reduce headline to 40px, reduce sub-line to 16px
- Process steps: Vertical stack, remove horizontal connecting line
- Stats row: 2-3 per row, wrap
- Service cards: Single column
- Project cards: Single column
- Testimonials: Single column (show only 2 on mobile)
- About: Photo first, then text
- Contact: Stack left and right columns (form below context)

---

## PERFORMANCE REQUIREMENTS

- All images: Use WebP format, add width and height attributes to prevent layout shift
- Lazy load all images below the fold: `loading="lazy"`
- No render-blocking scripts — all JS at bottom of body or with `defer`
- Google Fonts: Preload the two fonts only (`Fraunces:wght@400;700;900` and `DM+Sans:wght@400;500;600`)
- Target Lighthouse score: 90+ performance, 100 accessibility

---

## PLACEHOLDER CONTENT CONVENTIONS

Use these exact placeholder conventions so they're easy to find and replace:
- `[Your Name]` → Developer's full name
- `[City, Nigeria]` → Developer's city
- `[X] years` → Years of experience
- `hello@[yourname].com` → Developer's email
- `+234 XXX XXXX` → WhatsApp number
- `YOUR_FORMSPREE_ID` → Formspree form ID
- `[Calendly link]` → Calendly booking URL
- `TODO: Replace with actual project screenshot` → Image placeholders
- `TODO: Replace with actual testimonial` → Testimonial placeholders

---

## QUALITY CHECKLIST

Before finishing, verify:
- [ ] "Let's Talk" button in navbar is always visible and clickable
- [ ] All CTA buttons link to the correct destination (contact or #contact)
- [ ] FAQ accordion works on all screen sizes
- [ ] Stats count-up animation triggers on scroll
- [ ] Contact form has proper validation (required fields)
- [ ] All section IDs match navbar smooth-scroll links: `#work`, `#about`, `#contact`
- [ ] Footer social icons link to `#` (placeholders) with `target="_blank"`
- [ ] Mobile hamburger menu works and closes properly
- [ ] No horizontal scroll on mobile at any breakpoint
- [ ] All fonts load correctly (no FOUT flash)
- [ ] Color contrast ratio meets WCAG AA on all text

=== END PROMPT ===

---

*Document created as a complete strategy guide and implementation brief.*
*Customize all [bracketed placeholders] before handing to the developer or AI tool.*