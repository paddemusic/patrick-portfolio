# Portfolio Design Refinement Plan
**Graphic Designer's Eye for Typography, Spacing & Animation**

---

## Current State Analysis

### ✅ What's Working Well:
- **Authentic voice** - Content now feels personal and credible
- **Premium Media player** - Centerpiece audio experience is strong
- **Premium Clients section** - Elevated treatment with cards
- **Hover preview system** - Works section has engaging interaction
- **Scroll choreography** - Reference timing (0.165s) is consistent

### ⚠️ Areas Needing Refinement:

**1. Hero Section Issues** ⚠️ CRITICAL
- Text overlapping 3D donut - hard to read name/title
- Donut 3D element is cut off at viewport edges
- No entrance animation - page appears instantly (jarring)
- Subtitle still generic "A synthesis of convergence and emergence"

**2. Footer Issues**
- 3D donut element cut off (same clipping issue as hero)
- Needs proper viewport containment

**3. Works Section Typography**
- Project titles are massive (5rem/80px) but descriptions feel cramped beneath
- Lack of breathing room between title and description
- Metrics/client info feels like an afterthought
- Line-height needs adjustment for better readability

**4. Timeline Section**
- Completely static - no scroll-triggered animations
- Generic placeholder content (needs real career data)
- Lacks visual interest or progression feeling
- No sense of journey or movement

**5. Partners Section Structure**
- While premium cards are good, grid feels rigid
- Category labels only appear on hover (should be visible)
- Could benefit from grouping or hierarchy
- Needs better visual weight distribution

**6. Missing Skills Section**
- No dedicated skills showcase
- Need to highlight comprehensive skill set from CVs
- Should use card grid pattern from reference image

**7. General Typography Issues**
- Some sections have inconsistent font sizes
- Line-height ratios not optimized for readability
- Letter-spacing needs fine-tuning on headings

---

## Design Refinement Strategy

### 🚨 **PHASE 0: Critical Hero Fixes** (DO FIRST!)

**Problem 1: Text Overlapping 3D Donut**

The name "PATRICK JØRGENSEN" is being obscured by the GlassDonut3D, making it hard to read.

**Solution Options:**

**Option A: Z-Index Layering (Recommended)**
```tsx
// Separate text and 3D into clear layers
<div className="relative min-h-screen flex items-center justify-center">
  {/* 3D Background Layer */}
  <div className="absolute inset-0 z-0 flex items-center justify-center">
    <GlassDonut3D />
  </div>

  {/* Text Foreground Layer with backdrop blur */}
  <div className="relative z-10 text-center">
    <motion.h1
      className="text-[clamp(4rem,8vw,6rem)] font-light tracking-tight
                 backdrop-blur-sm bg-black/20 px-8 py-4 rounded-2xl"
    >
      PATRICK<br />JØRGENSEN
    </motion.h1>
  </div>
</div>
```

**Option B: Side-by-Side Layout**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  {/* Left: Text */}
  <div className="text-left">
    <h1>PATRICK JØRGENSEN</h1>
    <p>CREATIVE TECHNOLOGIST · MUSICIAN</p>
  </div>

  {/* Right: 3D */}
  <div className="flex justify-center">
    <GlassDonut3D />
  </div>
</div>
```

**Option C: Text Shadow/Stroke (Simple fix)**
```tsx
<h1 className="text-[clamp(4rem,8vw,6rem)]
               [text-shadow:_0_0_40px_rgb(0_0_0_/_80%),_0_0_80px_rgb(0_0_0_/_60%)]
               stroke-white stroke-2">
  PATRICK JØRGENSEN
</h1>
```

**Option D: Gradient Overlay on 3D** (Most Creative)
```tsx
// Add vignette overlay behind text
<div className="absolute inset-0 z-5
                bg-gradient-to-r from-black/60 via-transparent to-black/60" />

// Text sits at z-10, 3D at z-0, gradient at z-5
```

**Recommended: Option A** - Gives text clear readability while keeping dramatic 3D effect

---

**Problem 2: 3D Donut Clipped at Viewport Edges**

The donut is being cut off because container doesn't account for its full size.

**Solution:**
```tsx
// In GlassDonut3D.tsx and Contact.tsx (footer donut)
<Canvas
  camera={{ position: [0, 0, 5], fov: 45 }}
  style={{
    width: '100%',
    height: '600px', // Increase from current height
    minHeight: '600px',
  }}
  gl={{ alpha: true, antialias: true }}
