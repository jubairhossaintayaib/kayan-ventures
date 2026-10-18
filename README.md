# Kayan Ventures

Static, responsive website adapted from the imported Galleys template layout.

## Preview

Run `node preview-server.cjs`, then open http://127.0.0.1:4173.
No installation or build step is required. The preview server is local-only.

## Service pages

Six standalone pages are available from the navigation and homepage service cards:

- `custom-websites.html`
- `crm-lead-management.html`
- `ecommerce-websites.html`
- `landing-pages.html`
- `order-inventory-management.html`
- `meta-ads-management.html`

Order and inventory management are one combined service. Meta Ads Management is service six. Each page includes its own content, FAQs, related services, WhatsApp links, and a contact form with the relevant service selected.

Edit `scripts/service-content.cjs` for service content and `services.css` for page-specific layout. Run `node scripts/build-services.cjs` after changing content or shared homepage navigation, footer, form, or service illustrations. This refreshes the committed static pages; no build command is needed to serve them. The homepage palette and layout remain independent.

## Editing

- `index.html`: all page content, services, FAQs, and contact form.
- `style.css`: brand tokens, typography, and section layouts.
- `homepage.css`: interface illustrations and responsive rules.
- `homepage.js`: navigation, service selection, and WhatsApp message preparation.
- `assets/brand/`: the original generated logo concept and a matching SVG laptop favicon.

Section sequence: hero, introduction, services, call to action, about, process, FAQ, contact, footer.

## Branding and content

Primary yellow: `#FFDD00`; ink: `#181818`; warm white: `#FAF8F0`.
The supplied Kayan logo provides the handwritten wordmark. Page typography is DM Sans, a geometric web-font alternative to the reference brand's Circular. Google Fonts is loaded with a local Arial fallback.
Illustrations are original HTML/CSS. Celures appears only in the footer as our sister concern. No pricing or unverified performance claims are shown.

## Contact behavior

All WhatsApp links use `https://wa.me/8801314797479` (local number: 01314797479).
The form validates required fields and prepares an encoded WhatsApp message. The visitor opens WhatsApp and chooses whether to send it. Nothing is sent, stored, or logged by this site. Editing a field clears any previously prepared message.
There is no contact API, database, email delivery, or analytics integration yet. Replace the frontend submit handler when a backend is chosen. With JavaScript disabled, visitors can use the direct WhatsApp link.
