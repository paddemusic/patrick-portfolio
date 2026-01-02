# Premium Motion System - Implementation Documentation

## Overview

Translated temporal behavior from reference site (ghuynguyen.vercel.app) into slow, intentional, editorial motion system. **No content, layout, or typography changed** - only timing, easing, sequencing, and scroll behavior.

---

## Core Principles Applied

### 1. **One Primary Element Animates Per Viewport**
- Each section reveals one dominant element at a time
- Secondary elements wait for primary to establish
- Prevents competing motion
- Creates clear visual hierarchy through time

### 2. **Hierarchy: Headlines → Body → Metadata**
Strict sequencing enforced across all sections:
- **Headlines** (1.8s duration, emphasized easing)
- **Body text** (1.2s duration, gentle easing, 400-500ms delay)
- **Metadata** (0.8s duration, decelerated easing, 800ms+ delay)

### 3. **Extended Durations (2-3x Reference Site)**
Reference uses 600ms - we extend to 1200-2400ms:
- Instant: 200ms
- Fast: 600ms (reference baseline)
- **Normal: 1200ms** (our new baseline)
- **Slow: 1800ms** (primary elements)
- **Slower: 2400ms** (hero moments)

### 4. **Scroll Resistance**
IntersectionObserver triggers earlier, holds state:
- Tighter viewport margins: `-10% 0px -30% 0px`
- Higher threshold: 30-40% visibility
- `triggerOnce: true` - state changes, not continuous animation
- Animations complete before next scroll reveal

### 5. **Gentle Easing Curves**
Reference: `cubic-bezier(0.76, 0, 0.24, 1)` - aggressive
Premium: Gentler curves with longer decay
- **Gentle**: `[0.25, 0.1, 0.25, 1.0]` - primary elements
- **Emphasized**: `[0.2, 0.0, 0.2, 1.0]` - hero moments
- **Decelerated**: `[0.3, 0.0, 0.1, 1.0]` - metadata

---

## Section-by-Section Implementation

### **HERO** - Staged Text Arrival

**Before:**
- All text appeared simultaneously (delay: 0.2s, duration: 1s)
- Corner details at 0.8s
- Footer at 1s

**After:**
```typescript
// Word-by-word name reveal
"patrick" → 0.3s delay, 1.8s duration
"jørgensen" → 0.7s delay (400ms after first), 1.8s duration
Tagline → 1.5s delay, 1.2s duration
Left corner → 2.3s delay, 1.2s duration
Right corner → 2.5s delay, 1.2s duration
Footer → 2.7s delay, 1.2s duration
```

**Result:**
- Total reveal: ~4 seconds (was ~1.5s)
- Each element arrives intentionally
- Creates visual pause, not spectacle
- Emphasized easing for weighty feel

---

### **ABOUT** - Clear Hierarchy

**Before:**
- Label: 0.2s delay
- Headline: 0.3s delay
- Body: 0.5s delay
- Grid: 0.7s delay + stagger

**After:**
```typescript
Label (metadata) → 0.2s, 0.8s duration
Headline (primary) → 0.5s, 1.8s duration, scale + y translation
Body (secondary) → 1.1s, 1.2s duration (waits for headline)
Grid (final meta) → 1.8s, 1.2s duration + 150ms stagger/image
```

**Result:**
- Headline dominates (largest movement, slowest)
- Body waits respectfully
- Photos arrive last as supporting evidence
- Removed scale animation from grid (minimal motion)

---

### **PHILOSOPHY** - One Principle at a Time

**Before:**
- Staggered by index (165ms between cards)
- Title and description animated together
- Fast reveals (0.6-0.8s)

**After:**
```typescript
// Each principle is isolated viewport
Container → IntersectionObserver state trigger
  Headline → 0s, 1.8s duration, y: 60, scale: 0.98
  Body → 0.5s delay, 1.2s duration (waits for headline)
```

