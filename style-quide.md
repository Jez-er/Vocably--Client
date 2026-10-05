# Vocably — Style Guide

This guide describes the visual language of Vocably: a warm, calm, "garden-like" interface for learning vocabulary. Colors and sizes are taken from the example screens (Dashboard, Practice, Sign up) and the Log in mockup. Hex values were read by eye from the screenshot, so verify them against the Colors frame in Figma.

## 1. Principles

- **Calm and focused.** Cream background, generous whitespace, one accent color. The interface never competes with the word being learned.
- **Garden metaphor.** Words "grow": Seed → Sprout → Bloom. This logic shows up in the logo, copy and status labels.
- **Soft shapes.** Large corner radii, thin borders, no hard shadows.
- **Warm contrast.** Dark green for actions; amber only for rare accents.

## 2. Logo

- Mark: a rounded square in brand green `#5F7A52` with a white sprout (line icon, 2 px stroke, rounded caps and joins).
- Wordmark "Vocably" in Lora Bold, placed to the right of the mark with a 12 px gap.
- Mark sizes: 44 px in navigation and headers, 52 px on login and sign-up pages. Corner radius 12–14 px.
- Variants in the design file: green mark on a light background, light mark on dark green, dark mark on green.
- Keep clear space around the logo at least equal to the height of the mark.

## 3. Color

### Base

| Role             | Hex       | Usage                                       |
| ---------------- | --------- | ------------------------------------------- |
| Page background  | `#F7F4EE` | Background of all screens                   |
| Surface          | `#FFFFFF` | Cards, sidebar, outline buttons             |
| Input background | `#F3F0E8` | Form fields                                 |
| Border           | `#E4E0D4` | Card, field and divider lines               |
| Text             | `#1F2A1A` | Headings and body text                      |
| Muted text       | `#5E6B55` | Captions, descriptions, inactive navigation |
| Placeholder      | `#6F7A67` | Hints inside fields                         |

### Green scale (brand)

| Role    | Hex       | Usage                                           |
| ------- | --------- | ----------------------------------------------- |
| Primary | `#465A3A` | Main buttons, hero block, Bloom status          |
| Brand   | `#5F7A52` | Logo, progress bar fill                         |
| Light   | `#A9C48F` | Labels on dark green, border of the Easy button |
| Tint    | `#E3EBD9` | Active nav item, chips, progress tracks         |

### Accents

| Role      | Hex       | Usage                                    |
| --------- | --------- | ---------------------------------------- |
| Amber     | `#C48A3F` | Large numbers only (for example, streak) |
| Sand      | `#F3E3C8` | Seed chip background                     |
| Sand text | `#6B4A17` | Text on Sand                             |

**Rules.** There is one main accent: Primary. Use amber sparingly and only for text of 24 px or larger, since on white its contrast is about 3:1. Put white text only on Primary or Brand.

## 4. Typography

Two Google Fonts: **Lora** (serif, for headings and vocabulary words) and **Figtree** (sans-serif, for the interface).

| Style          | Font    | Size     | Weight  | Usage                            |
| -------------- | ------- | -------- | ------- | -------------------------------- |
| Display (word) | Lora    | 60 px    | 600     | Word on a flashcard              |
| H1             | Lora    | 38 px    | 600     | Page title                       |
| H2             | Lora    | 30–32 px | 600     | Hero block, auth card titles     |
| H3             | Lora    | 22 px    | 600     | Section titles                   |
| Number         | Lora    | 38 px    | 700     | Statistics                       |
| List word      | Lora    | 20 px    | 600     | List rows                        |
| Body           | Figtree | 16–17 px | 400     | Main text                        |
| Label          | Figtree | 16 px    | 500     | Field labels                     |
| Button         | Figtree | 16–17 px | 600     | Buttons                          |
| Caption        | Figtree | 14–15 px | 400–600 | Hints, chips                     |
| Eyebrow        | Figtree | 13 px    | 600     | Uppercase, letter-spacing 0.12em |

Use serif for the brand voice and the words themselves; use sans-serif for navigation, forms and utility text. A title and its subtitle are separated by about 6 px.

