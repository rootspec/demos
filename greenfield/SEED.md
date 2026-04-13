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

## Site Sections

### Meta Banner

A persistent, visible banner (top of page or below the hero) that explains this site is itself a RootSpec demo. Something like:

> "This site was generated from a ~100-line product description using the RootSpec pipeline — no manual code, no design mockups. The spec, the code, and the tests were all produced by running four commands. [View the spec →] [View the seed →]"

Link to the SEED.md and spec files in the GitHub repo at https://github.com/rootspec/demos/tree/main/greenfield. This is critical — visitors must understand that any rough edges are the result of minimal human guidance, not carelessness. The banner should be honest and direct: this is what you get from a sparse seed with no iteration.

### Hero

Tagline and one-sentence explanation. Immediate visual clarity about what this is.

### The Problem

Why existing approaches fail: spec drift, philosophy-implementation gap, unreliable AI output without validation, Google Docs specs nobody reads.

### How It Works

Visual walkthrough of the four skills (init → spec → impl → validate) with clear before/after.

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

## Attributions

Add a footer that identifies you, the site builder, by name, and provides the date on which you built the site.
