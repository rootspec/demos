# RootSpec Marketing Site

## What We're Building

A marketing website for RootSpec — a specification language for software where philosophy guides implementation, never vice versa.

The site explains what RootSpec is, why it exists, and how to start using it. It includes interactive features that let visitors experience the methodology firsthand.

## The Product Being Marketed

RootSpec implements purpose-aligned declarative specification. You define what your product is and why it exists, then derive everything else in a strict hierarchy:

1. **Philosophy** — WHY and WHAT EXPERIENCE (mission, design pillars)
2. **Truths** — WHAT strategy (trade-offs, commitments, success criteria)
3. **Interactions** — HOW users and product interact (flows, patterns, feedback)
4. **Systems** — HOW it's built (architecture, boundaries, data)
5. **Implementation** — Testable user stories and tuning parameters

Each level can only reference higher levels, never lower. This prevents circular dependencies and keeps philosophy stable when implementation changes.

### Key Messages

- "When code and specs can be generated trivially, the real value is validation and proof."
- AI has knowledge but not wisdom. Humans supply philosophy; AI executes implementation. The spec bridges the gap.
- Four skills drive all workflows: `/rs-init`, `/rs-spec`, `/rs-impl`, `/rs-validate`
- The spec is declarative, executable, and acts as a validation gate.
- Good for complex products, long-lived systems, team collaboration, AI-assisted development.

### Differentiators

- Not a code generator — extracts and validates human intent
- Not a gatekeeper — identifies problems, doesn't block work
- Natural language specification (not config/YAML-first)
- Works with or without AI, any tooling, any team

### Author's Notes

```
This page explains why I built Rootspec.

Most thinking about AI in software development starts from our existing human roles and workflows and asks how to fit AI into them. Let's skip that, and imagine we are inventing a new process. The central problem of software development, with or without AI, is _capturing human intent_ and _generating something that satisfies it_. Imagine a replicator from Star Trek.

How do we know we've satisfied the original intent? If we're replicating a cup of coffee, we can taste it, and 95% good is probably good enough to drink. But if we're replicating a bicycle, 95% isn't good enough, and getting the last 5% wrong could be catastrophic. So how do we know we've made a 100% bicycle?

Validation. Maybe we get a bicycle expert to say, "yep, that's a bike." Or, better, we get the same person to define what a bike is (the intent) and then confirm we've built a bike that matches their definition.

In software, we almost never use the same person to author intent and validate the result. Solo developers aside, most applications are too complex for that: they require multiple people, often multiple teams, each performing specialized functions across the development lifecycle. By the time validation happens, it's far removed from the original intent. It has drifted.

And it's not just validation that drifts. Every intermediate step drifts too, independently. No wonder we pile on so much overhead, paperwork, and process trying to keep everyone aligned. We still ship bugs constantly, and every deploy is a risk.

Drift also isn't simply a flaw in how intent gets interpreted downstream. The intent author holds internal assumptions and biases, as everyone does. These implicit sources of intent—unstated expectations, unconscious priorities—trigger mid-cycle pivots, re-scopes, and quiet disconnects with end users. The drift starts at the source.

So how do we design a development lifecycle that catches drift, or at least minimizes it? By driving development with something other than the pure vibes of the engineer writing the code.

We've been here before, with test-driven development, behavior-driven development, spec-driven development. These all use constraints as guardrails to keep intent intact, or to update the source when the work legitimately pivots. Nearly every organization that's serious about quality has tried one of them. But they don't stick. Why?

Because they're expensive and tedious in every way that matters:

* They transform a few pages of specification into a book of pedantic, finely-tipped instructions.
* They force a meticulous back-and-forth between dev and QA.
* For engineers, they turn the pleasure of problem-solving into the rote assembly of brick-like functions.

All is not lost, however. LLMs love doing these things.

But throwing AI at TDD or BDD just automates the tedium without fixing the underlying problem. The drift is still there; it just happens faster.

RootSpec starts somewhere different. It treats the specification itself as the source of truth across the entire development lifecycle, and uses AI to keep everything downstream—user stories, tests, implementation—in lockstep with it. The spec and codebase become one, much like a TDD die-hard might argue that code doesn't exist without tests that prove it works as intended.

Validation is everything.

In RootSpec, the spec validates the code directly, all but eliminating drift. AI generates user stories (all reviewable) from the higher-level specification and keeps them in sync as either side evolves. During implementation, those user stories are wired into the platform's end-to-end testing tool and run as the actual tests. The story is the test.

The spec itself begins as a prompt or seed and grows through an interview phase: AI asks the kinds of questions a thoughtful collaborator would, surfacing the why of the product before any of the what or how. Users who prefer speed can skip the interview and let the AI infer from existing context (a README, a conversation, a rough doc) though the interview produces stronger foundations.

The result is a hardened spec: one that has been pressure-tested against human scrutiny, mid-course pivots, emerging lessons, gray areas, and edge cases. Implementation is then handled entirely by AI agents whose only job is to make the user stories pass. This is the most ambitious claim in the methodology, and I'll defend it elsewhere, but the short version is that once the spec is hardened and validation is airtight, the act of writing code becomes the least interesting problem in the room.

Validation gates the entire workflow. Only verified solutions pass through. Risk plummets, and the principal concern of software development shifts from "did we build the right thing correctly?" to something much simpler: lifecycle cost.

Generating code is now trivial, and _proof_ matters more than ever. Validation is no longer just a phase. Getting better at generation and verifying it is *the whole job*. RootSpec is an answer to that shift: a way to carry intent, intact, from the first question to the last test.
```

