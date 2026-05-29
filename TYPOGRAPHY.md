# Typography System - Living Scrolls

## Overview
The Living Scrolls typography system is built on a carefully crafted scale using Fira Sans for UI and Noto Serif Hebrew for scripture text. All typography is defined in Tailwind config and global styles.

## Font Families

### Primary Font
- **Fira Sans**: Used for UI, navigation, labels, and body text
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Hebrew Font
- **Noto Serif Hebrew**: Used for Hebrew script and scripture text
- Weights: 400 (regular), 700 (bold)

## Typography Scale

### Display Sizes (Hero/Landing)
```
display-xl    3.5rem   Bold      -0.02em letter-spacing
display-lg    3rem     Bold      -0.015em letter-spacing
display-md    2.5rem   Bold      -0.01em letter-spacing
display-sm    2rem     Bold      -0.01em letter-spacing
```

### Heading Sizes
```
heading-xl    2rem     Semibold  1.3 line-height
heading-lg    1.75rem  Semibold  1.35 line-height
heading-md    1.5rem   Semibold  1.4 line-height
heading-sm    1.25rem  Semibold  1.4 line-height
heading-xs    1.125rem Semibold  1.5 line-height
```

### Body Text
```
body-lg       1.125rem Regular   1.75 line-height
body-md       1rem     Regular   1.75 line-height (default)
body-sm       0.9375rem Regular  1.6 line-height
body-xs       0.875rem Regular   1.5 line-height
```

### Labels & Captions
```
label-lg      0.9375rem Medium   UPPERCASE   0.05em tracking
label-md      0.875rem  Medium   UPPERCASE   0.06em tracking
label-sm      0.8125rem Semibold UPPERCASE   0.08em tracking
caption       0.75rem   Medium   UPPERCASE   0.1em tracking
```

## CSS Classes

### Semantic Display Classes
```html
<!-- Hero Text -->
<h1 class="display-xl">Your heading here</h1>
<h1 class="display-lg">Slightly smaller heading</h1>
<h1 class="display-md">Medium display</h1>

<!-- Section Headings -->
<h2 class="heading-lg">Section title</h2>
<h3 class="heading-md">Subsection</h3>
<h4 class="heading-sm">Small heading</h4>

<!-- Body Text -->
<p class="body-md">Default paragraph text</p>
<p class="body-lg">Larger paragraph for emphasis</p>
<p class="body-sm">Small paragraph</p>

<!-- Labels & Captions -->
<span class="label-md">Status Label</span>
<span class="caption">Small caption text</span>

<!-- Hebrew Text -->
<p class="hebrew-md">עברית</p>
<p class="hebrew-lg">טקסט עברי גדול</p>
```

### Text Utility Classes
```html
<!-- Semantic text styles -->
<h1 class="text-hero">Main hero heading</h1>
<h2 class="text-section-title">Section heading</h2>
<h3 class="text-card-title">Card title</h3>

<!-- Text colors -->
<p class="text-secondary">Secondary text</p>
<p class="text-muted">Muted text</p>
<p class="text-inverse">Light text on dark</p>
<p class="text-emphasis">Emphasized text</p>
```

## Tailwind Classes

Use Tailwind typography utilities directly for custom sizes:

```html
<!-- Size classes -->
<h1 class="text-display-xl">Display XL</h1>
<h2 class="text-heading-lg">Heading Large</h2>
<p class="text-body-md">Body Medium</p>

<!-- Weight classes -->
<p class="font-bold">Bold text (700)</p>
<p class="font-semibold">Semibold text (600)</p>
<p class="font-medium">Medium text (500)</p>
<p class="font-normal">Normal text (400)</p>
<p class="font-light">Light text (300)</p>

<!-- Line height -->
<p class="leading-tight">Tighter line height</p>
<p class="leading-snug">Snug line height</p>
<p class="leading-normal">Normal line height</p>

<!-- Letter spacing -->
<p class="tracking-tight">Tight spacing</p>
<p class="tracking-normal">Normal spacing</p>
<p class="tracking-wide">Wide spacing</p>
```

## Component Examples

