# East End Pizza Co. — Website

A static site for East End Pizza Company (Kerrville, TX). No build step —
just HTML/CSS/JS. Content, hours, menu highlights, and reviews were pulled
from the current live site, the Toast ordering menu, and the Google Business
listing.

## Structure

- `index.html` / `css/hub.css` — **project demo hub** (not the restaurant
  site). Links out to the original Squarespace site and each working build.
- `v1/` — the actual site build (what customers should eventually see):
  - `index.html` — homepage (story, menu highlights, reviews, FAQ, hours/location)
  - `reservations.html` — reservation request form
  - `404.html` — branded not-found page (GitHub Pages serves this automatically)
  - `css/style.css` — all styling
  - `js/main.js` — mobile nav, today's-hours highlight, reservation form submit
  - `assets/img/` — photos, plus a generated favicon set (`favicon-16.png`,
    `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`)
  - `site.webmanifest`, `robots.txt`, `sitemap.xml` — SEO/hosting plumbing
- `styles/` — empty comparison hub for future visual/layout variants (see
  below), separate from `v1`'s feature iterations.

**Important — read before touching DNS:** the repo root is now a demo hub,
not the restaurant site. The site itself lives at `v1/`. If you ever add the
`CNAME` file back and point `kerrtxeastendpizzaco.com` at this repo (see
below), the domain will show the **hub**, not the restaurant homepage,
because GitHub Pages custom domains always map to the repo root. Before
switching DNS for real, either move `v1/`'s contents back up to the repo
root (undoing this hub structure), or decide the hub should live somewhere
else (a different repo, or a path GitHub Pages doesn't serve as the domain
root). Don't switch DNS while root is still the hub — it would send real
customers to an internal demo page instead of the restaurant site.

Ordering and the full menu still go through Toast
(`toasttab.com/east-end-pizza-company-1700-water-street`) — this site links
out to it rather than duplicating the menu, so prices/items always stay in
sync with what Toast has.

Each menu-highlight card on `v1/index.html` links directly to that item's
page on Toast's ordering site (`order.toasttab.com/.../item-<slug>_<id>`),
not just the general menu — Toast assigns each item a stable URL, so
clicking a card jumps a visitor straight to that pizza/sub ready to add to
cart. If an item's name or price changes on Toast, re-open the menu, find
the item, and copy its new URL/price into the matching card (the id in the
URL changes if the item is ever deleted and recreated, not on a simple edit).

Reviews (`.testimonial-grid`) link out to the real Google Business listing
page (same URL as the "Read all our reviews on Google" link above the
grid) since Google doesn't provide stable per-review permalinks without a
paid Places API integration.

## Before this goes live: point the real domain here

There is **deliberately no `CNAME` file in this repo**. Adding one tells
GitHub Pages to redirect the `github.io` preview URL straight to
`kerrtxeastendpizzaco.com` *immediately* — not after DNS is ready. Tested
this directly: with the CNAME file in place, `solidusbm.github.io/east-end-pizza/`
301-redirected to the real domain right away, which currently still points
at the old Squarespace site (DNS hasn't been switched), so the redirect sent
visitors backward to the old site instead of forward to the new one.

Also see the structure note above — right now the domain would map to the
hub, not `v1/`, so that has to be resolved first. Once it is, do these
steps together, not one before the other:

1. Add these DNS records at wherever the domain is registered (likely
   Squarespace Domains, since the old site was built there):
   - Four `A` records for `@` pointing to `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` pointing to `solidusbm.github.io`
2. At the same time, add a `CNAME` file back to the repo root containing
   just `kerrtxeastendpizzaco.com` (one line, no protocol/slashes), commit,
   and push — then check GitHub repo settings → Pages to confirm the
   custom domain verifies and turn on "Enforce HTTPS" once it's offered
   (GitHub issues a free certificate automatically, usually within an hour).
3. Update the website link on the Google Business Profile to the new
   domain once it's live, so Google Search and Maps point people to it
   instead of the old Squarespace site.

The JSON-LD, canonical tags, and Open Graph/Twitter tags in `v1/index.html`
and `v1/reservations.html` already reference `kerrtxeastendpizzaco.com` —
that's just metadata (doesn't redirect anything), left pointed at the
intended final domain so nothing needs editing again once DNS is live.

## SEO & social sharing