>
  {/* Reduce donut scale to fit viewport */}
  <Donut scale={2.5} /> {/* Down from 3 or whatever current scale is */}
</Canvas>

// Add padding to container
<div className="relative w-full px-8 py-12"> {/* Add padding */}
  <Canvas ... />
</div>
```

**Alternative: Contain Within Safe Area**
```tsx
// Add max-width constraint
<div className="max-w-[800px] mx-auto"> {/* Constrain width */}
  <Canvas
    camera={{ position: [0, 0, 6], fov: 35 }} {/* Tighter FOV */}
  >
    <Donut scale={2} />
  </Canvas>
</div>
```

---

**Problem 3: No Entrance Animation**

Page loads instantly - needs elegant fade-in.

**Solution: Staged Entrance Animation**
```tsx
// In page.tsx or layout.tsx
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to let page settle
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* All content */}
          <SmoothScroll>
            <Hero />
            <About />
            {/* ... */}
          </SmoothScroll>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Staged Hero Entrance (More Dramatic):**
```tsx
// In Hero.tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2, duration: 1, ease: [0.4, 0, 0.2, 1] }}
>
  <h1>PATRICK JØRGENSEN</h1>
</motion.div>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8 }}
>
  CREATIVE TECHNOLOGIST · MUSICIAN
</motion.p>

<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
>
  <GlassDonut3D />
</motion.div>
```

**Sequence:**
1. 3D donut fades + scales in (0ms delay)
2. Name slides up + fades (200ms delay)
3. Subtitle slides up + fades (500ms delay)
4. Scroll indicator pulses in (800ms delay)

---

### 🎨 **PHASE 1: Works Section Typography & Spacing**

**Current Issues:**
```
Category/Year (small, gray)
↓ 4px gap
HUGE TITLE (80px, tracking -2%)
↓ 24px gap (too tight!)
Description paragraph (cramped)
↓ 16px gap
Metrics (feels like afterthought)
```

**Improved Hierarchy:**
```
Category/Year
  ↓ 8px gap (breathing room)

TITLE (still big, but refined)
  ↓ 32px gap (generous!)

Description
  (increased line-height: 1.7 → 1.8)
  (max-width: 42ch for optimal reading)
  ↓ 20px gap

Metrics
  (stronger visual weight)
  ↓ 32px gap

Hover indicator
```

**Specific Changes:**

1. **Title Adjustments:**
   - Reduce from `clamp(3rem, 5vw, 5rem)` to `clamp(2.5rem, 4.5vw, 4.5rem)`
   - Adjust letter-spacing from `-0.02em` to `-0.01em`
   - Add subtle transition on scroll into view

2. **Description Typography:**
   - Increase line-height from `1.75` to `1.8`
   - Reduce max-width from `max-w-3xl` (48rem) to `max-w-2xl` (42rem)
   - Increase font-size from `text-lg` (18px) to `text-xl` (20px)
   - Add subtle text-gray-400 → text-gray-300 for better contrast

3. **Spacing Adjustments:**
   - Title → Description: `mt-6` → `mt-8` (24px → 32px)
   - Description → Metrics: `mt-4` → `mt-5` (16px → 20px)
   - Metrics → Hover: `mt-6` → `mt-8`
   - Between projects: Keep `clamp(7.5rem, 10vw, 10rem)` (generous!)

4. **Metrics Styling:**
   - Increase font-weight from `font-normal` to `font-medium`
   - Increase size from `text-sm` to `text-base`
   - Add subtle background: `bg-zinc-900/30 px-3 py-1 rounded-full inline-block`

---

### ✨ **PHASE 2: Timeline Section Animation & Content**

**Current State:** Static timeline with generic placeholder data

**Goal:** Bring timeline to life with scroll-triggered animations and real career data

**Animation Patterns (from reference site):**

1. **Timeline Line Animation:**
   ```tsx
   // Animated line that draws as you scroll
   const lineProgress = useTransform(
     scrollYProgress,
     [0, 1],
     ['0%', '100%']
   );

   <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800">
     <motion.div
       style={{ height: lineProgress }}
       className="w-full bg-white"
     />
   </div>
   ```

