# AGENTS.md

## Design system
- The visual identity is restrained Nordic editorial: off-white background, navy charcoal text, one deep blue primary. No decorative gradients, glow shadows or `hover-scale` effects — keep `--gradient-*` and the old `shadow-professional`/`shadow-emergency` tokens out of components. (Why: the site must read as handcrafted, not template-generated.)
- Typography: `font-sans` = Barlow (body), `font-display` = Barlow Condensed for headings/eyebrows, loaded from Google Fonts in `index.html`. Do not swap for Inter/other defaults.
- Emergency red/yellow are reserved for unit/role identifiers only (units, unit badges, service markers) — not for general buttons or headings.
- Do not invent content (player counts, staff, opening hours, features, testimonials). Fake stats and "24/7 support" were deliberately removed; keep it that way.

## Stack decisions
- Headings use the `font-display` Tailwind utility (`--font-display`), not hardcoded font-family strings.
