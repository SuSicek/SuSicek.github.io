document.addEventListener('DOMContentLoaded', async () => {
  try {
    const params = new URLSearchParams(location.search);
    const initialKey = (params.get('division') || 'energetika').toLowerCase();

    const res = await fetch('../data/content.json', { cache: 'no-cache' });
    const data = await res.json();
    const divs = data?.divisions || {};
    const order = Object.keys(divs);
    if (!order.length) return;

    let currentIndex = Math.max(0, order.indexOf(initialKey));
    if (currentIndex === -1) currentIndex = 0;

    const els = {
      title: document.getElementById('division-title'),
      sub: document.getElementById('division-subtitle'),
      desc: document.getElementById('division-description'),
      servicesGrid: document.getElementById('servicesGrid'),
      projectsGrid: document.getElementById('projectsGrid'),
      projectsCta: document.getElementById('projectsCta'),
      ctaBand: document.getElementById('divisionCtaBand'),
      ctaTitle: document.getElementById('divisionCtaTitle'),
      ctaText: document.getElementById('divisionCtaText'),
      ctaBtn: document.getElementById('divisionCtaBtn'),
      prev: document.getElementById('divisionPrev'),
      next: document.getElementById('divisionNext')
    };

    function renderDivision(key) {
      const d = divs[key];
      if (!d) return;

      // Intro
      els.title.textContent = d.title || '';
      els.sub.textContent = d.subtitle || '';
      els.desc.textContent = d.description || '';

      // Services
      els.servicesGrid.innerHTML = '';
      (d.services || []).forEach(s => {
        const card = document.createElement('article');
        card.className = 'service-card';
        card.innerHTML = `
          <div class="service-icon"><ion-icon name="${s.icon || 'construct-outline'}"></ion-icon></div>
          <h3 class="service-title">${s.title || ''}</h3>
          <p class="service-desc">${s.description || ''}</p>
          <div class="service-actions">
            <a class="btn-secondary" href="${s.buttonLink || '#contact'}">${s.buttonText || 'Více informací'}</a>
          </div>
        `;
        els.servicesGrid.appendChild(card);
      });

      // Projects
      els.projectsGrid.innerHTML = '';
      (d.projects || []).forEach(p => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
          <img class="project-image" src="${p.image || ''}" alt="${p.title || ''}">
          <div class="project-content">
            <span class="project-year">${p.year || ''}</span>
            <h3 class="project-title">${p.title || ''}</h3>
            <p class="project-desc">${p.description || ''}</p>
          </div>
        `;
        els.projectsGrid.appendChild(card);
      });

      // Projects CTA
      if (d.projectsCta?.link) els.projectsCta.href = d.projectsCta.link;
      if (d.projectsCta?.text) els.projectsCta.textContent = d.projectsCta.text;

      // Optional CTA band
      if (d.cta?.title || d.cta?.text) {
        els.ctaTitle.textContent = d.cta.title || '';
        els.ctaText.textContent = d.cta.text || '';
        if (d.cta?.buttonText) els.ctaBtn.textContent = d.cta.buttonText;
        if (d.cta?.buttonLink) els.ctaBtn.href = d.cta.buttonLink;
        els.ctaBand.hidden = false;
      } else {
        els.ctaBand.hidden = true;
      }
    }

    function updateUrl(key) {
      const url = new URL(location.href);
      url.searchParams.set('division', key);
      history.replaceState({}, '', url);
    }

    function go(delta) {
      currentIndex = (currentIndex + delta + order.length) % order.length;
      const key = order[currentIndex];
      renderDivision(key);
      updateUrl(key);
    }

    // Init
    renderDivision(order[currentIndex]);

    // Nav arrows
    els.prev?.addEventListener('click', () => go(-1));
    els.next?.addEventListener('click', () => go(1));

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    });
  } catch (e) {
    console.error('Division page load failed:', e);
  }
});