2. **Year Indicators Sequenced Reveal:**
   ```tsx
   <motion.div
     initial={{ scale: 0, opacity: 0 }}
     whileInView={{ scale: 1, opacity: 1 }}
     viewport={{ once: true, margin: '-100px' }}
     transition={{
       delay: index * 0.165, // Reference timing
       duration: 0.6,
       ease: [0.4, 0, 0.2, 1],
     }}
     className="year-dot"
   />
   ```

3. **Content Cards Slide + Fade:**
   ```tsx
   <motion.div
     initial={{ opacity: 0, x: -50, y: 20 }}
     whileInView={{ opacity: 1, x: 0, y: 0 }}
     viewport={{ once: true, margin: '-100px' }}
     transition={{
       delay: index * 0.165 + 0.2,
       duration: 0.8,
       ease: [0.4, 0, 0.2, 1],
     }}
   />
   ```

4. **Numbers Count-Up:**
   ```tsx
   // For years, add count-up animation like Stats section
   const { count, startAnimation } = useCountUp(2024);
   ```

**Real Content (from CVs):**

```tsx
const timeline = [
  {
    year: '2023-2024',
    title: 'AI-Forward Creative Technologist',
    company: 'Independent',
    description: 'Invested heavily in mastering AI tools for modern media production. Building custom workflows that define the future of content creation.',
    icon: 'ai', // or emoji
  },
  {
    year: '2021-2022',
    title: 'Social Media Manager & YouTube Lead',
    company: 'TV2 (National Broadcaster)',
    description: 'Managed 400,000-600,000 kr monthly Facebook ad budgets. Launch strategies for Kompani Lauritzen, The Voice, Forræder reaching all of Norway.',
    icon: 'broadcast',
  },
  {
    year: '2015-2021',
    title: 'Music Artist & Brand Builder',
    company: 'Independent',
    description: '24 releases, 400 concerts, 300M video plays, 250k followers. Learned the importance of strategic planning through detailed launch strategies.',
    icon: 'music',
  },
  {
    year: '2012-2015',
    title: 'International Education',
    company: 'McNally Smith, Academy of Art SF, BI Bergen',
    description: 'Four years across US and Norway studying Music Business, TV Production, PR, and Marketing Communication.',
    icon: 'education',
  },
];
```

**Visual Enhancements:**

1. **Add subtle card backgrounds:**
   ```tsx
   className="bg-zinc-900/20 border border-zinc-800/50 rounded-lg p-6
              hover:bg-zinc-900/30 hover:border-zinc-700/50
              transition-all duration-500"
   ```

2. **Add icons/emojis for each period:**
   - 2023-2024: 🤖 (AI)
   - 2021-2022: 📺 (Broadcasting)
   - 2015-2021: 🎵 (Music)
   - 2012-2015: 🎓 (Education)

3. **Add achievement badges:**
   ```tsx
   <div className="mt-4 flex flex-wrap gap-2">
     <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20
                      rounded-full text-xs text-blue-400">
       300M plays
     </span>
     <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20
                      rounded-full text-xs text-purple-400">
       600k kr budgets
     </span>
   </div>
   ```

---

### 🏢 **PHASE 3: Partners Section Structure Improvements**

**Current Issues:**
- Category labels hidden until hover (should be visible)
- All logos same visual weight (no hierarchy)
- Grid feels uniform (lacks rhythm)

**Improved Structure:**

1. **Always-Visible Categories:**
   ```tsx
   <div className="text-xs tracking-wider text-gray-500 uppercase mb-2">
     {client.category}
   </div>
   <img ... />
   ```

2. **Visual Hierarchy Through Size Variation:**
   ```tsx
   const clients = [
     { name: 'TV2', size: 'large', category: 'National Broadcaster' }, // Bigger
     { name: 'Sony Music', size: 'medium', category: 'Music Industry' },
     { name: 'Fremantle', size: 'medium', category: 'TV Production' },
     { name: 'BI', size: 'small', category: 'Business School' },
     { name: 'Nobel', size: 'small', category: 'Peace Center' },
     { name: 'Softgen', size: 'small', category: 'Technology' },
   ];

   const sizeClasses = {
     large: 'h-28 md:h-32 col-span-2', // Spans 2 columns
     medium: 'h-20 md:h-24',
     small: 'h-16 md:h-20',
   };
   ```

