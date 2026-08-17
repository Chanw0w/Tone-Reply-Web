# Design

<!-- impeccable:design-schema 1 -->

## Mode

Operate — the user completes a task (generating replies, rewriting messages, saving presets).

## Visual World

Dark, minimal, focused. The interface recedes to let the conversation content and generated replies take center stage. Inspired by modern productivity tools (Linear, Vercel) with warmth appropriate for a relationship app.

## Palette

- Background: #0a0a0a (near black)
- Surface: #141414 (dark cards)
- Surface-2: #1c1c1c (inputs, interactive)
- Surface-3: #242424 (hover states)
- Border: #2a2a2a (subtle dividers)
- Text: #f5f5f5 (primary)
- Text secondary: #888 (labels, hints)
- Accent: #6366f1 (indigo — primary actions)
- Accent hover: #818cf8
- Accent bg: rgba(99, 102, 241, 0.1) (subtle highlights)
- Success: #22c55e
- Error: #ef4444

## Typography

- Font: Inter (400, 500, 600, 700, 800)
- Body: 14px, 1.5 line-height
- Labels: 12px, uppercase, 600 weight, 0.5px letter-spacing
- Headings: 24-30px, 760 weight

## Components

- Cards: 12px radius, 1px border, 20px padding
- Inputs: 8px radius, 12px padding, 14px font
- Buttons: 8px radius, 600 weight
- Chips/Tags: 20px radius, inline-flex, toggleable
- Tab bar: bottom fixed on mobile, side on desktop

## Layout

- Mobile-first responsive
- Bottom tab navigation (5 tabs)
- Max-width content area with generous padding
- Cards stack vertically with consistent spacing

## Motion

- Subtle transitions (200ms ease)
- Loading states with pulse animation
- Tab transitions
- Button hover/active states
