# Nakkashi Website — Prioritised Fix Plan

Based on the digital audit (Nakkashi_Website_Audit.pdf, Section 06).  
Ordered HIGH → MEDIUM → LOW, matching expected impact vs. effort.

---

## HIGH PRIORITY

### 1. Rebuild Homepage/Services Messaging Around 3-Tier Brand Structure & Tagline
**Effort:** Medium (copy + layout)  
**Why:** Closes the biggest gap between the brand you've built and what visitors actually see.

**What to change:**
- `src/pages/index.astro` — Hero section: update the eyebrow tag from *"Premium Painting & Texture Execution Partner"* to reflect the 3-tier structure
- The three tiers should be framed clearly in the hero and services section:
  1. **Residential** — Home / Villa / Apartment owners
  2. **Commercial / Hospitality** — Offices, hotels, retail
  3. **Architects & Interior Designers (A&ID)** — Trade program, Studio Wall
- Rewrite the hero `<h1>` and `<p class="lead">` so the tagline is prominent and brand-positioning is front-loaded
- `src/pages/services.astro` — Group the 6 service cards under the 3-tier headings rather than listing them as a flat grid
- Update meta title in `src/layouts/Layout.astro` if needed to reflect the evolved positioning

**Specific lines to target:**
- `src/pages/index.astro:94–103` — Hero eyebrow + H1 + lead paragraph
- `src/pages/index.astro:190–214` — Services section heading & grid

---

### 2. Replace Discount Banner with "Late? It's Free" Guarantee Messaging
**Effort:** Low  
**Why:** The current "25% OFF" badges and "Exclusive Deal — Only For You" promo strip erode premium brand perception. Replacing with the on-time delivery guarantee is a genuine differentiator.

**What to change:**
- `src/components/LeadPopup.astro:14–19` — Replace the promo strip copy:
  - Current: *"Exclusive Deal — Only For You / Give us your paint work. We'll do your Feature Wall — complimentary."*
  - New: *"India-First Commitment / Late? — We guarantee on-time handover or your next room is on us."*
- `src/pages/index.astro:59–64` — Remove `off: '25% OFF'` from the `trending` array; replace badge text with something brand-positive (e.g. "Most Loved", "Editor's Pick", "Bestseller")
- `src/pages/index.astro:348–350` — The `<span class="trend-badge">` currently renders `{t.off}`; update the badge to show the new label
- `src/pages/index.astro:136–147` — The hero's float-badge already says *"100% On-Time Site Handovers"* — tie this more explicitly to the "Late? It's Free" guarantee copy

---

### 3. Consolidate to a Single Primary Lead Form + Floating WhatsApp Button
**Effort:** Low – Medium  
**Why:** Currently there are three overlapping capture points (promo strip, 15-second popup, inline homepage form). This fragments the CTA and confuses visitors.

**What to change:**
- **Remove the 15-second auto popup** (`src/components/LeadPopup.astro:462–528`) — the timed popup is intrusive and duplicates the inline form. Disable or delete the `setTimeout` that triggers it, or merge the popup into a single opt-in trigger (e.g. scroll-trigger at 80%)
- **Keep one primary form** — The inline form on the homepage (`src/pages/index.astro:217–313`) is the better candidate; ensure it's the single source of truth for lead capture
- **Keep the promo strip** as a lightweight entry point but have it scroll to the inline form rather than `/quote`
- **Add a floating WhatsApp button** — Add to `src/layouts/Layout.astro` (or a new `FloatingWhatsApp.astro` component):
  ```html
  <a href="https://wa.me/917400640093" class="wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <!-- WhatsApp SVG icon -->
  </a>
  ```
  Position fixed, bottom-right, above the promo strip. Style with green background (`#25D366`), white icon, subtle drop shadow. Ensure it doesn't overlap the promo strip on mobile.
- **Wire the inline form's Formspree endpoint** — `src/pages/index.astro:236` has `action="YOUR_FORMSPREE_ENDPOINT"` which is a placeholder; replace with the same live endpoint used in the popup (`https://formspree.io/f/xlgypabo`)

---

## MEDIUM PRIORITY

### 4. Add Founder Credibility Section (Asian Paints / Birla Opus Background)
**Effort:** Low  
**Why:** Strong, currently unused trust signal for a high-consideration purchase. Naming the brands the founder worked with directly addresses "who trained this person?"

**What to change:**
- `src/pages/about.astro:96–113` — The existing `founder-block` quote from Shubham Mehrishi exists but lacks professional background detail
- Add a credential sub-section beneath the quote:
  - **Trained/certified with:** Asian Paints (Royale / Apcolite program), Birla Opus, [any others]
  - **Years of hands-on experience** before founding Nakkashi
  - Optional: add a badge strip with brand logos (Asian Paints, Birla Opus) if logo usage is permitted
- Consider surfacing one line of this on the homepage About snippet (`src/pages/index.astro:156–187`) — e.g., add a credibility line below the paragraph: *"Founded by a certified execution partner of Asian Paints and Birla Opus"*

---

### 5. Replace Placeholder/Generic Gallery Images with Real Project Photography
**Effort:** Medium (needs photoshoot)  
**Why:** Texture swatches used as "project photos" directly harm perceived credibility and design quality.