**Result:**
- Only one principle reveals at a time
- Within each: headline establishes, then body follows
- State-based (not scroll-distance-based)
- Viewport margin: `-20% 0px -30% 0px` for scroll resistance

---

### **WORKS** - Weighty Card Entrance

**Before:**
- StaggerContainer pattern
- 0.8s duration, index * 0.165s delay
- Quick hover (0.3s)

**After:**
```typescript
// Individual card reveals
y: 100 → 0 (large travel distance)
scale: 0.95 → 1 (weighty feel)
Duration: 2.0s (very slow)
Sibling delay: index * 0.4s (extended stagger)
Viewport: margin: '-10% 0px -30% 0px' (scroll resistance)
Hover: scale 1.01, duration 0.6s (subtle, slow)
```

**Result:**
- Cards feel heavy and intentional
- Only 1-2 cards reveal per scroll section
- Extended stagger creates pauses between
- Emphasized easing for weight

---

### **TIMELINE** - State-Based Reveal

**Before:**
- Scroll-distance-based animations
- Index-based delays
- Container + children animations

**After:**
```typescript
// State machine per timeline entry
Container → IntersectionObserver trigger (once: true)
  Dot → 0s, 0.8s duration
  Year → 0.2s, 1.8s duration (primary)
  Title → 0.7s, 1.2s duration (secondary)
  Company → 1.1s, 0.8s duration (metadata)
  Description → 1.3s, 0.8s duration (metadata)
  Achievement → 1.6s, 0.6s duration (final metadata)
```

**Result:**
- Each entry is independent state machine
- Triggers once at 40% visibility
- Internal sequencing creates 2.2s choreography
- Not driven by scroll distance, but by state change

---

### **GALLERY** - Minimal Motion

**Before:**
- Y translation: 100 → 0
- Opacity: 0 → 1
- Hover: scale 1.05, duration 0.3s

**After:**
```typescript
// Opacity only - no Y movement
opacityReveal: [i * 0.08, i * 0.08 + 0.6] → [0, 1]
Removed: Y translation
Hover: scale 1.02 (reduced), duration 0.8s (slower)
```

**Result:**
- Images breathe, don't move
- Slower, extended opacity reveals
- Minimal hover interaction
- Let photography dominate, not motion

---

## Updated Scroll-Trigger Logic

### **IntersectionObserver Configuration**

```typescript
// Standard state-based reveal
viewport={{
  once: true, // State change, not continuous
  margin: '-10% 0px -30% 0px', // Scroll resistance
  amount: 0.3, // 30% visible to trigger
}}
```

### **Scroll Resistance Implementation**

1. **Earlier trigger** (`margin: '-10% 0px -30% 0px'`)
   - Element must be 10% past top before revealing
   - Must be 30% from bottom before revealing
   - Creates "scroll pause" as animations complete

2. **Higher threshold** (`amount: 0.3-0.4`)
   - 30-40% of element must be visible
   - Prevents premature reveals
   - Ensures element is in comfortable viewport position

3. **One-time state change** (`once: true`)
   - Animation triggers once, holds final state
   - Not scroll-progress-driven
   - Cleaner, more intentional

---

## Timing & Easing Values

### **Duration System**

| Element Type | Duration | When to Use |
|--------------|----------|-------------|
| Instant | 200ms | Quick feedback, micro-interactions |
| Fast | 600ms | Metadata, supporting elements |
| Normal | 1200ms | Body text, secondary elements |
| Slow | 1800ms | Headlines, primary elements |
| Slower | 2400ms | Hero moments, emphasis |

### **Easing Curves**

| Curve | Bezier | Use Case |
|-------|---------|----------|
| Gentle | `[0.25, 0.1, 0.25, 1.0]` | Primary elements, body text |
| Soft | `[0.45, 0.05, 0.55, 0.95]` | Transitions, secondary |
| Emphasized | `[0.2, 0.0, 0.2, 1.0]` | Hero, headlines (weighty) |
| Decelerated | `[0.3, 0.0, 0.1, 1.0]` | Metadata, final elements |

