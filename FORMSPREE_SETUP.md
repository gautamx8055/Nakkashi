# Formspree Setup — Wiring Up the Three Forms

This site has three forms that currently throw away submissions (they just show an `alert()`). This guide walks through wiring all three to **Formspree** so leads actually land in your inbox.

**Forms in this project:**
1. Contact form — `src/pages/contact.astro` (line 18)
2. Quote form — `src/pages/quote.astro` (line 51)
3. Lead popup form — `src/components/LeadPopup.astro` (line 54)

---

## 1. Sign up at Formspree

1. Go to **https://formspree.io** and create a free account.
2. Verify your email — that becomes the inbox where leads land.

Free tier: **50 submissions per month per form**. Plenty to start.

---

## 2. Create three forms in the dashboard

In the Formspree dashboard, click **"+ New Form"** three times. Name them:

| Form name in Formspree   | Belongs to                |
| ------------------------ | ------------------------- |
| `Nakkashi — Contact`     | `src/pages/contact.astro` |
| `Nakkashi — Quote`       | `src/pages/quote.astro`   |
| `Nakkashi — Lead Popup`  | `src/components/LeadPopup.astro` |

Each form gives you an endpoint URL that looks like:

```
https://formspree.io/f/abcd1234
```

Copy all three IDs — you'll paste them in the next step.

> **Tip:** Separating them lets you see in the dashboard *which* form a lead came from. You could also use a single form with a hidden `<input name="source" value="contact">` field if you want to save form-quota budget later.

---

## 3. Edit the three form tags

For each `<form>` tag, do **two things**:
- Set `action="https://formspree.io/f/YOUR_ID"`
- Remove the fake `onsubmit` handler

### Contact form (`src/pages/contact.astro:18`)

**Before:**
```html
<form name="contact" method="POST" onsubmit="event.preventDefault(); alert('Thanks! Our team will reach out shortly.'); this.reset();">
```

**After:**
```html
<form name="contact" method="POST" action="https://formspree.io/f/YOUR_CONTACT_ID">
```

### Quote form (`src/pages/quote.astro:51`)

**Before:**
```html
<form name="quote" method="POST" onsubmit="event.preventDefault(); alert('Thanks! We will respond within 24 hours.'); this.reset();">
```

**After:**
```html
<form name="quote" method="POST" action="https://formspree.io/f/YOUR_QUOTE_ID">
```

### Lead popup (`src/components/LeadPopup.astro:54`)

**Before:**
```html
<form class="lp-form" id="leadPopupForm" onsubmit="event.preventDefault(); document.getElementById('leadPopup').dispatchEvent(new CustomEvent('lp-submit'));">
```

This one is trickier because the existing `onsubmit` plays a slide-out animation via a custom event. You have two choices:

**Option A — Easy (lose the animation):**
```html
<form class="lp-form" id="leadPopupForm" method="POST" action="https://formspree.io/f/YOUR_LEADPOPUP_ID">
```
The browser will navigate away on submit. Use a thank-you page (see Step 4) so users still get feedback.

**Option B — Fancier (keep the animation):**
Replace the `onsubmit` with a fetch-based submission:
```html
<form class="lp-form" id="leadPopupForm" method="POST" action="https://formspree.io/f/YOUR_LEADPOPUP_ID">
```
Then in the popup script, intercept submit:
```js
document.getElementById('leadPopupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const res = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  });
  if (res.ok) {
    document.getElementById('leadPopup').dispatchEvent(new CustomEvent('lp-submit'));
  } else {
    alert('Something went wrong. Please try again.');
  }
});
```

---

## 4. Add a thank-you page (optional but nice)

By default Formspree shows their own confirmation page. To bring users back to your site:

1. Create `src/pages/thanks.astro` with a brief "Thank you, we'll be in touch" message.
2. Inside **each** form, add a hidden input that tells Formspree where to redirect:

```html
<input type="hidden" name="_next" value="https://gautamx8055.github.io/Nakkashi/thanks" />
```

Replace the URL with whatever your final domain is.

---

## 5. Spam protection (one-line)

Inside each form, add a honeypot field that bots fill out but humans never see:

```html
<input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" />
```

Formspree automatically drops any submission where `_gotcha` is filled in.

For even more protection, enable **reCAPTCHA** in the Formspree dashboard (Form Settings → Spam Filtering).

---

## 6. Test locally

```bash
npm run dev
```

For each form:
- Submit with a real email address.
- Check the **Formspree dashboard** → submission should appear.
- Check **your inbox** → email should arrive.
- If you set up `/thanks`, check the redirect lands there.

> Formspree's free tier requires email confirmation on the **first** submission to each form. Submit once with your own email to activate it.

---

## 7. Deploy

```bash
git add -A
git commit -m "wire forms to Formspree"
git push
```

GitHub Pages will rebuild automatically. Live site updates in ~1–2 minutes.

---

## Quick reference — what changes in code

| File                                  | Line | Change                                     |
| ------------------------------------- | ---- | ------------------------------------------ |
| `src/pages/contact.astro`             | 18   | Replace `onsubmit` with `action` URL       |
| `src/pages/quote.astro`               | 51   | Replace `onsubmit` with `action` URL       |
| `src/components/LeadPopup.astro`      | 54   | Replace `onsubmit` with `action` URL (+ optional fetch script) |
| All three forms                       | —    | Add `_gotcha` honeypot input               |
| All three forms (optional)            | —    | Add `_next` redirect input                 |

---

## When to outgrow Formspree

Move to **Supabase** or a similar backend when you need:
- A leads dashboard your team can log into
- Auto-replies via WhatsApp/SMS on submit
- Lead scoring or assignment to specific staff
- More than ~500 submissions/month combined
- CRM integration (Zoho, HubSpot, etc.)

Until then, Formspree is the right tool — zero infra, fast to set up, free for this volume.