`v1/index.html` includes JSON-LD structured data (`schema.org/Restaurant` —
hours, address, price range, rating) and Open Graph/Twitter Card meta tags,
both pointed at the `kerrtxeastendpizzaco.com` domain. If hours, phone, or
the review count change meaningfully, update the JSON-LD block near the top
of `v1/index.html` to match. `v1/robots.txt` and `v1/sitemap.xml` also
assume that domain — update both if the domain ever changes.

## Before this goes live: connect the reservation form

The reservation form on `v1/reservations.html` posts to
[Formspree](https://formspree.io), a free service that emails form
submissions to you — no server needed. Right now it points at a placeholder
and will tell visitors to call instead until you connect it:

1. Go to formspree.io and create a free account (50 submissions/month free,
   shared across all forms on the account — you can create more than one
   form under a single account, so this same account can also power the
   Royal Treatment site's contact form if you want).
2. Create a new form, point it at the email that should receive reservation
   requests (e.g. kerrtxeastendpizzaco@gmail.com).
3. Copy the form endpoint it gives you (looks like
   `https://formspree.io/f/abcdwxyz`).
4. In `v1/reservations.html`, find this line near the top of the form:
   ```html
   <form id="reservationForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   and replace `YOUR_FORM_ID` with your real endpoint.
5. Deploy, then submit a test reservation to confirm the email arrives.

Formspree's free tier is enough for a single-location restaurant. If you
outgrow it later, the same form just needs its `action` URL swapped again.
Send me the real endpoint whenever you have it and I'll wire it in.

## Deploying

This is a plain static site, so it can go on any static host. Two easy free
options:

- **Netlify** — drag-and-drop the whole folder at app.netlify.com/drop, or
  connect a GitHub repo for auto-deploys.
- **GitHub Pages** — push this folder to a repo and enable Pages in the repo
  settings.

## Style/layout variants

`styles/index.html` is a comparison hub for alternate designs of the `v1`
site — same pattern as the Wagon Wheel RV Park and Royal Treatment
static-site variants: each variant lives in its own `styles/vN/` folder
(`index.html` + `css/style.css`), listed as a card on the hub linking to
it. Alternate takes on a variant's theme go in `styles/vNb/`, `styles/vNc/`,
etc., nested under that variant's card as an "Alternates" row rather than
as their own top-level card. All variants should share the same content
(hours, menu highlights, reviews, address) — only layout, typography, and
styling differ, so it stays a visual comparison rather than a content diff.

No variants exist yet — this is just the empty hub shell. Neither this hub
nor the root demo hub is linked from `v1`'s own nav — they're internal
design-review pages, not something customers should land on.

## Editing content later

- **Hours**: update both the table in `v1/index.html` (`#hoursTable`) and
  the short version in `v1/reservations.html`.
- **Menu highlights**: `v1/index.html`, the `.menu-grid` cards. These are
  just a teaser — the full menu lives on Toast and isn't duplicated here.
- **Reviews**: `v1/index.html`, the `.testimonial-grid` cards — pulled from
  real Google reviews as of July 2026. Swap in newer ones periodically.
- **Photos**: drop new images into `v1/assets/img/` and update the `src`
  attributes. The hero (`dining-room.jpg`, a real photo from the Google
  Business listing) and About section (`hero-making-pizza.jpg`, Nick
  stretching dough) are currently different photos — more photos (food,
  riverside seating) would strengthen both sections further. Existing
  photos were resized to a max width and re-compressed as JPEG to keep
  page weight down — do the same with any new large photos before adding
  them (a phone photo straight off the camera is usually 3-4x larger than
  it needs to be for a web hero image).
- **FAQ**: `v1/index.html`, the `.faq-list` `<details>` items under "Good to
  Know." Every answer currently on the page is something already verified
  elsewhere on the site or the Google listing — add more once you have
  confirmed answers (parking, gluten-free options, dog-friendly patio,
  etc.) rather than guessing.
- **Catering**: the green "We cater parties, events, and large groups"
  band just routes to phone/email — there's no catering menu or pricing
  built anywhere yet since none exists to pull from. Add specifics there
  once they're decided.
- **Gift cards & rewards**: both links under the menu section point at
  Toast, which already sells gift cards and runs the rewards program for
  this location — nothing to maintain on the site side unless those URLs
  change.
- **Favicon**: if the logo ever changes, regenerate
  `favicon-16/32/192.png` and `apple-touch-icon.png` from the new file at
  those exact pixel sizes — browsers and phones cache favicons
  aggressively, so expect old icons to linger for a while after an update.