### **Delay Sequencing**

| Level | Delay | Purpose |
|-------|-------|---------|
| Hierarchy | 400-500ms | Between headline → body → metadata |
| Siblings | 300-400ms | Between cards, list items |
| Children | 150ms | Tight stagger (grid items) |
| Resistance | 200ms | Scroll pause before reveal |

---

## Motion Controls Pacing & Hierarchy

### **Pacing Through Duration**
- **Long durations create pauses** (1.8s headline feels deliberate)
- **Extended staggers add silence** (400ms between cards = breathing room)
- **Scroll resistance delays next reveal** (IntersectionObserver margins)
- Total time to reveal section: 2-4 seconds (was 0.5-1s)

### **Hierarchy Through Sequence**
- **What animates first dominates** (headlines always first)
- **Delay communicates importance** (body waits for headline)
- **Movement magnitude reinforces weight** (y: 60 > y: 30 > y: 20)
- **Scale emphasizes primary** (headlines scale, metadata doesn't)

### **Visual Rest Through Simplification**
- Gallery: Removed Y movement (opacity only)
- About grid: Removed scale (opacity only)
- Hover states: Reduced magnitude (1.05 → 1.02), increased duration (0.3s → 0.8s)
- Eliminated competing animations within same viewport

---

## Files Modified

1. **`/app/utils/premiumMotion.ts`** - NEW
   - Duration system
   - Easing curves
   - Sequencing delays
   - Variant definitions

2. **`/app/components/Hero.tsx`**
   - Word-by-word name reveal
   - Extended staggers (2.7s total)
   - Metadata arrives last

3. **`/app/components/About.tsx`**
   - Headline → Body → Grid sequence
   - Extended delays (1.8s for grid)
   - Removed scale from photos

4. **`/app/components/Philosophy.tsx`**
   - One-at-a-time reveals
   - Internal sequencing (headline → body)
   - State-based triggers

5. **`/app/components/Work.tsx`**
   - Weighty card entrance (y: 100, scale: 0.95)
   - Extended duration (2.0s)
   - Longer sibling stagger (0.4s)

6. **`/app/components/Timeline.tsx`**
   - State machine per entry
   - 6-level internal sequence (2.2s choreography)
   - Independent viewport triggers

7. **`/app/components/Gallery.tsx`**
   - Removed Y translation
   - Opacity-only reveal
   - Minimal hover (1.02 scale, 0.8s)

---

## Result: Motion as Editorial Tool

### **Before**
- Fast reveals (0.6-0.8s)
- Everything animated simultaneously
- Scroll-distance-driven
- Competing motion within viewports

### **After**
- Slow, intentional (1.2-2.4s primary elements)
- Clear hierarchy through sequence
- State-based reveals (scroll resistance)
- One dominant element per viewport

### **Scroll Behavior**
- User scrolls
- Element enters viewport (30-40% visible)
- **Pause** - primary element reveals (1.8s)
- **Pause** - secondary follows (1.2s, 400ms delay)
- **Pause** - metadata completes (0.8s, 800ms delay)
- State held, ready for next scroll

### **Pacing Effect**
- Sections take 2-4x longer to fully reveal
- Creates natural reading rhythm
- Scroll feels considered, not rushed
- Motion creates silence between information

---

## Premium Feel Achieved Through

✅ **Extended durations** (2-3x reference site)
✅ **Gentle easing** (softer curves than reference)
✅ **Clear sequencing** (headline → body → meta)
✅ **Scroll resistance** (state-based, not distance-based)
✅ **Reduced motion** (Gallery, About grid)
✅ **Weighty animations** (scale + y translation)
✅ **Strategic pauses** (400-500ms delays)

**Motion now controls the pace of information delivery, enforces visual hierarchy through time, and creates editorial pauses rather than spectacle.**
