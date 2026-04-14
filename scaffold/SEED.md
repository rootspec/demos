# RootFeed — Social Feed Demo

## What We're Building

RootFeed is a Bluesky-like social feed app, purpose-built to demonstrate RootSpec's scaffold workflow. Unlike the greenfield demo, this project starts with a working SvelteKit skeleton — routes, layout, data loading — and RootSpec specs and implements the full experience on top of it.

The name "RootFeed" ties this demo to RootSpec. This is not a real product — it's a showcase, and that should be obvious throughout.

## Scaffold Scenario

This demo answers the question: "I already have a project with routing and a framework. How does RootSpec fit in?"

The scaffold provides:
- SvelteKit with `@sveltejs/adapter-static`
- File-based routing with 5 routes
- TypeScript and Tailwind CSS
- Mock data loaded from JSON files
- Basic layout and navigation

RootSpec then defines the philosophy, interactions, and implementation details that turn this skeleton into a complete, tested experience.

## Routes

### `/` — Home Feed
Timeline of posts from mock data. Displays author avatar, handle, post content, timestamps, and engagement counts. The primary experience.

### `/profile/[handle]` — User Profile
A user's posts, bio, follower/following counts. Shows a follow/unfollow button (client-side state).

### `/post/[id]` — Post Detail
Single post with its full thread — parent post (if reply) and all replies. Shows engagement actions.

### `/search` — Search
Search posts by keyword. Filter by tag. Results update as the user types.

### `/explore` — Explore
Trending tags, suggested users to follow, popular posts. The discovery surface.

## Mock Data

JSON files in `src/lib/data/`:

- `users.json` — 8-10 users with handles, display names, bios, avatars (placeholder URLs)
- `posts.json` — 30-40 posts with content, timestamps, author references, like/repost counts, reply threading (parent_id references)
- `tags.json` — 10-15 tags with post counts

Content should feel realistic — tech discussions, casual thoughts, replies, threads. Not lorem ipsum.

## Interactive Features

- **Like/bookmark posts** — toggle state, update counts, client-side only (not persisted across page loads)
- **Follow/unfollow users** — client-side state, reflected in profile and feed
- **Load more** — paginated feed, load 10 posts at a time
- **Post composer** — create a new post that appears in the feed (client-side state)
- **Tag filtering** — on explore page, click a tag to filter posts
- **Dark/light theme** — system preference detection + manual toggle

## Meta Banner

A persistent banner explaining this is a RootSpec scaffold demo. Something like:

> "RootFeed started as a bare SvelteKit scaffold — 5 empty routes and some JSON files. RootSpec defined the spec and implemented the full experience with minimal human guidance. [View the scaffold commit →] [View the spec →] [View the seed →]"

Link to the SEED.md, spec files, and the original scaffold commit in the GitHub repo. Visitors should understand that rough edges come from sparse guidance, not sloppy engineering.

## Attribution & Transparency

- The name "RootFeed" and a tagline like "A RootSpec scaffold demo" should make the connection obvious
- Footer: RootSpec version, build date, builder identity, link to rootspec/rootspec repo
- The site should never pretend to be a real social network — every page should feel like a demo that happens to be a social feed
- RootSpec version (v6.2.1) displayed prominently in the header

## Deployment

This site is deployed to GitHub Pages at the subpath `/demos/scaffold/`. Configure the framework's base path so that all asset URLs (CSS, JS, images) and internal links resolve correctly when served from that subpath, not from the site root.

## Audience

Same as the greenfield demo — developers evaluating RootSpec. This demo specifically targets those who want to see how RootSpec works with an existing codebase rather than starting from nothing.

## Tone

Playful but technical. The mock data and interactions should feel alive — real-ish usernames, real-ish conversations — but the framing is always "this is a demo." Think: a well-made prototype, not a production app.
