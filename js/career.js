document.addEventListener('DOMContentLoaded', () => {
  (async () => {
    try {
      const res = await fetch('../data/content.json', { cache: 'no-cache' });
      const data = await res.json();
      const career = data.career || {};

      // Hero
      const heroBg = document.getElementById('careerHeroBg');
      const kicker = document.getElementById('careerKicker');
      const title = document.getElementById('careerTitle');
      const subtitle = document.getElementById('careerSubtitle');

      if (heroBg && career.hero?.image) heroBg.style.backgroundImage = `url('${career.hero.image}')`;
      if (kicker) kicker.textContent = career.hero?.kicker || 'Kariéra';
      if (title) title.textContent = career.hero?.title || 'Přidejte se k nám';
      if (subtitle) subtitle.textContent = career.hero?.subtitle || '';

      // Intro
      const intro = document.getElementById('careerIntro');
      if (intro && career.intro) intro.innerHTML = career.intro;

      // Perks
      const perksWrap = document.getElementById('perksGrid');
      (career.perks || []).forEach(p => {
        const card = document.createElement('div');
        card.className = 'perk-card';
        card.innerHTML = `
          <div class="perk-head">
            <div class="perk-icon">${p.icon ? `<ion-icon name="${p.icon}"></ion-icon>` : '✓'}</div>
            <h3 class="perk-title">${p.title || ''}</h3>
          </div>
          <p class="perk-desc">${p.text || ''}</p>
        `;
        perksWrap?.appendChild(card);
      });

      // Process
      const processTitle = document.getElementById('processTitle');
      const processSubtitle = document.getElementById('processSubtitle');
      if (processTitle && career.processTitle) processTitle.textContent = career.processTitle;
      if (processSubtitle && career.processSubtitle) processSubtitle.textContent = career.processSubtitle;

      const processWrap = document.getElementById('processTimeline');
      (career.process || []).forEach((s, i) => {
        const step = document.createElement('div');
        step.className = 'process-step';
        step.innerHTML = `
          <span class="step-index">${String(i + 1).padStart(2, '0')}</span>
          <h3>${s.title || ''}</h3>
          <p>${s.text || ''}</p>
        `;
        processWrap?.appendChild(step);
      });

      // Positions
      const posTitle = document.getElementById('positionsTitle');
      const posSubtitle = document.getElementById('positionsSubtitle');
      if (posTitle && career.positionsTitle) posTitle.textContent = career.positionsTitle;
      if (posSubtitle && career.positionsSubtitle) posSubtitle.textContent = career.positionsSubtitle;

      const positions = Array.isArray(career.positions) ? career.positions : [];
      const grid = document.getElementById('positionsGrid');
      const filters = document.getElementById('positionsFilters');

      // Build department filter chips
      const depts = [...new Set(positions.map(p => p.department).filter(Boolean))];
      depts.forEach(d => {
        const chip = document.createElement('button');
        chip.className = 'filter-chip';
        chip.dataset.filter = d;
        chip.textContent = d;
        filters?.appendChild(chip);
      });

      const renderPositions = (dept = 'all') => {
        if (!grid) return;
        grid.innerHTML = '';
        positions
          .filter(p => dept === 'all' ? true : p.department === dept)
          .forEach(p => {
            const card = document.createElement('div');
            card.className = 'role-card';
            const reqList = (p.requirements || []).map(i => `<li>${i}</li>`).join('');
            const benList = (p.benefits || []).map(i => `<li>${i}</li>`).join('');
            const applyHref = p.applyLink || (p.email ? `mailto:${p.email}` : '#');
            card.innerHTML = `
              <div class="role-body">
                <h3 class="role-title">${p.title || ''}</h3>
                <div class="role-meta">
                  ${p.location ? `<span class="badge"><ion-icon name="location-outline"></ion-icon>&nbsp;${p.location}</span>` : ''}
                  ${p.type ? `<span class="badge"><ion-icon name="time-outline"></ion-icon>&nbsp;${p.type}</span>` : ''}
                  ${p.department ? `<span class="badge"><ion-icon name="briefcase-outline"></ion-icon>&nbsp;${p.department}</span>` : ''}
                </div>
                <p class="role-teaser">${p.teaser || ''}</p>
                <div class="role-actions">
                  <button class="btn-outline" data-toggle="details">Detail</button>
                  <a class="btn-primary" href="${applyHref}">Přihlásit se</a>
                </div>
              </div>
              <div class="role-details" id="details-${p.id || Math.random().toString(36).slice(2)}">
                ${reqList ? `<h4>Požadavky</h4><ul>${reqList}</ul>` : ''}
                ${benList ? `<h4>Nabízíme</h4><ul>${benList}</ul>` : ''}
                ${p.howToApply ? `<p>${p.howToApply}</p>` : ''}
              </div>
            `;
            // Toggle details
            card.querySelector('[data-toggle="details"]')?.addEventListener('click', () => {
              const d = card.querySelector('.role-details');
              d?.classList.toggle('open');
            });
            grid.appendChild(card);
          });
      };

      // Filter handling
      filters?.addEventListener('click', (e) => {
        const t = e.target;
        if (!(t instanceof HTMLElement)) return;
        const filter = t.dataset.filter;
        if (!filter) return;
        filters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        t.classList.add('active');
        renderPositions(filter);
      });

      // Initial render
      renderPositions('all');

      // CTA
      const cta = career.cta || {};
      const ctaTitle = document.getElementById('applyCtaTitle');
      const ctaText = document.getElementById('applyCtaText');
      const ctaBtn = document.getElementById('applyCtaBtn');
      if (ctaTitle) ctaTitle.textContent = cta.title || 'Nenašli jste vhodnou pozici?';
      if (ctaText) ctaText.textContent = cta.text || 'Ozvěte se nám, rádi se pobavíme o možnostech spolupráce.';
      if (ctaBtn) {
        ctaBtn.textContent = cta.button?.label || 'Kontaktovat HR';
        ctaBtn.href = cta.button?.link || (career.hrEmail ? `mailto:${career.hrEmail}` : '#');
      }

    } catch (e) {
      // optional: console.warn('Career content failed to load', e);
    }
  })();
});

