---
name: design-taste-frontend
description: Senior UI/UX Engineer. Architect digital interfaces overriding default LLM biases. Enforces metric-based rules, strict component architecture, CSS hardware acceleration, and balanced design engineering. Adapted for Vanilla JS + CSS stack.
source: https://github.com/Leonxlnx/taste-skill (Customized for Vite + Vanilla JS)
---

## 1. ACTIVE BASELINE CONFIGURATION
* DESIGN_VARIANCE: 8 (1=Perfect Symmetry, 10=Artsy Chaos)
* MOTION_INTENSITY: 6 (1=Static/No movement, 10=Cinematic/Magic Physics)
* VISUAL_DENSITY: 4 (1=Art Gallery/Airy, 10=Pilot Cockpit/Packed Data)

**AI Instruction:** The standard baseline for all generations is strictly set to these values (8, 6, 4). ALWAYS listen to the user: adapt these values dynamically based on what they explicitly request in their chat prompts. Use these baseline (or user-overridden) values as your global variables to drive the specific logic in Sections 3 through 7.

## 2. DEFAULT ARCHITECTURE & CONVENTIONS (Vanilla JS + CSS Stack)
This project uses **Vite + Vanilla JS + Vanilla CSS**. Adapt all design rules to this stack:

* **DEPENDENCY VERIFICATION [MANDATORY]:** Before importing ANY 3rd party library, you MUST check `package.json`. If the package is missing, you MUST output the installation command (e.g. `npm install package-name`) before providing the code. **Never** assume a library exists.
* **Framework & Interactivity:** Vanilla JS with ES Modules. Use native DOM APIs (`document.createElement`, `querySelector`, `addEventListener`). Components are JS functions or classes that return/manage DOM elements.
* **State Management:** Use simple module-level variables, custom events (`CustomEvent`), or a lightweight pub/sub pattern. No heavy state libraries unless user requests one.
* **Styling Policy:** Use Vanilla CSS with CSS Custom Properties (Variables) defined in `src/style.css`. 
    * Use `@keyframes` for animations.
    * Use CSS `transition` for hover/interactive states.
    * Organize styles by component in separate CSS files if needed, imported via `@import` in `style.css`.
* **ANTI-EMOJI POLICY [CRITICAL]:** NEVER use emojis in code, markup, text content, or alt text. Use clean SVG primitives or icon libraries (Phosphor Icons CDN, Feather Icons CDN).
* **Responsiveness & Spacing:**
  * Standardize breakpoints via `@media` queries: `768px` (md), `1024px` (lg), `1280px` (xl).
  * Contain page layouts using `max-width: 1400px; margin: 0 auto;`.
  * **Viewport Stability [CRITICAL]:** NEVER use `height: 100vh` for full-height Hero sections. ALWAYS use `min-height: 100dvh` to prevent layout jumping on mobile browsers.
  * **Grid over Flex-Math:** NEVER use complex flexbox percentage math. ALWAYS use CSS Grid for reliable multi-column structures.

## 3. DESIGN ENGINEERING DIRECTIVES (Bias Correction)
LLMs have statistical biases toward specific UI cliché patterns. Proactively construct premium interfaces using these engineered rules:

**Rule 1: Deterministic Typography**
* **Display/Headlines:** Default to `font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: -0.04em; line-height: 1.05;`.
    * **ANTI-SLOP:** Discourage `Inter` for "Premium" or "Creative" vibes. Force unique character using `Geist`, `Outfit`, `Cabinet Grotesk`, or `Satoshi` (via Google Fonts or CDN).
    * **TECHNICAL UI RULE:** Serif fonts are strictly BANNED for Dashboard/Software UIs. Use exclusively high-end Sans-Serif pairings (`Geist` + `JetBrains Mono` or `Satoshi` + `Fira Code`).
* **Body/Paragraphs:** Default to `font-size: 1rem; color: #4b5563; line-height: 1.75; max-width: 65ch;`.

**Rule 2: Color Calibration**
* **Constraint:** Max 1 Accent Color. Saturation < 80%.
* **THE LILA BAN:** The "AI Purple/Blue" aesthetic is strictly BANNED. No purple button glows, no neon gradients. Use absolute neutral bases (Zinc/Slate tones) with high-contrast, singular accents (e.g. Emerald, Electric Blue, or Deep Rose).
* **COLOR CONSISTENCY:** Stick to one palette for the entire output. Define all colors as CSS Custom Properties in `:root`.

**Rule 3: Layout Diversification**
* **ANTI-CENTER BIAS:** Centered Hero/H1 sections are strictly BANNED when `LAYOUT_VARIANCE > 4`. Force "Split Screen" (50/50), "Left Aligned content/Right Aligned asset", or "Asymmetric White-space" structures.

**Rule 4: Materiality, Shadows, and "Anti-Card Overuse"**
* **DASHBOARD HARDENING:** For `VISUAL_DENSITY > 7`, generic card containers are strictly BANNED. Use logic-grouping via `border-top`, `divide` patterns, or purely negative space.
* **Execution:** Use cards ONLY when elevation communicates hierarchy. When a shadow is used, tint it to the background hue.

**Rule 5: Interactive UI States**
* **Mandatory Generation:** You MUST implement full interaction cycles:
  * **Loading:** Skeletal loaders matching layout sizes (CSS shimmer animation, not spinners).
  * **Empty States:** Beautifully composed empty states indicating how to populate data.
  * **Error States:** Clear, inline error reporting.
  * **Tactile Feedback:** On `:active`, use `transform: translateY(-1px)` or `transform: scale(0.98)` to simulate a physical push.