## 5. Spacing, layout, shape

- Spacing is a multiple of 4. Most common values: 8, 12, 20, 24, 28, 40.
- Sidebar width: 248 px. Main area padding: 40 px top and bottom, 48 px on the sides.
- Gap between blocks: 20–28 px.
- Form cards (login, sign up): up to 480 px wide, 40–44 px inner padding, centered on the screen.
- Practice card: up to 640 px wide.

| Element                  | Radius        |
| ------------------------ | ------------- |
| Form cards and flashcard | 32 px         |
| Large cards and hero     | 24 px         |
| Small stat cards         | 20 px         |
| Buttons                  | 14 px         |
| Inputs, nav items        | 12 px         |
| Chips                    | fully rounded |

Cards are separated from the background by a 1 px `#E4E0D4` border. No shadows.

## 6. Components

### Buttons

- **Primary:** background `#465A3A`, white text, Figtree 600, height 52–56 px, radius 14 px. One per screen or block.
- **Inverse:** white background with `#465A3A` text, used on the dark hero block.
- **Outline:** white background, 1 px `#E4E0D4` border, `#1F2A1A` text. For secondary actions such as "Continue with Google" (Google icon to the right of the label).
- **Soft:** background `#E3EBD9`, border `#A9C48F`, green text. For positive choices such as Easy.
- Minimum height of any button: 48 px.

### Inputs

- Label above the field: 16 px, weight 500, 8 px gap to the field.
- Field: height 52 px, background `#F3F0E8`, 1 px `#E4E0D4` border, radius 12 px, 18 px horizontal padding.
- Always use `<label>` with `<input>`. A placeholder never replaces a label.

### Cards

White background, 1 px border, radius 20–32 px, inner padding 24–48 px. Card title in Lora 22 px.

### Status chips

Fully rounded, 14 px text, weight 600, padding 6 × 14 px.

| Stage  | Background | Text      |
| ------ | ---------- | --------- |
| Seed   | `#F3E3C8`  | `#6B4A17` |
| Sprout | `#E3EBD9`  | `#465A3A` |
| Bloom  | `#465A3A`  | `#FFFFFF` |

### Progress

Track 8 px high in `#E3EBD9`, fill `#5F7A52`, both fully rounded.

### Navigation

Menu items: padding 13 × 14 px, radius 12 px, 16 px text. Active: background `#E3EBD9`, text `#465A3A`, weight 600. Inactive: text `#5E6B55`.

### "or" divider

Two thin lines with "or" in the middle, 16 px. Separates e-mail login from Google login.

### Hero block

Background `#465A3A`, radius 24 px, padding 32 × 36 px. Eyebrow in `#A9C48F`, white Lora 30 px title, description in `#E3EBD9`, inverse button on the right.

## 7. Icons and graphics

- Line icons: 2 px stroke, rounded caps and joins, 24 × 24 grid.
- No emoji and no gradient fills.
- The only decorative motif is the sprout. Do not add other illustrations without a reason.

## 8. Voice and copy

- Warm, encouraging, short sentences.
- Garden vocabulary: "Water your garden", "Plant your first word", "Keep growing your vocabulary garden".
- Buttons start with a verb: Log In, Create account, Start practice, Show answer.
- No exclamation marks, no pressure, no "you failed": a wrong answer is simply "Again".

## 9. Accessibility

- Text contrast of at least 4.5:1 (3:1 for text of 24 px and larger). Muted text `#5E6B55` on `#F7F4EE` passes.
- Interactive elements are real `button`, `a` and `input` elements with labels. Icon-only controls have an `aria-label`.
- Touch targets are at least 48 px.
- Do not rely on color alone to show state: add text or change weight.
- Pages must work at phone width: the sidebar collapses and grids become a single column.

## 10. Do / Don't

**Do**

- Keep one Primary button per screen.
- Leave plenty of space between blocks.
- Show the word in a large serif.

**Don't**

- Introduce new bright colors (blue, red) without a reason.
- Use shadows or sharp corners.
- Put gray text lighter than `#5E6B55` on the cream background.
- Mix more than two typefaces.