document.addEventListener('DOMContentLoaded', async () => {
  const chipsWrap = document.getElementById('jobChips');
  const listEl = document.getElementById('careerJobsList');
  const searchEl = document.getElementById('jobSearch');

  let data, tabs = [], activeTab = 'all', search = '';

  const fetchData = async () => {
    const res = await fetch('../data/content.json', { cache: 'no-cache' });
    data = await res.json();
    tabs = (data.jobs?.tabs || []).map(t => ({ id: t.id, name: t.name, jobs: t.jobs || [] }));
  };

  const renderChips = () => {
    chipsWrap.innerHTML = '';
    const allChip = document.createElement('button');
    allChip.className = 'career-chip' + (activeTab === 'all' ? ' active' : '');
    allChip.textContent = 'Vše';
    allChip.addEventListener('click', () => { activeTab = 'all'; renderList(); highlightChip(); });
    chipsWrap.appendChild(allChip);

    tabs.forEach(t => {
      const chip = document.createElement('button');
      chip.className = 'career-chip' + (activeTab === t.id ? ' active' : '');
      chip.textContent = t.name;
      chip.dataset.id = t.id;
      chip.addEventListener('click', () => { activeTab = t.id; renderList(); highlightChip(); });
      chipsWrap.appendChild(chip);
    });
  };

  const highlightChip = () => {
    chipsWrap.querySelectorAll('.career-chip').forEach(ch => {
      const id = ch.dataset.id || 'all';
      ch.classList.toggle('active', id === activeTab);
    });
  };

  const filterJobs = () => {
    const s = search.trim().toLowerCase();
    let list = [];
    if (activeTab === 'all') {
      tabs.forEach(t => list.push(...t.jobs));
    } else {
      const t = tabs.find(x => x.id === activeTab);
      if (t) list = t.jobs.slice();
    }
    if (!s) return list;
    return list.filter(j =>
      (j.title || '').toLowerCase().includes(s) ||
      (j.location || '').toLowerCase().includes(s) ||
      (j.description || '').toLowerCase().includes(s)
    );
  };

  const renderList = () => {
    const jobs = filterJobs();
    listEl.innerHTML = '';
    if (!jobs.length) {
      const empty = document.createElement('div');
      empty.textContent = 'Žádné pozice pro zadané filtrování.';
      empty.style.color = 'var(--black-coral)';
      listEl.appendChild(empty);
      return;
    }
    jobs.forEach(j => {
      const card = document.createElement('article');
      card.className = 'job-card';
      card.innerHTML = `
        <h3 class="job-title">${j.title || ''}</h3>
        <div class="job-location">${j.location || ''}</div>
        <p class="job-description">${j.description || ''}</p>
        <div class="job-actions">
          <button class="job-apply" type="button">Mám zájem</button>
          <button class="job-more" type="button">Více</button>
        </div>
      `;
      card.querySelector('.job-apply').addEventListener('click', () => {
        location.hash = '#contact';
      });
      card.querySelector('.job-more').addEventListener('click', () => {
        alert('Kontaktujte nás pro více informací k pozici: ' + (j.title || ''));
      });
      listEl.appendChild(card);
    });
  };

  // Wire search
  if (searchEl) {
    searchEl.addEventListener('input', (e) => {
      search = e.target.value || '';
      renderList();
    });
  }

  // Init
  try {
    await fetchData();
    renderChips();
    renderList();
  } catch (e) {
    // noop
  }
});

// Make entire job card clickable -> go to contact section
(function(){
  document.addEventListener('click', function(e){
    const card = e.target.closest('.job-card');
    if (!card) return;
    const contact = document.querySelector('#contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