## Site Sections

### Meta Banner

A persistent, visible banner (top of page or below the hero) that explains this site is itself a RootSpec demo. Something like:

> "This site was generated from a ~100-line product description using the RootSpec pipeline — no manual code, no design mockups. The spec, the code, and the tests were all produced by running four commands. [View the spec →] [View the seed →]"

Link to the SEED.md and spec files in the GitHub repo at https://github.com/rootspec/demos/tree/main/greenfield. These must be absolute GitHub URLs, not relative paths — relative links will break the static build's prerenderer. This is critical — visitors must understand that any rough edges are the result of minimal human guidance, not carelessness. The banner should be honest and direct: this is what you get from a sparse seed with no iteration.

### Hero

Tagline and one-sentence explanation. Immediate visual clarity about what this is.

### The Problem

Why existing approaches fail: spec drift, philosophy-implementation gap, unreliable AI output without validation, Google Docs specs nobody reads.

### How It Works

Visual walkthrough of the four skills (init → spec → impl → validate) with clear before/after.

### Author's Notes

A dedicated section containing the **full** text of the "Author's Notes" code block above, reproduced **verbatim**. Do not summarize, paraphrase, condense, reorder, or stylistically rewrite any part of it. Preserve every paragraph break and any inline emphasis exactly as written. Treat the code-block content as a literal string to embed, not as guidance to interpret. Introduce the section with a heading (e.g. "Why I built RootSpec" or "From the author") and then render the prose as-is. This is the author's voice speaking directly to visitors; the site's job is to carry that voice through unaltered.

### Interactive: Hierarchy Explorer

An interactive visualization of the five levels. Users click a level to expand it and see example content. Visual connections show which levels each can reference (arrows flow upward only). Hovering a level highlights its allowed references. This is the core concept of RootSpec made tangible.

### Interactive: "Spec Your Idea" Wizard

A mini-wizard where the user enters a one-line product idea and walks through three steps:

1. What's the mission? (select from templates or write their own)
2. What should users feel? (pick 3-5 design pillars from suggestions)
3. Describe one key interaction

The output is a skeleton spec showing how their input maps to L1-L3. Client-side only, no AI — structured templates. Shows the methodology is approachable, not academic.

### Interactive: Before/After Comparison

Side-by-side view with a slider or toggle:

- **Without spec:** vague requirements doc, ambiguous stories, untraceable decisions
- **With RootSpec:** structured hierarchy, testable stories, every feature traces to a design pillar

Real content in both panels — not lorem ipsum.

### Version Badge

The current RootSpec version should be displayed prominently — in the hero section and/or site header. Read the version from `.rootspec.json` (the `version` field) at build or render time. This is a demo of the framework, so the version it was built with is a key detail.

### Open Source CTA

Link to the framework GitHub repo at https://github.com/rootspec/rootspec — getting started instructions, community links.

## Deployment

This site deploys to GitHub Pages at `/demos/greenfield/`. Use that as the canonical base path. Configure the framework's base so all asset URLs (CSS, JS, images) and internal links resolve under that subpath. The base path must be the same value in dev, preview, and production builds — do not switch it based on `NODE_ENV` or similar. Cypress runs against the dev server and expects to reach the app at the configured subpath.

## Interactive & Visual Requirements

