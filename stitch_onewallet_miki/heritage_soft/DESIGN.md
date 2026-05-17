---
name: Heritage Soft
colors:
  surface: '#fff8f4'
  surface-dim: '#dfd9d4'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f2ee'
  surface-container: '#f4ece8'
  surface-container-high: '#eee7e2'
  surface-container-highest: '#e8e1dd'
  on-surface: '#1e1b19'
  on-surface-variant: '#4e453c'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f7efeb'
  outline: '#7f756b'
  outline-variant: '#d1c4b9'
  surface-tint: '#715a3e'
  primary: '#6f583c'
  on-primary: '#ffffff'
  primary-container: '#897052'
  on-primary-container: '#fffbff'
  inverse-primary: '#e0c29f'
  secondary: '#85532e'
  on-secondary: '#ffffff'
  secondary-container: '#febb8e'
  on-secondary-container: '#794925'
  tertiary: '#4e5d6e'
  on-tertiary: '#ffffff'
  tertiary-container: '#677688'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#fdddb9'
  primary-fixed-dim: '#e0c29f'
  on-primary-fixed: '#281803'
  on-primary-fixed-variant: '#584329'
  secondary-fixed: '#ffdcc6'
  secondary-fixed-dim: '#fbb88b'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#693c19'
  tertiary-fixed: '#d4e4f9'
  tertiary-fixed-dim: '#b8c8dc'
  on-tertiary-fixed: '#0d1d2b'
  on-tertiary-fixed-variant: '#394858'
  background: '#fff8f4'
  on-background: '#1e1b19'
  surface-variant: '#e8e1dd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 48px
---

## Brand & Style

This design system is built on the pillars of "Quiet Luxury" and "Digital Tactility." It reimagines the digital wallet as a curated, physical leather goods experience rather than a cold financial tool. The target audience values discretion, longevity, and high-end aesthetics.

The style is a blend of **Soft Minimalism** and **Modern Corporate**, utilizing heavy whitespace and a restricted tonal palette to create a sense of calm and exclusivity. It avoids aggressive visual cues in favor of subtle transitions and sophisticated color harmonies, evoking an emotional response of security, warmth, and effortless status.

## Colors

The palette is centered on low-contrast, organic tones that feel aged and refined. 

- **Primary Surface (#FAF8F5):** A warm white used for the main background to prevent eye strain and create an airy feel.
- **Secondary Surface (#F0EBE3):** A light beige used for container backgrounds and section grouping.
- **Primary Action (#8C7355):** A muted, medium-brown that replaces harsh blacks. It provides sufficient contrast for legibility while maintaining a soft, leather-like character.
- **Accent (#E8A87C):** A desaturated warm orange used exclusively for high-priority notifications or active states. It should be used sparingly, like a small copper rivet on a fine bag.
- **Typography (#4A3F35):** A deep, warm taupe-brown used for primary text to maintain the "heritage" feel without the clinical nature of true black or grey.

## Typography

This design system utilizes **Plus Jakarta Sans** across all levels to bridge the gap between heritage warmth and modern digital utility. 

- **Headlines:** Use tighter letter-spacing and semi-bold weights to ground the layout.
- **Body Text:** Use generous line-heights (1.6) to enhance readability and contribute to the "minimalist" sense of space.
- **Labels:** Use small-caps or uppercase with slight tracking for a disciplined, architectural feel in secondary data points.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. While the core content conforms to a 12-column grid on desktop and a single column on mobile, the spacing rhythm is intentionally spacious.

Use an 8px base unit. Margins should be generous (minimum 24px on mobile) to allow the "Warm White" surface to breathe. Elements should be grouped using logical stacks (8px for related items, 16px for distinct components) to create a clear visual hierarchy without the need for heavy dividers.

## Elevation & Depth

To maintain the premium feel, this design system avoids heavy, dark shadows. Depth is communicated through **Tonal Layers** and **Ambient Tinted Shadows**.

- **Surfaces:** Use the secondary surface (#F0EBE3) to sit "behind" the primary surface cards.
- **Shadows:** Use extremely soft, diffused shadows with a slight brown tint (e.g., 4% opacity of #8C7355) rather than neutral grey. This makes cards appear as if they are gently resting on a soft surface.
- **Dividers:** Use low-contrast lines (1px width, 10% opacity of the Primary Brown) only when necessary. Prefer whitespace over lines whenever possible.

## Shapes

The shape language is **Rounded**, reflecting the soft edges of tumbled leather and organic materials. 

- **Primary Buttons & Cards:** Use a 0.5rem (8px) radius as the standard.
- **Large Containers:** Use 1rem (16px) for main dashboard cards to create a welcoming, approachable frame.
- **Interactive States:** Subtle scale-downs (98%) on press are encouraged to simulate a tactile "squish" without using skeuomorphic gradients.

## Components

- **Buttons:** Primary buttons use the Medium Brown (#8C7355) with Warm White text. Secondary buttons are ghost-style with a thin brown border.
- **Input Fields:** Use the Secondary Surface (#F0EBE3) as the fill color with no border, using a subtle bottom-only border when focused.
- **Cards:** Financial cards (debit/credit) should utilize subtle grain textures and the Accent Orange (#E8A87C) for small highlights like chips or logos.
- **Chips/Badges:** Use small, pill-shaped tags with a 10% opacity fill of the brown or orange, ensuring the text remains legible.
- **Lists:** Transaction lists should have generous vertical padding (16px) between items, using the "Body-MD" typography for labels and "Body-LG" for amounts.
- **Additional Components:** Include "Balance Sheets" (bottom sheets) that slide up with a heavy backdrop blur to maintain focus on transactional details.