**What to change:**
- `src/pages/index.astro:389–399` — The showcase/gallery section uses `/Texture 8–12.png` as project thumbnails with fabricated names ("Hillside Villa Exterior", "Gilded Living Room", etc.). These must be replaced with actual before/after project photos once available.
- `src/pages/gallery.astro` — Full gallery page also needs real photography
- **Interim step (can do now):** Add a clear note/watermark or placeholder treatment so the textures read as "sample textures" rather than implying they are completed project photos. Alternatively, reduce the gallery section on the homepage to just 2–3 real photos and remove fakes.
- Create an `images/projects/` folder in `/public` to organise real photos when they arrive

---

### 6. Add Named Testimonials with Photos
**Effort:** Low (needs client outreach)  
**Why:** Current testimonials use initials only (RA, VM, SK). Named testimonials with real faces dramatically improve trust for premium/HNI decision-making.

**What to change:**
- `src/pages/index.astro:409–430` — Each `quote-card` has a `.av` div with initials; replace with `<img>` once client photos are obtained
- **Interim step (can do now):** 
  - Add a `<img>` placeholder in each `.who` block with a CSS fallback to the initial avatar
  - Consider adding the client's locality/project type for specificity (e.g., *"3 BHK Renovation — Greater Kailash"*)
  - Reach out to the 3 existing named clients (Riya Arora, Vikram Mehta, Sunita Kapoor) for permission to use their names and a headshot

---

### 7. Build a Dedicated A&ID Landing Section (Trade Terms, Studio Wall Offer)
**Effort:** Medium  
**Why:** Architects & Interior Designers are a high-value referral channel. Speaking to them generically is a missed conversion. A named section signals that Nakkashi is a serious trade partner.

**What to change:**
- **New page:** Create `src/pages/trade.astro` (or `/aid`) with:
  - Headline: *"For Architects & Interior Designers"*
  - Trade program benefits: priority scheduling, dedicated project manager, trade pricing/terms, credit terms
  - **Studio Wall offer**: Describe what this is — a complimentary feature wall for the designer's own studio/showroom as an introduction to Nakkashi quality
  - Process specific to A&ID clients
  - A separate lead form or WhatsApp link labelled *"Join the Trade Program"*
- **Homepage hook:** Add a brief A&ID callout section (`src/pages/index.astro`) — a dark banner before the CTABand linking to the new trade page
- **Navigation:** Add "For Designers" or "Trade Program" link to `src/components/Header.astro` and `src/components/Footer.astro`

---

## LOW PRIORITY

### 8. Fix Dead Footer Social Links
**Effort:** Very low  
**Why:** `href="#"` social links read as unfinished and undermine brand professionalism.

**What to change:**
- `src/components/Footer.astro:20–37` — Three links use `href="#"`:
  - Instagram: Replace `href="#"` with the actual Instagram profile URL (e.g. `https://www.instagram.com/nakkashi_painting`)
  - Facebook: Replace `href="#"` with the actual Facebook page URL
  - LinkedIn: Replace `href="#"` with the actual LinkedIn company page URL
- If any social profile does not exist yet, **remove that icon** entirely rather than leaving a dead link
- The WhatsApp link (`href="https://wa.me/917400640093"`) is already live — no change needed

---

### 9. Re-evaluate Displayed Base Pricing Against Tier Positioning
**Effort:** Low  
**Why:** Anchoring premium-tier visitors to *"from ₹18/sq.ft."* can pre-qualify them downward before a conversation starts.

**What to change:**
- `src/pages/index.astro:232` — The inline lead form perk reads: *"Premium texture execution from ₹18/sq.ft."*
- Replace with a value-based statement that doesn't anchor low:
  - Option A: *"Transparent, tier-based pricing — no surprises"*
  - Option B: *"Bespoke pricing matched to your finish level"*
  - Option C: *"Starting prices shared after your free site visit"*
- Review `src/pages/services.astro` for any other visible price anchors and apply the same treatment

---

## Sequencing Recommendation

Per the audit: **start with the three HIGH items first** — they require no photography and address brand gap + conversion fragmentation in one pass.

| Phase | Actions | Est. Effort |
|-------|---------|-------------|
| Phase 1 | Items 1, 2, 3 | 1–2 days dev |
| Phase 2 | Items 4, 6, 8, 9 | 1 day dev (client outreach runs in parallel) |
| Phase 3 | Item 7 (A&ID page) | 1–2 days dev |
| Phase 4 | Item 5 (real photography) | Depends on photoshoot schedule |

---

## Files Affected Summary

| File | Items |
|------|-------|
| `src/pages/index.astro` | 1, 2, 3, 4, 5, 6, 9 |
| `src/components/LeadPopup.astro` | 2, 3 |
| `src/components/Footer.astro` | 8 |
| `src/components/Header.astro` | 7 |
| `src/pages/about.astro` | 4 |
| `src/pages/services.astro` | 1, 9 |
| `src/pages/gallery.astro` | 5 |
| `src/layouts/Layout.astro` | 3 (floating WhatsApp) |
| `src/pages/trade.astro` *(new)* | 7 |