- **Dark/light theme** with system preference detection and manual toggle
- **Smooth animations** on section transitions and interactive elements
- **Responsive** — all interactive features must work on mobile (touch-friendly)
- **Keyboard accessible** — hierarchy explorer and wizard navigable via keyboard
- **No external API calls** — everything runs client-side
- **Simple RootSpec diagram** — if possible, create an image that depicts the RootSpec methodology in a simple way: a spec surrounding the development cycle and only allowing valid solutions to pass through. If an image is not possible, create a diagram using SVG.

## Audience

Developers and technical leads who:

- Have been burned by scope drift or unclear requirements
- Are using AI tools (Copilot, Claude, etc.) and want more reliable output
- Lead teams where "the spec" is a Google Doc nobody reads
- Build complex products that need to stay coherent over time

## Tone

Confident but not preachy. Technical but accessible. Like a thoughtful developer explaining a methodology they believe in — not a corporate product page. No buzzwords. Show, don't tell.

## Aesthetic Direction

The site's visual quality is part of the argument. A polished, considered aesthetic signals "this methodology produces real results." A generic AI-generated dev-site look (dark background, shadcn defaults, gradient blobs, oversized hero text) actively undermines the thesis. Avoid it.

**Direction:** Editorial-meets-technical. Think a long-form essay site (like a thoughtful Substack or a literary magazine) crossed with documentation (like the better Stripe, Linear, or Vercel docs). Not a SaaS landing page. Not a startup pitch site. The reader should feel they've arrived at a _place where someone thinks_, not a _place where someone sells_.

**Specifics:**

- **Typography is the primary design element.** Use a high-quality serif for body copy (e.g., Source Serif, Newsreader, Charter, or similar) to signal essay-quality writing. Pair with a clean sans-serif (e.g., Inter, Söhne, IBM Plex Sans) for UI elements, navigation, and code labels. Use a monospace face (e.g., JetBrains Mono, IBM Plex Mono, Berkeley Mono) for code, command examples, and the four skill names (`/rs-init`, etc.).
- **Generous whitespace.** The page should breathe. Long line lengths for prose are fine — readers expect them in editorial contexts.
- **Restrained palette.** Two or three colors maximum, plus neutrals. One accent color used sparingly for emphasis and interactive states. Avoid gradients, glassmorphism, glows, and other decorative effects. The diagram and interactive elements provide visual interest; the page chrome should not compete with them.
- **Light mode is the default.** Dark mode is a toggle, not the default. Editorial sites read better in light mode, and defaulting to dark mode is a tell that the site was generated by an AI that defaulted to its training data's most common style.
- **Interactive elements should feel mechanical, not magical.** No springy animations, no parallax. Transitions should be quick and functional (150–250ms ease-out is fine). The hierarchy explorer and wizard should feel like tools, not toys.
- **The diagram should be hand-feeling.** If the SVG diagram looks like a Visio export or a generic tech-blog illustration, it'll undermine the page. Aim for something that feels considered — clear linework, intentional spacing, no clip-art icons. A diagram that looks like it was drawn by someone who cared is worth more than three diagrams that look like defaults.

**Anti-patterns to avoid:**

- Hero sections with massive gradient text on dark backgrounds
- "Trusted by" logo bars (you have no logos and don't need them)
- Stat counters ("10,000+ specs generated")
- Stock illustrations of abstract figures or isometric cityscapes
- Three-column "feature" grids with icons
- Testimonial cards
- Anything that resembles a Vercel template

If the page looks like it could be the landing page for a Series A startup, restart.

## Site Placement

This site is rootspec.dev itself — the project page and the demo are the same artifact. There is no separate "polished" landing page sitting above this. That means:

- The meta-banner is the most important element on the page; it must appear above the fold and before any interactive content. Without it, visitors will mistakenly evaluate this as a conventional marketing site and miss the entire point.
- All RootSpec messaging — what it is, why it exists, how to start — must be present on this page. There is no "marketing site" elsewhere doing that work.
- The "Open Source CTA" section should function as the primary entry point to the framework repo, the docs, and the npm package. Treat it as the page's main conversion target alongside the "Spec Your Idea" wizard.
- The apex domain `rootspec.dev` is out of scope for this spec — treat `/demos/greenfield/` as the single canonical serving path. If/when rootspec.dev goes live, it will front the same artifact via a CDN-level path rewrite; no app-level changes should be needed.

## Attributions

Add a footer that identifies you, the site builder, by name, and provides the date on which you built the site.