3. **Grouping by Type:**
   ```tsx
   <div className="space-y-16">
     {/* Major Clients */}
     <div>
       <h4 className="text-sm tracking-widest text-gray-600 mb-8">
         (MAJOR CLIENTS)
       </h4>
       <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
         {/* TV2, Sony Music, Fremantle */}
       </div>
     </div>

     {/* Education & Organizations */}
     <div>
       <h4 className="text-sm tracking-widest text-gray-600 mb-8">
         (EDUCATION & PARTNERSHIPS)
       </h4>
       <div className="grid grid-cols-3 gap-6">
         {/* BI, Nobel, Softgen */}
       </div>
     </div>
   </div>
   ```

4. **Add Context on Hover:**
   ```tsx
   <motion.div className="absolute inset-0 bg-zinc-900/95 opacity-0
                          group-hover:opacity-100 transition-opacity
                          flex items-center justify-center p-4">
     <p className="text-sm text-gray-400 text-center">
       {client.roleDescription}
     </p>
   </motion.div>

   // Example roleDescription:
   // "Managed social media strategy and 600k kr monthly ad campaigns"
   ```

---

### 🛠️ **PHASE 4: Skills Section** (Based on Reference Image)

**Design Pattern:** Clean card grid with icons, skill names, and category labels

**Reference Structure:**
- Grid of bordered cards (4 columns on desktop, 2 on mobile)
- Each card contains: Icon + Skill Name + Category
- Dark background with subtle borders
- Hover effects for interactivity

**Complete Skills List (From CVs + Strategic Additions):**

```tsx
const skills = [
  // === DESIGN ===
  {
    name: 'Adobe Creative Suite',
    category: 'Design',
    icon: 'palette', // or actual Adobe icon
    description: 'Photoshop, Illustrator, InDesign'
  },
  {
    name: 'Figma',
    category: 'Design',
    icon: 'figma',
    description: 'UI/UX design, prototyping, collaboration'
  },

  // === VIDEO PRODUCTION ===
  {
    name: 'Premiere Pro',
    category: 'Video',
    icon: 'video',
    description: 'Professional video editing'
  },
  {
    name: 'After Effects',
    category: 'Motion',
    icon: 'layers',
    description: 'Motion graphics, visual effects'
  },
  {
    name: 'Final Cut Pro',
    category: 'Video',
    icon: 'film',
    description: 'Video editing, post-production'
  },
  {
    name: 'DaVinci Resolve',
    category: 'Video',
    icon: 'color-palette',
    description: 'Color grading, editing'
  },
  {
    name: 'Multi-Camera Production',
    category: 'Video',
    icon: 'cameras',
    description: 'Live production, event coverage'
  },

  // === CREATIVE STRATEGY ===
  {
    name: 'Concept Development',
    category: 'Creative',
    icon: 'lightbulb',
    description: 'Storyboarding, creative direction'
  },
  {
    name: 'Content Strategy',
    category: 'Strategy',
    icon: 'layout',
    description: 'Planning, storytelling, audience targeting'
  },

  // === SOCIAL MEDIA ===
  {
    name: 'Meta Business Suite',
    category: 'Social',
    icon: 'meta',
    description: 'Facebook, Instagram management'
  },
  {
    name: 'TikTok',
    category: 'Social',
    icon: 'tiktok',
    description: 'Short-form video strategy'
  },
  {
    name: 'YouTube',
    category: 'Social',
    icon: 'youtube',
    description: 'Channel management, optimization'
  },
  {
    name: 'Snapchat',
    category: 'Social',
    icon: 'snapchat',
    description: 'Discover series, AR filters'
  },
  {
    name: 'LinkedIn',
    category: 'Social',
    icon: 'linkedin',
    description: 'Professional networking, B2B content'
  },

  // === MARKETING ===
  {
    name: 'Facebook Ads Manager',
    category: 'Marketing',
    icon: 'ad',
    description: '600k kr monthly budget experience'
  },
  {
    name: 'Social Media Marketing',
    category: 'Marketing',
    icon: 'trending-up',
    description: 'Campaigns, analytics, growth'
  },
  {
    name: 'Google Analytics',
    category: 'Marketing',
    icon: 'chart',
    description: 'Data analysis, audience insights'
  },

  // === AI TOOLS (Your Edge!) ===
  {
    name: 'ChatGPT',
    category: 'AI',
    icon: 'message-square',
    description: 'Content creation, automation'
  },
  {
    name: 'Midjourney',
    category: 'AI',
    icon: 'image',
    description: 'AI image generation'
  },
  {
    name: 'Runway',
    category: 'AI',
    icon: 'video',
    description: 'AI video tools, gen-2'
  },
  {
    name: 'Claude',
    category: 'AI',
    icon: 'brain',
    description: 'Advanced AI assistance'
  },
  {
    name: 'Stable Diffusion',
    category: 'AI',
    icon: 'sparkles',
    description: 'AI image generation'
  },
  {
    name: 'ElevenLabs',
    category: 'AI',
    icon: 'mic',
    description: 'AI voice generation'
  },

  // === AUDIO ===
  {
    name: 'Logic Pro',
    category: 'Audio',
    icon: 'music',
    description: 'Music production, 24 releases'
  },
  {
    name: 'Music Production',
    category: 'Audio',
    icon: 'headphones',
    description: 'Composition, arrangement, mixing'
  },

  // === DEVELOPMENT ===
  {
    name: 'Web Development',
    category: 'Tech',
    icon: 'code',
    description: 'Next.js, React, modern web'
  },
  {
    name: 'No-Code Tools',
    category: 'Tech',
    icon: 'zap',
    description: 'Webflow, Framer, rapid prototyping'
  },

  // === STRATEGIC SKILLS ===
  {
    name: 'Campaign Management',
    category: 'Strategy',
    icon: 'calendar',
    description: 'Planning, execution, optimization'
  },
  {
    name: 'Audience Analysis',
    category: 'Strategy',
    icon: 'users',
    description: 'Behavior tracking, segmentation'
  },
  {
    name: 'Brand Building',
    category: 'Strategy',
    icon: 'award',
    description: '250k followers, 8k merch sales'
  },
];
```

