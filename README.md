# East End Pizza Co. — Website

A static site for East End Pizza Company (Kerrville, TX). No build step —
just HTML/CSS/JS. Content, hours, menu highlights, and reviews were pulled
from the current live site, the Toast ordering menu, and the Google Business
listing.

## Structure

- `index.html` — homepage (story, menu highlights, reviews, hours/location)
- `reservations.html` — reservation request form
- `css/style.css` — all styling
- `js/main.js` — mobile nav, today's-hours highlight, reservation form submit
- `assets/img/` — logo and photo pulled from the current site

Ordering and the full menu still go through Toast
(`toasttab.com/east-end-pizza-company-1700-water-street`) — this site links
out to it rather than duplicating the menu, so prices/items always stay in
sync with what Toast has.

Each menu-highlight card on `index.html` links directly to that item's page
on Toast's ordering site (`order.toasttab.com/.../item-<slug>_<id>`), not
just the general menu — Toast assigns each item a stable URL, so clicking a
card jumps a visitor straight to that pizza/sub ready to add to cart. If an
item's name or price changes on Toast, re-open the menu, find the item, and
copy its new URL/price into the matching card (the id in the URL changes
if the item is ever deleted and recreated, not on a simple edit).

Reviews (`.testimonial-grid`) link out to the real Google Business listing
page (same URL as the "Read all our reviews on Google" link above the
grid) since Google doesn't provide stable per-review permalinks without a
paid Places API integration.

## Before this goes live: connect the reservation form

The reservation form on `reservations.html` posts to
[Formspree](https://formspree.io), a free service that emails form
submissions to you — no server needed. Right now it points at a placeholder
and will tell visitors to call instead until you connect it:

1. Go to formspree.io and create a free account (50 submissions/month free).
2. Create a new form, point it at the email that should receive reservation
   requests (e.g. kerrtxeastendpizzaco@gmail.com).
3. Copy the form endpoint it gives you (looks like
   `https://formspree.io/f/abcdwxyz`).
4. In `reservations.html`, find this line near the top of the form:
   ```html
   <form id="reservationForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   and replace `YOUR_FORM_ID` with your real endpoint.
5. Deploy, then submit a test reservation to confirm the email arrives.

Formspree's free tier is enough for a single-location restaurant. If you
outgrow it later, the same form just needs its `action` URL swapped again.

## Deploying

This is a plain static site, so it can go on any static host. Two easy free
options:

- **Netlify** — drag-and-drop the whole folder at app.netlify.com/drop, or
  connect a GitHub repo for auto-deploys.
- **GitHub Pages** — push this folder to a repo and enable Pages in the repo
  settings.

## Style/layout variants

`styles/index.html` is a comparison hub for alternate designs of this same
site — same pattern as the Wagon Wheel RV Park static-site variants: each
variant lives in its own `styles/vN/` folder (`index.html` + `css/style.css`),
listed as a card on the hub linking to it. Alternate takes on a variant's
theme go in `styles/vNb/`, `styles/vNc/`, etc., nested under that variant's
card as an "Alternates" row rather than as their own top-level card. All
variants should share the same content (hours, menu highlights, reviews,
address) — only layout, typography, and styling differ, so it stays a visual
comparison rather than a content diff.

No variants exist yet — this is just the empty hub shell, not linked from
the main site's nav (`index.html`/`reservations.html`), since it's an
internal design-review page rather than something customers should land on.
It's still publicly reachable at `/styles/` once pushed, same as any other
page in this repo.

## Editing content later

- **Hours**: update both the table in `index.html` (`#hoursTable`) and the
  short version in `reservations.html`.
- **Menu highlights**: `index.html`, the `.menu-grid` cards. These are just a
  teaser — the full menu lives on Toast and isn't duplicated here.
- **Reviews**: `index.html`, the `.testimonial-grid` cards — pulled from
  real Google reviews as of July 2026. Swap in newer ones periodically.
- **Photos**: drop new images into `assets/img/` and update the `src`
  attributes. The hero (`dining-room.jpg`, a real photo from the Google
  Business listing) and About section (`hero-making-pizza.jpg`, Nick
  stretching dough) are currently different photos — more photos (food,
  riverside seating) would strengthen both sections further.
