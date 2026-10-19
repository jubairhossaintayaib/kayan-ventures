// Frontend-only interactions. No form data is submitted, logged, or persisted.
const header = document.querySelector('#site-header');
const navigation = document.querySelector('#main-nav');
const mobileToggle = document.querySelector('.menu-toggle');
const servicesToggle = document.querySelector('#services-toggle');
const servicesMenu = document.querySelector('#services-menu');
const desktop = window.matchMedia('(min-width: 1081px)');
function setServices(open) { servicesToggle.setAttribute('aria-expanded', String(open)); servicesMenu.hidden = !open; }
function setNavigation(open) {
  header.classList.toggle('menu-open', open);
  mobileToggle.setAttribute('aria-expanded', String(open));
  mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (!open) setServices(false);
}
mobileToggle.addEventListener('click', () => setNavigation(mobileToggle.getAttribute('aria-expanded') !== 'true'));
servicesToggle.addEventListener('click', () => setServices(servicesMenu.hidden));
navigation.addEventListener('click', event => { if (event.target.closest('a')) setNavigation(false); });
document.addEventListener('click', event => { if (!header.contains(event.target)) setNavigation(false); });
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!servicesMenu.hidden) { setServices(false); servicesToggle.focus(); }
  else if (header.classList.contains('menu-open')) { setNavigation(false); mobileToggle.focus(); }
});
header.addEventListener('focusout', event => { if (!header.contains(event.relatedTarget)) setNavigation(false); });
desktop.addEventListener('change', () => setNavigation(false));
const form = document.querySelector('#contact-form');
const result = document.querySelector('#form-result');
const messageLink = document.querySelector('#message-link');
const serviceSelect = document.querySelector('#service-select');
// Service pages have no contact form.
if (form) {
  function clearPreparedMessage() { result.hidden = true; messageLink.removeAttribute('href'); }
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { serviceSelect.value = link.dataset.service; clearPreparedMessage(); }));
  form.addEventListener('input', clearPreparedMessage);
  form.addEventListener('change', clearPreparedMessage);
  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const field of form.querySelectorAll('[required]')) {
      field.setCustomValidity(field.value.trim() ? '' : 'Please fill out this field.');
      if (!field.reportValidity()) return;
    }
    const data = new FormData(form);
    const value = key => String(data.get(key) || '').trim();
    const message = ['Hi Kayan Ventures! I’d like to discuss a project.', '', `Name: ${value('name')}`, ...(value('business') ? [`Business: ${value('business')}`] : []), `Contact: ${value('contact')}`, `Interested in: ${value('service')}`, '', value('message')].join('\n');
    messageLink.href = `https://wa.me/8801313949313?text=${encodeURIComponent(message)}`;
    result.hidden = false;
    messageLink.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });
  form.querySelectorAll('[required]').forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));
}
document.querySelector('#year').textContent = new Date().getFullYear();