**Component Structure:**

```tsx
export default function Skills() {
  return (
    <section className="relative py-32">
      {/* Section Label */}
      <div className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-widest text-gray-600 mb-8"
        >
          (SKILLS & TOOLS)
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
          Comprehensive Toolkit
        </h2>

        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl">
          From AI-powered workflows to proven social strategies—equipped to
          navigate the modern media landscape.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                delay: index * 0.05, // Faster stagger for many items
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="relative bg-zinc-900/30 border border-zinc-800/50
                         rounded-lg p-6 group cursor-pointer
                         hover:bg-zinc-900/50 hover:border-zinc-700/50
                         transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4 text-white/80 group-hover:text-white
                              transition-colors duration-300">
                {/* Use lucide-react icons or emojis */}
                <div className="w-12 h-12 flex items-center justify-center">
                  <SkillIcon name={skill.icon} size={32} />
                </div>
              </div>

              {/* Skill Name */}
              <h3 className="text-base md:text-lg font-medium mb-2
                             group-hover:text-white transition-colors">
                {skill.name}
              </h3>

              {/* Category Label */}
              <p className="text-xs tracking-wider text-gray-500 uppercase">
                {skill.category}
              </p>

              {/* Hover Description (Optional) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-zinc-900/95 rounded-lg
                           flex items-center justify-center p-4
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-300"
              >
                <p className="text-sm text-gray-400 text-center">
                  {skill.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Category Color Coding (Optional):**
```tsx
const categoryColors = {
  Design: 'border-l-4 border-l-purple-500',
  Video: 'border-l-4 border-l-red-500',
  Motion: 'border-l-4 border-l-pink-500',
  Social: 'border-l-4 border-l-blue-500',
  Marketing: 'border-l-4 border-l-green-500',
  AI: 'border-l-4 border-l-yellow-500',
  Audio: 'border-l-4 border-l-indigo-500',
  Tech: 'border-l-4 border-l-cyan-500',
  Strategy: 'border-l-4 border-l-orange-500',
  Creative: 'border-l-4 border-l-teal-500',
};
```

**Icons Source:**
Use `lucide-react` or simple emojis:
```tsx
import { Palette, Video, Layers, Film, Lightbulb, TrendingUp, Brain, Code } from 'lucide-react';

