(function(){
  const qsa = (s, r=document) => Array.from(r.querySelectorAll(s));
  const getText = (el, sel) => el.querySelector(sel)?.textContent.trim() || '';
  const parseBgUrl = (bg) => {
    const m = /url\(["']?(.*?)["']?\)/.exec(bg || '');
    return m ? m[1] : '';
  };
  const buildHref = (card) => {
    const title = getText(card, '.job-title') || card.getAttribute('aria-label') || 'Pozice';
    const location = getText(card, '.job-location');
    const type = card.dataset.type || '';
    const dept = card.dataset.dept || '';
    const ref = card.dataset.ref || '';
    const img = parseBgUrl(getComputedStyle(card).backgroundImage);

    const p = new URLSearchParams();
    if (title) p.set('title', title);
    if (location) p.set('location', location);
    if (type) p.set('type', type);
    if (dept) p.set('dept', dept);
    if (ref) p.set('ref', ref);
    if (img) p.set('image', img);

    const base = new URL('job.html', window.location.href);
    base.search = p.toString();
    return base.toString();
  };

  const ensureOverlayAnchor = (card, href, label) => {
    let a = card.querySelector('a.job-card-link');
    if (!a) {
      a = document.createElement('a');
      a.className = 'job-card-link';
      a.setAttribute('aria-label', label || 'Detail pozice');
      card.appendChild(a);
    }
    a.href = href;
  };

  const linkCard = (card) => {
    if (!card || card.dataset.linked === '1') return;
    const href = buildHref(card);
    const title = getText(card, '.job-title') || 'Detail pozice';
    // Update existing anchors inside card
    qsa('a', card).forEach(a => { a.href = href; });
    // Full overlay anchor
    ensureOverlayAnchor(card, href, title);
    // Make it focusable
    card.setAttribute('role', 'link');
    card.tabIndex = 0;
    card.dataset.linked = '1';
  };

  const initAll = () => qsa('.career-list .job-card').forEach(linkCard);

  // Initial pass (on DOMContentLoaded or immediately)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
  // Also run on window load just in case content loads late
  window.addEventListener('load', initAll);

  // Observe dynamically inserted cards
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      m.addedNodes && m.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        if (node.matches && node.matches('.career-list .job-card')) linkCard(node);
        qsa('.career-list .job-card', node).forEach(linkCard);
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // Event delegation for clicks and keyboard
  document.addEventListener('click', (e) => {
    const card = e.target.closest && e.target.closest('.career-list .job-card');
    if (!card) return;
    // Let genuine external links inside card work except hash links
    const insideAnchor = e.target.closest('a');
    if (insideAnchor) {
      const href = insideAnchor.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        window.location.href = buildHref(card);
      }
      return; // allow normal anchors otherwise
    }
    e.preventDefault();
    window.location.href = buildHref(card);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest && e.target.closest('.career-list .job-card');
    if (!card) return;
    e.preventDefault();
    window.location.href = buildHref(card);
  });
})();
