# OneWallet — Design System

## Overview

OneWallet is a Hebrew RTL digital wallet application that allows users to store and manage their physical cards digitally. The design language is warm, minimal, and approachable — inspired by the feel of a real leather wallet.

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#8C7355` | Buttons, links, active states |
| `--color-secondary` | `#D4B896` | Secondary accents |
| `--color-background` | `#F0EBE3` | Page backgrounds |
| `--color-accent` | `#FAF8F5` | Card backgrounds, hover states |
| `--color-text` | `#1A1208` | Primary text |
| `--color-text-muted` | `#B0A090` | Labels, captions, subtitles |
| `--color-border` | `#E8E0D5` | Dividers, input borders |
| `--color-white` | `#FFFFFF` | Cards, modals |
| `--color-error` | `#E24B4A` | Errors, delete actions |
| `--color-success` | `#3B6D11` | Success states |

### Card Type Colors

Each card category has its own color identity:

| Category | Background | Usage |
|----------|-----------|-------|
| ID Card | `#4A96B8` | Israeli ID card |
| License | `#8C7355` | Driving license |
| Loyalty | `#1A1208` | Club/loyalty cards |
| Gift | `#7C3AED` | Gift cards |
| Student | `#1E3A8A` | Student card |
| Visit | `#F5A623` | Visit/appointment cards |

---

## Typography

- **Font Family:** System stack — `'Segoe UI', Arial, sans-serif` (Hebrew-optimized)
- **Direction:** RTL (Right-to-Left) throughout the entire application
- **Base size:** 16px

| Role | Size | Weight |
|------|------|--------|
| Page title | 26px | 700 |
| Section title | 18–22px | 700 |
| Card name | 22px | 700 |
| Body text | 15px | 400 |
| Label / Caption | 12–13px | 500–700 |
| Monospace (card number) | 15px | Courier New |

---

## Spacing

Based on a 4px base unit:

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | 10px | Buttons, inputs |
| `--radius-lg` | 16px | Cards, modals, sections |
| `--radius-full` | 999px | Badges, pills |

---

## Shadows

| Token | Usage |
|-------|-------|
| `--shadow-sm` | Subtle card lift |
| `--shadow-card` | Wallet card depth |
| `--shadow-lg` | Modals, overlays |

---

## Components

### Buttons

- **Primary** — filled brown (`#8C7355`), white text, `border-radius: var(--radius)`
- **Secondary** — white background, border, brown text
- **Danger** — red (`#E24B4A`), white text (delete actions)
- **Icon button** — 40×40px, white background, border

### Input Fields

- Height: 48px
- Border: `1px solid var(--color-border)`
- Border-radius: `var(--radius)`
- Focus: border color shifts to `--color-primary`
- RTL-aligned text

### Cards (Wallet Cards)

- Aspect ratio: standard credit card (85.6mm × 53.98mm)
- Border-radius: `var(--radius-lg)`
- Each card type has a unique gradient/color background
- Text color adjusts to card background (dark or light)

### Navigation

- **Mobile:** Bottom navigation bar with 4 icons (Home, Cards, Add, Profile)
- **Desktop:** Left sidebar with the same destinations
- Active state: primary color highlight

### Modals

- Overlay: `rgba(26, 18, 8, 0.5)` dark background
- Mobile: slides up from bottom (bottom sheet)
- Desktop: centered, max-width 420px

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|---------|
| `< 600px` | Mobile layout — bottom nav, full-width cards |
| `≥ 600px` | Desktop layout — sidebar nav, two-column card view, centered modals |

---

## Design Principles

1. **Warm & Tactile** — Colors inspired by leather and paper, not cold tech blues
2. **RTL First** — Every component is designed for Hebrew right-to-left reading
3. **Minimal Friction** — Adding a card takes under 30 seconds
4. **Accessible** — All interactive elements have `aria-label`, keyboard-navigable
5. **Consistent Density** — 16px padding on mobile, 24px on desktop
