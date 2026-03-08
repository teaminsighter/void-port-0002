# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Void Land** is a dual-purpose vanilla HTML/CSS/JavaScript project:
1. **Personal Portfolio** - Animated portfolio for an AI Engineer (root `index.html`)
2. **Landing Page Collection** - Standalone, deploy-ready landing pages in `/websites/`

This is NOT a framework project - no Next.js, no React, no build process required.

## Development

No npm or build commands needed. Open HTML files directly in browser or use any static server:
```bash
python3 -m http.server 8000
# or
npx serve .
```

Deploy any folder directly to Netlify, Vercel, or GitHub Pages.

## Architecture

### Portfolio (`index.html` + `assets/`)
- Single-page with smooth scroll navigation
- GSAP + ScrollTrigger for animations (CDN)
- Lenis for smooth scrolling (CDN)
- Custom cursor system
- Dark theme with green accent (#4ADE80)

### Landing Pages (`websites/`)
Each landing page is completely self-contained:
```
websites/landing-name/
├── index.html      # Main page
├── style.css       # Local styles
├── script.js       # Local scripts
├── config.js       # CLIENT EDITABLE (company info, analytics IDs)
├── robots.txt
├── sitemap.xml
└── 404.html
```

### Real Estate Landing (`websites/real-estate/`)
- Configuration-driven via `config.js` (company details, SEO, analytics)
- GSAP animations with TextSplitter class for character animations
- GDPR cookie consent (blocks analytics until consent)
- Formspree/Getform integration for contact form
- JSON-LD structured data for SEO
- Luxury aesthetic: dark green (#2C3E2D) + gold (#D4A853)

## Key Files

| File | Purpose |
|------|---------|
| `assets/js/main.js` | Portfolio animations (GSAP, cursor, preloader) |
| `assets/css/styles.css` | Portfolio styling |
| `websites/real-estate/config.js` | Real estate client configuration |
| `websites/real-estate/script.js` | Real estate animations |

## Adding a New Landing Page

1. Create folder in `/websites/` using kebab-case
2. Copy structure from `real-estate/`
3. Edit `config.js` for client details
4. Update `robots.txt` and `sitemap.xml` with live domain
5. Add link in `/websites/index.html`

## CDN Dependencies

All external libraries load from CDN (no local install):
- GSAP 3.12.x from cdnjs
- Lenis from unpkg
- Google Fonts (Inter, JetBrains Mono, Cormorant Garamond, DM Sans)

## Important Notes

- Portfolio `main.js` has interdependent functions - modify with caution
- Real estate uses 3.8MB video asset - consider optimization for production
- Forms require endpoint configuration in `config.js` for live deployments
- Reduced motion support: animations skip if `prefers-reduced-motion` is set
