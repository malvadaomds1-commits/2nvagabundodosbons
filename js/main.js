(() => {
  'use strict';
  const config = window.DJ2N_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const safeUrl = (value) => { try { const url = new URL(value); return ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
  const setLink = (el, href, fallback = '#') => { if (!el) return; el.href = safeUrl(href) || fallback; if (href) { el.target = '_blank'; el.rel = 'noopener noreferrer'; } else { el.addEventListener('click', event => { if (el.getAttribute('href') === '#') event.preventDefault(); }); } };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

  // Loading curto dá tempo para a marca aparecer e não bloqueia navegação quando JS falha.
  window.addEventListener('load', () => setTimeout(() => document.body.classList.add('loaded'), 250));
  $('#year').textContent = new Date().getFullYear();
  const menuButton = $('.menu-toggle');
  menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open); });
  $$('.main-nav a').forEach(link => link.addEventListener('click', () => { menuButton.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); }));
  function $$(selector, root = document) { return [...root.querySelectorAll(selector)]; }

  const channel = config.youtube?.channelUrl || '';
  $$('.youtube-link, .subscribe-link').forEach(link => setLink(link, channel, '#youtube'));
  const videoId = config.youtube?.featuredVideoId;
  if (videoId && /^[\w-]{11}$/.test(videoId)) {
    const frame = $('#video-frame');
    frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}" title="${esc(config.youtube.featuredTitle || 'Vídeo oficial 2N')}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    $('#video-title').textContent = config.youtube.featuredTitle || 'Vídeo em destaque';
  }

  const releases = Array.isArray(config.releases) ? config.releases : [];
  const releaseCard = item => {
    const cover = item.cover ? `style="--cover:url('${esc(item.cover)}')"` : '';
    const date = item.date ? new Date(`${item.date}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Data não informada';
    const watch = item.youtubeId && /^[\w-]{11}$/.test(item.youtubeId) ? `https://www.youtube.com/watch?v=${encodeURIComponent(item.youtubeId)}` : '';
    return `<article class="release-card" ${cover}><div class="release-cover">${item.cover ? '' : '<span class="cover-mark">2N</span>'}<span class="cover-play">▶</span></div><div class="release-info"><span>${esc(date)}</span><h3>${esc(item.title || 'Lançamento')}</h3>${watch ? `<a href="${watch}" target="_blank" rel="noopener noreferrer">Assistir no YouTube <b>↗</b></a>` : '<span class="demo-label">LINK DO LANÇAMENTO A CONFIGURAR</span>'}</div></article>`;
  };
  const featured = config.featuredRelease;
  if (featured) {
    const id = featured.youtubeId && /^[\w-]{11}$/.test(featured.youtubeId) ? featured.youtubeId : '';
    $('#featured-release').innerHTML = `<div class="featured-cover" style="${featured.cover ? `--cover:url('${esc(featured.cover)}')` : ''}"><span class="featured-mark">2N</span><span class="featured-tag">LANÇAMENTO EM DESTAQUE</span></div><div class="featured-info"><p class="eyebrow">FAIXA EM DESTAQUE</p><h3>${esc(featured.title || 'Novo lançamento')}</h3><p>${esc(featured.date || 'Data a confirmar')}</p>${id ? `<a class="button button-primary" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">Ouvir agora <span>↗</span></a>` : '<span class="demo-label">Configure o ID do vídeo em js/config.js</span>'}</div>`;
  } else { $('#featured-release').remove(); }
  $('#release-grid').innerHTML = releases.length ? releases.map(releaseCard).join('') : '<div class="empty-state"><span class="empty-icon">✳</span><div><strong>EM BREVE, SOM NOVO.</strong><p>Os lançamentos oficiais aparecem aqui assim que forem adicionados em <code>js/config.js</code>.</p></div></div>';

  const socials = [
    ['youtube', 'YouTube', config.youtube?.channelUrl, '▶'], ['instagram', 'Instagram', config.social?.instagram, '◎'], ['tiktok', 'TikTok', config.social?.tiktok, '♪']
  ];
  $('#social-grid').innerHTML = socials.map(([key, label, url, icon]) => `<a class="social-card ${url ? '' : 'is-configurable'}" href="${safeUrl(url) || '#conecte'}" ${url ? 'target="_blank" rel="noopener noreferrer"' : 'aria-label="' + label + ' — configure o link em js/config.js"'}><span class="social-icon" aria-hidden="true">${icon}</span><span>${label}</span><b aria-hidden="true">↗</b></a>`).join('');
  const contact = config.contact || {};
  const contactHref = contact.discord || (contact.whatsapp ? `https://wa.me/${String(contact.whatsapp).replace(/\D/g, '')}` : contact.email ? `mailto:${contact.email}` : '');
  setLink($('.contact-link'), contactHref, '#contato');
  if (!contactHref) $('.contact-link').addEventListener('click', event => { event.preventDefault(); });
  if (config.biography) $('.bio-text').textContent = config.biography;

  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  $$('.reveal, .release-card').forEach(el => observer.observe(el));
  const topButton = $('.back-top');
  window.addEventListener('scroll', () => topButton.classList.toggle('visible', window.scrollY > 600), { passive: true });
})();