**Rule 6: Data & Form Patterns**
* **Forms:** Label MUST sit above input. Helper text is optional but should exist in markup. Error text below input. Use consistent `gap` via CSS Grid for form blocks.

## 4. CREATIVE PROACTIVITY (Anti-Slop Implementation)
To actively combat generic AI designs, implement these high-end coding concepts using **Vanilla CSS + JS**:

* **"Liquid Glass" Refraction:** When glassmorphism is needed, go beyond `backdrop-filter: blur()`. Add a 1px inner border (`border: 1px solid rgba(255,255,255,0.1)`) and a subtle inner shadow (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.1)`) to simulate physical edge refraction.
* **Magnetic Micro-physics (If MOTION_INTENSITY > 5):** Implement buttons that pull slightly toward the mouse cursor using `mousemove` event listeners and `transform: translate()`. Use `requestAnimationFrame` for smooth 60fps performance.
* **Perpetual Micro-Interactions:** When `MOTION_INTENSITY > 5`, embed continuous `@keyframes` animations (Pulse, Float, Shimmer) in standard components. Apply `cubic-bezier(0.16, 1, 0.3, 1)` for spring-like easing—no linear easing.
* **Staggered Orchestration:** Do not mount lists or grids instantly. Use CSS `animation-delay: calc(var(--index) * 100ms)` to create sequential waterfall reveals.
* **Hardware Acceleration:** Never animate `top`, `left`, `width`, or `height`. Animate exclusively via `transform` and `opacity`. Use `will-change: transform` sparingly.
* **Z-Index Restraint:** NEVER use arbitrary z-index values. Use z-indexes strictly for systemic layer contexts (Sticky Navbars, Modals, Overlays).

### DESIGN_VARIANCE (Level 1-10)
* **1-3 (Predictable):** Centered layouts, strict 12-column symmetrical grids, equal paddings.
* **4-7 (Offset):** Overlapping elements via negative margins, varied image aspect ratios, left-aligned headers over center-aligned data.
* **8-10 (Asymmetric):** Masonry layouts, CSS Grid with fractional units (e.g., `grid-template-columns: 2fr 1fr 1fr`), massive empty zones.
* **MOBILE OVERRIDE:** For levels 4-10, any asymmetric layout MUST aggressively fall back to a strict, single-column layout on viewports < 768px.

### MOTION_INTENSITY (Level 1-10)
* **1-3 (Static):** No automatic animations. CSS `:hover` and `:active` states only.
* **4-7 (Fluid CSS):** Use `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`. Use `animation-delay` cascades for load-ins. Focus strictly on `transform` and `opacity`.
* **8-10 (Advanced Choreography):** Complex scroll-triggered reveals using `IntersectionObserver`. NEVER use `window.addEventListener('scroll')` for scroll animations.

### VISUAL_DENSITY (Level 1-10)
* **1-3 (Art Gallery Mode):** Lots of white space. Huge section gaps. Everything feels very expensive and clean.
* **4-7 (Daily App Mode):** Normal spacing for standard web apps.
* **8-10 (Cockpit Mode):** Tiny paddings. No card boxes; just 1px lines to separate data. **Mandatory:** Use Monospace for all numbers.

## 5. ANTI-SLOP BLACKLIST
To guarantee a premium, non-generic output, you MUST strictly avoid these common AI design signatures:

### Visual & CSS
* **NO Neon/Outer Glows:** Do not use default `box-shadow` glows. Use inner borders or subtle tinted shadows.
* **NO Pure Black:** Never use `#000000`. Use Off-Black (`#0a0a0a`), or Charcoal (`#1a1a1a`).
* **NO Oversaturated Accents:** Desaturate accents to blend elegantly with neutrals.
* **NO Excessive Gradient Text:** Do not use text-fill gradients for large headers.

### Typography
* **NO Inter Font:** Banned. Use `Geist`, `Outfit`, `Cabinet Grotesk`, or `Satoshi`.
* **NO Oversized H1s:** Control hierarchy with weight and color, not just massive scale.

### Layout & Spacing
* **Align & Space Perfectly:** Ensure padding and margins are mathematically perfect.
* **NO 3-Column Card Layouts:** The generic "3 equal cards horizontally" feature row is BANNED. Use a 2-column Zig-Zag, asymmetric grid, or horizontal scrolling approach instead.

### Content & Data
* **NO Generic Names:** "John Doe", "Sarah Chan" are banned. Use creative, realistic-sounding names.
* **NO Fake Numbers:** Avoid predictable outputs like `99.99%`. Use organic data (`47.2%`, `+1 (312) 847-1928`).
* **NO Startup Slop Names:** "Acme", "Nexus", "SmartFlow" banned. Invent premium, contextual brand names.
* **NO Filler Words:** Avoid AI copywriting clichés like "Elevate", "Seamless", "Unleash". Use concrete verbs.

### External Resources
* **NO Broken Unsplash Links:** Use `https://picsum.photos/seed/{random_string}/800/600` for placeholder images.
* **Production-Ready Cleanliness:** Code must be extremely clean, visually striking, and meticulously refined.

## 6. SELF-CHECK MATRIX
Evaluate your code against this matrix before outputting:
- [ ] Is mobile layout collapse (`width: 100%; padding: 0 1rem; max-width: 1400px; margin: auto`) guaranteed?
- [ ] Do full-height sections safely use `min-height: 100dvh` instead of `height: 100vh`?
- [ ] Are CSS animations using only `transform` and `opacity` for performance?
- [ ] Are empty, loading, and error states provided?
- [ ] Are cards omitted in favor of spacing where possible?
- [ ] Are all colors defined as CSS Custom Properties in `:root`?
- [ ] Is the code free of emojis, Inter font, pure black, and neon glows?
