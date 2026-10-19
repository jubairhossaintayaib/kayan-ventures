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
- `meta-ads-consulting.html`

Order and inventory management are one combined service. Each page includes its own content, FAQs, and WhatsApp links with a message about that service; the contact form lives on the homepage.

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
Illustrations are original HTML/CSS. Celures is listed in the footer as our sister concern and is visible within the supplied Ads Manager screenshot. Meta Ads Consulting costs BDT 5,000 for two one-hour sessions; ecommerce plans cost BDT 2,500/month for up to 100,000 monthly visitors or BDT 10,000/month for up to 1,000,000. Both include backend order management and done-for-you updates. Other services have no published pricing. The case study shows selected-campaign results, not promised outcomes. Edit scripts/meta-consulting.cjs and scripts/meta-sections.cjs for the consultation offer and case study.

## Contact behavior

All WhatsApp links use `https://wa.me/8801313949313` (local number: 01313949313).
The form validates required fields and prepares an encoded WhatsApp message. The visitor opens WhatsApp and chooses whether to send it. Nothing is sent, stored, or logged by this site. Editing a field clears any previously prepared message.
There is no contact API, database, email delivery, or analytics integration yet. Replace the frontend submit handler when a backend is chosen. With JavaScript disabled, visitors can use the direct WhatsApp link.