### Page Hero
```html
<div class="space-y-4">
  <p class="label-md">Sacred growth platform</p>
  <h1 class="display-lg">Living Scrolls — a cinematic sanctuary for Torah study & reflection.</h1>
  <p class="body-lg">Journey with Yahshuah Messiah through Torah study, Bible trivia, Hebrew wisdom, and community.</p>
</div>
```

### Card Heading
```html
<div class="rounded-[32px] border border-bronze/20 bg-cream/90 p-6">
  <p class="label-md text-olive">Daily Missions</p>
  <h2 class="heading-md text-deep mt-2">Complete your spiritual disciplines</h2>
  <p class="body-sm text-deep/80 mt-3">Nurture your heart with Scripture, reflection, and wisdom.</p>
</div>
```

### Button with Typography
```html
<button class="primary-button">
  <span class="label-md">Enter the scrolls</span>
</button>
```

### List with Hierarchy
```html
<div class="space-y-4">
  <h3 class="heading-sm">Daily Disciplines</h3>
  <ul class="space-y-2">
    <li class="body-md">
      <span class="font-semibold">Morning Prayer</span>
      <span class="text-muted text-sm">5 minutes minimum</span>
    </li>
  </ul>
</div>
```

## Best Practices

### 1. Hierarchy
- Use display sizes for hero sections only
- Use heading sizes for section and subsection titles
- Use body sizes for all content text
- Use labels for tags, badges, and UI elements

### 2. Line Length
- Keep body text line length between 50-75 characters for readability
- Headings can be shorter or longer as needed
- Use max-width utilities: `max-w-3xl` for content

### 3. Contrast
- Ensure sufficient contrast between text color and background
- Use `text-deep` (dark) on light backgrounds
- Use `text-inverse` (light) on dark backgrounds

### 4. Spacing
- Pair typography with spacing utilities (mt, mb, gap)
- Use `space-y-*` for vertical rhythm in content blocks
- Match heading margin-bottom to the next element's font size

### 5. Hebrew Text
- Always use `.hebrew-text` or `.hebrew-*` classes for Hebrew script
- Hebrew text is right-to-left: set `direction: rtl` when needed
- Pair with body text: `hebrew-lg` matches `body-lg` sizing

## Responsive Typography

The system automatically adjusts on smaller screens via Tailwind:

```html
<!-- Default size, lg size on medium+ -->
<h1 class="text-heading-md lg:text-heading-lg">
  Responsive Heading
</h1>

<!-- Smaller on mobile -->
<p class="text-body-sm md:text-body-md lg:text-body-lg">
  Responsive body text
</p>
```

## Examples

### Hero Section
```html
<section class="space-y-6">
  <p class="label-md">Sacred growth</p>
  <h1 class="display-lg">Build your spiritual foundation</h1>
  <p class="body-lg max-w-3xl">
    Master Torah study, Hebrew, and Scripture through guided lessons and community.
  </p>
</section>
```

### Dashboard Card
```html
<div class="rounded-[32px] border border-bronze/15 bg-cream/90 p-6 shadow-soft">
  <p class="label-md">Your Progress</p>
  <h2 class="heading-md mt-2">52% Complete</h2>
  <p class="body-sm text-deep/80">You're on track to finish this week's Torah portion.</p>
</div>
```

### Feature List
```html
<div class="space-y-4">
  <h2 class="heading-lg">Features</h2>
  <ul class="space-y-3">
    <li class="flex gap-3">
      <span class="text-gold">✓</span>
      <div>
        <p class="heading-sm">Personalized Learning</p>
        <p class="body-sm text-muted">Lessons tailored to your pace</p>
      </div>
    </li>
  </ul>
</div>
```

## Custom Typography

To add custom typography, extend the Tailwind config:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    fontSize: {
      'custom-lg': ['1.5rem', { lineHeight: '1.6', fontWeight: '600' }]
    }
  }
}
```

Then use in HTML:
```html
<p class="text-custom-lg">Custom sized text</p>
```

## Testing Typography

Check your typography implementation:
1. Ensure all headings use appropriate heading sizes
2. Verify body text uses body-md or body-lg
3. Check labels use label-sm or label-md
4. Confirm Hebrew text uses hebrew-* classes
5. Verify proper spacing between elements
6. Test responsive scaling on mobile and desktop

---

**Last Updated**: May 25, 2026
**Version**: 1.0
