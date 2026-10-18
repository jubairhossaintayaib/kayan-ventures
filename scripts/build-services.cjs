// Generate standalone HTML from shared homepage chrome and service-specific content.
// Run from any directory: node scripts/build-services.cjs
const fs = require('node:fs');
const path = require('node:path');
const services = require('./service-content.cjs');
const root = path.resolve(__dirname, '..');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
function extract(pattern, name) {
  const result = home.match(pattern);
  if (!result) throw new Error(`Cannot find homepage ${name}`);
  return result[0];
}
function homeLinks(markup) {
  return markup.replace(/href="#(home|services|work|about|faq)"/g, 'href="index.html#$1"');
}
const sharedHead = extract(/<head>[\s\S]*?<\/head>/, 'head');
const sharedHeader = homeLinks(extract(/<header[\s\S]*?<\/header>/, 'header'));
const sharedFooter = homeLinks(extract(/<footer>[\s\S]*?<\/footer>/, 'footer'));
const sharedContact = extract(/<section class="contact-section"[\s\S]*?<\/section>/, 'contact');
const whatsapp = service => `https://wa.me/8801314797479?text=${encodeURIComponent(`Hi Kayan Ventures! I’d like to discuss ${service.name.toLowerCase()}.`)}`;
const lines = value => value.map(escape).join('<br>');
const list = items => items.map(item => `<li><span aria-hidden="true">✓</span>${escape(item)}</li>`).join('\n');

for (const service of services) {
  const title = `${service.name} in Bangladesh | Kayan Ventures`;
  const head = sharedHead
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(service.description)}">`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escape(title)}">`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escape(service.description)}">`)
    .replace('</head>', '<link rel="stylesheet" href="services.css">\n</head>');
  const header = sharedHeader.replace(`href="${service.slug}.html"`, `href="${service.slug}.html" aria-current="page"`);
  const card = extract(new RegExp(`<article class="service-card" id="${service.id}">[\\s\\S]*?</article>`), service.name);
  const illustration = card.slice(card.indexOf('<div class="service-image'), card.indexOf('<div class="service-copy"'));
  const contact = sharedContact
    .replace(`<option>${service.choice}</option>`, `<option selected>${service.choice}</option>`)
    .replace('Tell us a little about it.', `Let’s talk ${service.name.toLowerCase()}.`);
  const related = service.related.map(slug => {
    const item = services.find(candidate => candidate.slug === slug);
    if (!item) throw new Error(`Unknown related service ${slug}`);
    return `<a class="related-card" href="${item.slug}.html"><span class="eyebrow">${item.number} / KEEP IT CONNECTED</span><h3>${escape(item.name)}</h3><p>${escape(item.description)}</p><span class="related-action">Explore this service <b aria-hidden="true">↗</b></span></a>`;
  }).join('\n');
  const html = `<!doctype html>
<html lang="en">
${head}
<body class="service-page">
<a class="skip-link" href="#main">Skip to content</a>
${header}
<main id="main">
  <section class="service-hero" aria-labelledby="service-title">
    <div class="service-hero-grid"><div class="service-hero-copy"><p class="eyebrow"><span class="tiny-line"></span>${escape(service.name.toUpperCase())} · ${service.number}</p><h1 id="service-title">${lines(service.headline)}</h1><p class="service-lead">${escape(service.intro)}</p><div class="hero-buttons"><a class="btn gold" href="${whatsapp(service)}" target="_blank" rel="noopener noreferrer">Let’s talk on WhatsApp <span aria-hidden="true">↗</span></a><a class="btn outline" href="#scope">Explore the service <span aria-hidden="true">↓</span></a></div></div><div class="service-hero-art"><div role="img" aria-label="Illustrative ${escape(service.name.toLowerCase())} concept">${illustration}</div><span class="service-art-caption">A LITTLE TECH. A LOT OF POSSIBILITY. <span>✳</span></span></div></div>
  </section>
  <section class="service-fit"><p class="eyebrow">MADE FOR YOUR KIND OF BUSINESS</p><p>${escape(service.audience)}</p><a class="round-link" href="#contact" aria-label="Discuss ${escape(service.name.toLowerCase())}">↗</a></section>
  <section class="section service-scope" id="scope" aria-labelledby="scope-title"><div class="section-heading"><div><p class="eyebrow"><span class="tiny-line"></span> WHAT WE CAN HELP WITH</p><h2 id="scope-title">${lines(service.overview)}</h2></div><div class="section-intro"><p>${escape(service.overviewText)}</p></div></div><div class="service-feature-grid">${service.features.map(([heading, text], index) => `<article><span class="feature-number">0${index + 1}</span><div><h3>${escape(heading)}</h3><p>${escape(text)}</p></div></article>`).join('\n')}</div></section>
  <section class="service-deliverables" aria-labelledby="deliverables-title"><div><p class="eyebrow"><span class="tiny-line"></span> A CLEAR STARTING POINT</p><h2 id="deliverables-title">The pieces.<br>The bigger picture.</h2><p>We’ll agree on the exact scope together. Here’s what we can plan around your business.</p><a class="text-link" href="#contact">Talk through your requirements <span aria-hidden="true">↗</span></a></div><ul>${list(service.checklist)}</ul></section>
  <section class="section process" aria-labelledby="process-title"><div class="section-heading"><div><p class="eyebrow"><span class="tiny-line"></span> HOW WE WORK</p><h2 id="process-title">From your idea<br>to a practical plan.</h2></div><p>Clear priorities. Shared decisions.<br>A process you’re part of.</p></div><div class="process-grid">${service.steps.map(([heading, text], index) => `<article><span class="step-number">0${index + 1}</span><h3>${escape(heading)}</h3><p>${escape(text)}</p></article>`).join('\n')}</div></section>
  <section class="section faq" aria-labelledby="faq-title"><div><p class="eyebrow"><span class="tiny-line"></span> A FEW THINGS TO KNOW</p><h2 id="faq-title">Good questions.<br>Clear answers.</h2><p>Want to talk about your specific setup?<br>Let’s work through it together.</p><a class="text-link" href="#contact">Ask us about your project <span aria-hidden="true">↗</span></a></div><div class="faq-list">${service.questions.map(([question, answer], index) => `<details${index === 0 ? ' open' : ''}><summary>${escape(question)}<span aria-hidden="true"></span></summary><p>${escape(answer)}</p></details>`).join('\n')}</div></section>
  ${contact}
  <section class="section related-services" aria-labelledby="related-title"><div class="section-heading"><div><p class="eyebrow"><span class="tiny-line"></span> BETTER TOGETHER</p><h2 id="related-title">What comes next?</h2></div><a class="text-link" href="index.html#services">See all six services <span aria-hidden="true">↗</span></a></div><div class="related-grid">${related}</div></section>
</main>
${sharedFooter}
</body>
</html>
`;
  fs.writeFileSync(path.join(root, `${service.slug}.html`), html);
  console.log(`Built ${service.slug}.html`);
}
