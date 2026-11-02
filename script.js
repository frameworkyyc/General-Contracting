const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
}));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#service').value = link.dataset.service;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const result = document.querySelector('#form-result');
  result.hidden = false;
  result.replaceChildren();
  const summary = document.createElement('p');
  const body = `Hello Breanna,\n\nI'd like a quote for: ${data.get('service')}\n\n${data.get('message')}\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}`;
  summary.textContent = body;
  const link = document.createElement('a');
  link.className = 'email-draft';
  link.textContent = 'Open email app to send request';
  link.href = `mailto:btrenovationsolutions@gmail.com?subject=${encodeURIComponent('Quote request: ' + data.get('service'))}&body=${encodeURIComponent(body)}`;
  const note = document.createElement('span');
  note.className = 'form-edit-note';
  note.textContent = 'Nothing has been sent. Review and send in your email app, or call 403-436-0087.';
  result.append(summary, link, note);
  result.focus();
});
