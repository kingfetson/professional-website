# 🔧 Plumbing Experts Nairobi — Website

> A professional, mobile-first landing page for a 24/7 emergency plumbing business in Nairobi, Kenya — with live Google Sheets lead capture built in.

---

## ✨ Live Preview

| Section | Description |
|---|---|
| **Hero** | Full-screen background, animated stats, dual CTA buttons |
| **Services** | 4-card grid with hover effects & featured card variant |
| **Why Us** | Dark section with feature checklist & trust badge |
| **Testimonials** | 3-column review grid |
| **Contact** | Split form + info panel, embedded Google Map |
| **Footer** | Links, social icons, emergency contacts |

---

## 📁 Project Structure

```
plumbing-experts-nairobi/
│
├── index.html       # Main HTML — semantic, accessible markup
├── style.css        # All styles — CSS variables, responsive layout
├── script.js        # All JavaScript — nav, form, animations, Sheets
└── Code.gs          # Google Apps Script — Sheets webhook backend
```

> **No build tools. No dependencies. No npm.** Just three files — open `index.html` in a browser and it works.

---

## 🚀 Quick Start

### 1. Clone or Download

```bash
git clone https://github.com/yourname/plumbing-experts-nairobi.git
cd plumbing-experts-nairobi
```

Or simply download the ZIP and extract it.

### 2. Open Locally

```bash
# Option A — just open the file
open index.html

# Option B — serve with VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

### 3. Customise Your Details

Search and replace the placeholder values across the files:

| Placeholder | Replace With | File(s) |
|---|---|---|
| `+254700000000` | Your real phone number | `index.html` |
| `hello@plumbingexperts.co.ke` | Your real email | `index.html` |
| `YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` | Your Apps Script URL | `script.js` |
| `YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` | Same URL | `script.js` |

---

## 📊 Google Sheets Integration

Every contact form submission is captured live into a Google Sheet — no database, no server, no cost.

### How It Works

```
User fills form  →  script.js POSTs data  →  Code.gs receives it  →  Row appended to Sheet
```

### Setup (5 minutes)

**Step 1 — Create a Google Sheet**

Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
Name it anything, e.g. `Plumbing Experts – Leads`.

**Step 2 — Open Apps Script**

Inside the sheet: **Extensions → Apps Script**

**Step 3 — Paste the backend code**

Delete any existing code. Paste the entire contents of `Code.gs`.

Optionally set your email for new-lead alerts:
```javascript
var NOTIFY_EMAIL = 'you@example.com';  // line 44 in Code.gs
```

**Step 4 — Deploy as a Web App**

```
Deploy → New Deployment
  Type        →  Web App
  Execute as  →  Me
  Who has access  →  Anyone
