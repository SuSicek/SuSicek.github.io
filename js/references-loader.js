// Lightweight loader for compact references tiles with pagination (6 per page)
(function () {
  const grid = document.getElementById('projectsGrid');
  const loadMoreBtn = document.getElementById('loadMoreRefs');
  if (!grid) return;

  const PAGE_SIZE = 6;
  let projects = [];
  let cursor = 0;
  // Build reliable URL to the detail template next to this page
  const detailHrefBase = new URL('reference-detail.html', window.location.href).href;

  function renderNext() {
    const start = cursor;
    const slice = projects.slice(start, start + PAGE_SIZE);
    if (!slice.length) return;

    const frag = document.createDocumentFragment();
    slice.forEach((p, idx) => {
      const i = start + idx;
      // Create plain, non-clickable card (no anchor, no handlers)
      const card = document.createElement('article');
      card.className = 'reference-card';
      // Make card clickable -> go to detail template with index
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.location.href = `${detailHrefBase}?i=${i}`;
      });

      const img = document.createElement('img');
      img.className = 'reference-image';
      img.loading = 'lazy';
      img.src = p.image;
      img.alt = p.title;

      const overlay = document.createElement('div');
      overlay.className = 'reference-overlay';

      const body = document.createElement('div');
      body.className = 'reference-content';

      const title = document.createElement('h3');
      title.className = 'reference-title';
      title.textContent = p.title;

      const cat = document.createElement('span');
      cat.className = 'reference-category';
      cat.textContent = p.division;

      body.appendChild(title);
      body.appendChild(cat);

      card.appendChild(img);
      card.appendChild(overlay);
      card.appendChild(body);

      frag.appendChild(card);
    });

    grid.appendChild(frag);
    cursor += slice.length;

    // Hide button if all items rendered
    if (loadMoreBtn && cursor >= projects.length) {
      loadMoreBtn.style.display = 'none';
    }
  }

  async function init() {
    try {
      let data;
      // Prefer local path first
      let res = await fetch('./data/references.json', { cache: 'no-cache' });
      if (!res.ok) {
        // Try parent path as fallback
        res = await fetch('../data/references.json', { cache: 'no-cache' });
      }
      if (!res.ok) throw new Error('Failed to load references');
      data = await res.json();
      projects = Array.isArray(data.projects) ? data.projects : [];

      grid.innerHTML = '';

      cursor = 0;
      renderNext();

      if (loadMoreBtn) {
        loadMoreBtn.style.display = projects.length > PAGE_SIZE ? '' : 'none';
        loadMoreBtn.addEventListener('click', renderNext);
      }
    } catch (e) {
      console.error('references-loader:', e);
    }
  }

  // Defer init until DOM ready if needed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