const iconMap = {
  palette: Palette,
  video: Video,
  layers: Layers,
  film: Film,
  lightbulb: Lightbulb,
  // ... etc
};
```

**Placement:** Add after StatsProof section, before Media section

---

### 📐 **PHASE 5: Global Typography System**

**Establish Consistent Scale:**

```css
/* Type Scale (Based on 1.25 ratio - Major Third) */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.25rem;    /* 20px */
--text-xl: 1.5rem;     /* 24px */
--text-2xl: 1.875rem;  /* 30px */
--text-3xl: 2.25rem;   /* 36px */
--text-4xl: 3rem;      /* 48px */
--text-5xl: 3.75rem;   /* 60px */
--text-6xl: 4.5rem;    /* 72px */
```

**Line-Height Ratios:**

```css
/* Optimize for readability */
--leading-tight: 1.25;   /* Headings */
--leading-snug: 1.375;   /* Subheadings */
--leading-normal: 1.5;   /* UI text */
--leading-relaxed: 1.75; /* Body copy */
--leading-loose: 2;      /* Spacious prose */
```

**Letter-Spacing:**

```css
/* Tracking adjustments */
--tracking-tighter: -0.05em;  /* Giant headlines */
--tracking-tight: -0.02em;    /* Large headings */
--tracking-normal: 0;         /* Body */
--tracking-wide: 0.025em;     /* Small caps */
--tracking-wider: 0.05em;     /* Section labels */
--tracking-widest: 0.1em;     /* (SECTION) labels */
```

**Apply System:**

| Element | Size | Line-Height | Tracking | Weight |
|---------|------|-------------|----------|--------|
| Hero Name | clamp(4rem, 8vw, 6rem) | 1.1 | -0.02em | 300 |
| Hero Subtitle | clamp(1rem, 2vw, 1.25rem) | 1.4 | 0.025em | 400 |
| Section Label | 0.75rem | 1.5 | 0.1em | 400 |
| Section Heading | clamp(2rem, 5vw, 4rem) | 1.2 | -0.01em | 300 |
| Project Title | clamp(2.5rem, 4.5vw, 4.5rem) | 1.15 | -0.01em | 300 |
| Body Text | 1.25rem | 1.8 | 0 | 400 |
| Small Text | 0.875rem | 1.6 | 0.025em | 400 |

---

### 🎯 **PHASE 6: Content Updates**

**Fix Remaining Generic Text:**

1. **Hero Subtitle:**
   ```tsx
   // Current (generic):
   "A synthesis of convergence and emergence"

   // Replace with:
   "From 300M plays to 600k kr ad budgets—proven at scale"
   // or
   "Where entertainment background meets commercial strategy"
   ```

2. **Contact Heading:**
   ```tsx
   // Current:
   "Bridging the gap between humans and digital experiences"

   // Replace with:
   "Let's create content that performs"
   // or
   "Ready to bring strategic thinking to your project"
   ```

---

## Implementation Priority

### 🚨 CRITICAL: First Session (DO IMMEDIATELY)
**PHASE 0: Hero Fixes & Entrance Animation**
1. ⚠️ **Fix text overlapping 3D donut** (readability issue!)
   - Implement Option A (z-index layering + backdrop blur)
2. ⚠️ **Fix 3D donut clipping** (hero + footer)
   - Reduce scale, add padding/max-width
3. ⚠️ **Add page entrance animation** (slow fade-in)
   - Staged reveal: 3D → Name → Subtitle → Scroll indicator
4. ⚠️ **Update hero subtitle** (still generic!)
   - Change to "From 300M plays to 600k kr ad budgets—proven at scale"

### Week 1: Typography & Spacing Polish
**PHASE 1: Works Section Typography**
1. ✅ **Reduce title size** (less overwhelming)
2. ✅ **Increase spacing** (32px title→description)
3. ✅ **Better line-height** (1.8 for readability)
4. ✅ **Prominent metrics** (pill backgrounds)
5. ✅ **Optimal reading width** (42ch)

**PHASE 5: Global Typography System**
1. ✅ **Establish type scale**
2. ✅ **Optimize line-heights**
3. ✅ **Letter-spacing rules**
4. ✅ **Update contact heading**

### Week 2: Animation & Content
**PHASE 2: Timeline Animation**
1. ✅ **Replace with real career data** (from CVs)
2. ✅ **Scroll-triggered line drawing**
3. ✅ **Year indicators sequence**
4. ✅ **Content card reveals**
5. ✅ **Achievement badges**

**PHASE 6: Content Fixes**
1. ✅ **All remaining generic text updates**

### Week 3: Structure & New Sections
**PHASE 3: Partners Restructuring**
1. ✅ **Always-visible categories**
2. ✅ **Size variation hierarchy**
3. ✅ **Grouping by type**
4. ✅ **Hover context**

**PHASE 4: Skills Section** (New!)
1. ✅ **Create Skills component**
2. ✅ **30+ skills from CVs**
3. ✅ **Card grid layout** (reference pattern)
4. ✅ **Icons + hover descriptions**
5. ✅ **Place after Stats, before Media**

---

## Additional Suggestions for Cohesion

### 1. **Consistent Section Intros**
Every major section should follow this pattern:
```tsx
<div className="mb-20">
  {/* Section Label */}
  <div className="text-xs tracking-widest text-gray-600 mb-8">
    (SECTION NAME)
  </div>

  {/* Section Heading */}
  <h2 className="text-4xl md:text-6xl font-light mb-6 tracking-tight">
    Section Title
  </h2>

  {/* Optional intro paragraph */}
  <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl">
    Introduction text...
  </p>