```

Click **Deploy** → copy the Web App URL.

**Step 5 — Connect to the frontend**

Open `script.js` and paste the URL:

```javascript
// Line 14 in script.js
const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
```

**Step 6 — Test it**

Submit the contact form on your site. Within seconds, a new row appears in the sheet.

### Sheet Column Structure

| Column | Description |
|---|---|
| **Timestamp** | Date & time (Nairobi timezone, EAT) |
| **Full Name** | Submitted name |
| **Phone** | Phone number |
| **Issue Type** | Dropdown selection |
| **Message** | Free-text description |
| **Status** | Starts as `New` — update to `Called`, `Booked`, `Done` |
| **Page URL** | Which page the form was on |
| **User Agent** | Browser/device info |

> 💡 **Tip:** Use Google Sheets' built-in **Data Validation** on the Status column to create a dropdown: `New → Called → Booked → Done → Closed`.

---

## 🎨 Design System

### Fonts

| Role | Font | Weight |
|---|---|---|
| Display / Headings | [Syne](https://fonts.google.com/specimen/Syne) | 700, 800 |
| Body / UI | [DM Sans](https://fonts.google.com/specimen/DM+Sans) | 300, 400, 500 |

### Colour Palette

```css
--navy:      #0b1120   /* Primary dark background */
--blue:      #1d6ef5   /* Brand accent / links / CTA */
--copper:    #e8722a   /* Hero CTA / warm highlight */
--wa-green:  #25D366   /* WhatsApp elements */
--white:     #ffffff
--off-white: #f7f8fc   /* Section backgrounds */
--slate:     #64748b   /* Body text / muted */
```

### Breakpoints

| Breakpoint | Target |
|---|---|
| `≤ 1024px` | Tablet — single-column why/contact sections |
| `≤ 768px` | Mobile — hamburger nav, stacked layout |
| `≤ 480px` | Small mobile — full-width CTAs |

---

## ⚙️ Features

- ✅ **Fully responsive** — mobile-first, tested at all breakpoints
- ✅ **Sticky header** — transparent → solid on scroll with shadow
- ✅ **Mobile drawer navigation** — slide-in panel with overlay & Escape key support
- ✅ **Smooth scroll** — offset-aware (accounts for fixed header height)
- ✅ **Scroll reveal animations** — `IntersectionObserver`-based, no library needed
- ✅ **Form validation** — client-side name, phone (9–15 digit) checks
- ✅ **Google Sheets integration** — live lead capture via Apps Script webhook
- ✅ **Email notifications** — optional new-lead alert to your inbox (via `Code.gs`)
- ✅ **Floating WhatsApp button** — always-visible with hover tooltip
- ✅ **Embedded Google Map** — lazy-loaded service area map
- ✅ **Zero dependencies** — no npm, no bundler, no framework
- ✅ **SEO meta tags** — title, description, keywords, author

---

## 📞 Contact Channels (Configured in HTML)

| Channel | Element | Location in `index.html` |
|---|---|---|
| Phone | `href="tel:..."` | Header, Hero, Footer, Contact section |
| WhatsApp | `href="https://wa.me/..."` | Header, Hero, Float button, Footer |
| Email | Static text | Contact section, Footer |

---

## 🌍 Deployment Options

### Option A — Static Hosting (Recommended)

Upload `index.html`, `style.css`, and `script.js` to any static host:

| Platform | Free Tier | Notes |
|---|---|---|
| [Netlify](https://netlify.com) | ✅ Yes | Drag & drop deploy |
| [Vercel](https://vercel.com) | ✅ Yes | Connect GitHub repo |
| [GitHub Pages](https://pages.github.com) | ✅ Yes | Push to `gh-pages` branch |
| [Cloudflare Pages](https://pages.cloudflare.com) | ✅ Yes | Fast global CDN |

> ⚠️ `Code.gs` is **not** deployed here — it lives in Google Apps Script, not your hosting provider.

### Option B — Traditional cPanel Hosting

Upload via FTP/File Manager to your `public_html` folder. Point your domain to the folder. Done.

---

## 🔧 Customisation Guide

### Change Business Name & Logo

In `index.html`, search for `Plumbing` and `Experts` in the logo and footer elements.
The logo uses a Font Awesome icon (`fa-droplet`) — swap it for any FA icon.

### Add / Remove Service Cards

Each card in the Services section follows this structure:

```html
<article class="service-card">
  <div class="service-num">05</div>
  <div class="service-icon"><i class="fas fa-YOUR-ICON"></i></div>
  <h3>Your Service Title</h3>
  <p>Short description of what this service covers.</p>
  <div class="service-arrow"><i class="fas fa-arrow-right"></i></div>
</article>
```

Add `class="featured"` to one card to give it the dark Navy highlight treatment.

### Add a Testimonial

```html
<div class="testi-card">
  <div class="testi-stars">
    <i class="fas fa-star"></i> <!-- repeat ×5 for 5 stars -->
  </div>
  <p>"Your client quote here."</p>
  <div class="testi-author">
    <div class="testi-avatar">AB</div> <!-- initials -->
    <div>
      <strong>Client Name</strong>
      <span>Area, Nairobi</span>
    </div>
  </div>
</div>
```

### Swap the Hero Image

In `style.css`, find `.hero-bg` and update the `background-image` URL:

```css
.hero-bg {
  background: url('YOUR_IMAGE_URL_HERE') center/cover no-repeat;
}
```

---

## 📋 Checklist Before Going Live

- [ ] Replace `+254700000000` with your real phone number (all instances)
- [ ] Replace email placeholder with your real email
- [ ] Deploy `Code.gs` and paste Web App URL into `script.js`
- [ ] Test the contact form — confirm row appears in Google Sheet
- [ ] Set `NOTIFY_EMAIL` in `Code.gs` if you want email alerts
- [ ] Replace hero background image URL with a licensed/owned photo
- [ ] Update social media links in footer (`href="#"` placeholders)
- [ ] Add a real favicon (`<link rel="icon" ...>` in `<head>`)
- [ ] Test on mobile (Chrome DevTools → Toggle device toolbar)
- [ ] Verify Google Map shows the right area

---

## 📄 License

This project is released for personal and commercial use.
Feel free to adapt it for your own plumbing business or clients.

---

<div align="center">

**Built for Nairobi. Ready for the world.**

*Fast · Reliable · Professional*

</div>