</div>
```

### 2. **Scroll Progress Indicators**
Add subtle indicators showing user's position:
- Scrollbar with highlighted sections
- Active nav item highlighting
- Progress dots on side

### 3. **Micro-interactions**
Small delights that add polish:
- Button hover states (scale 1.05, shadow increase)
- Link underline animations (expand from center)
- Image zoom on hover (scale 1.1)
- Cursor follow effects (already have!)

### 4. **Loading States**
For images and 3D elements:
- Skeleton screens
- Blur-up technique
- Progressive enhancement

### 5. **Accessibility**
- Ensure all animations respect `prefers-reduced-motion`
- Keyboard navigation for all interactive elements
- Focus states visible and styled
- ARIA labels for screen readers

### 6. **Performance**
- Lazy load images below fold
- Intersection Observer for animations
- GPU-accelerated transforms only
- Debounce scroll listeners

---

## Key Design Principles to Follow

### ✨ **White Space is Content**
- Don't fear empty space—it creates rhythm
- More space = more importance
- Tight space = grouped relationship

### 🎨 **Hierarchy Through Contrast**
- Size (primary tool)
- Weight (secondary)
- Color (subtle reinforcement)
- Position (left-aligned = strong, centered = special)

### 🔄 **Consistency Breeds Familiarity**
- Same spacing between similar elements
- Same animation timings (0.165s stagger!)
- Same easing functions ([0.4, 0, 0.2, 1])
- Same section label style everywhere

### ⚡ **Animation Purpose**
- Reveal (fade in, slide up)
- Emphasize (scale, color change)
- Guide (move attention)
- Delight (playful micro-interactions)
- **Never** animate just because you can!

### 📖 **Readability First**
- 42-66 characters per line (optimal)
- 1.5-1.8 line-height for body
- Adequate contrast (AA minimum)
- Font size never below 16px on mobile

---

## Checklist Before Implementation

- [ ] Review typography scale with user
- [x] Get skills section reference image ✅ RECEIVED!
- [x] Confirm timeline content from CVs ✅ DOCUMENTED
- [x] Decide on partners grouping approach ✅ PLANNED
- [ ] Test animations on slow devices
- [ ] Validate color contrast ratios
- [ ] Check mobile responsiveness
- [ ] Verify accessibility standards

---

## Notes

- **Reference site aesthetic:** Clean, minimal, generous whitespace, subtle chromatic effects
- **Your brand:** Bold, confident, numbers-driven, proven track record
- **Sweet spot:** Professional minimalism with personality through content, not decoration
- **Golden rule:** Every element should have a purpose. If it doesn't add value, remove it.

**Critical User Feedback Addressed:**
1. ✅ Hero text overlapping - PHASE 0 solutions provided
2. ✅ 3D donut clipping - Fix documented
3. ✅ No entrance animation - Staged reveal planned
4. ✅ Skills section reference - Complete design created
5. ✅ Timeline needs life - Scroll animations planned
6. ✅ Partners structure - Grouping + hierarchy designed

**Next Steps:**
1. ✅ User reviews plan - DONE
2. ✅ Skills reference provided - DONE
3. 🚀 **READY TO IMPLEMENT!**
4. Start with PHASE 0 (critical fixes)
5. Progress through phases systematically
6. Test, refine, polish after each phase

