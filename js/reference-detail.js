// Load detail from references.json using ?i=<index>
(async function () {
  function qs(id) { return document.getElementById(id); }
  const params = new URLSearchParams(location.search);
  const idx = parseInt(params.get('i') || '0', 10);

  try {
    const res = await fetch('./data/references.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('Failed to load references');
    const data = await res.json();
    const list = Array.isArray(data.projects) ? data.projects : [];
    const item = list[idx] || list[0];
    if (!item) return;

    qs('detailTitle').textContent = item.title;
    qs('detailDivision').textContent = item.division;
    qs('detailLocation').textContent = item.location || '';
    qs('detailYear').textContent = item.year ? String(item.year) : '';

    const hero = qs('detailHeroImg');
    hero.src = item.image;
    hero.alt = item.title;

    // Optional description (fallback)
    const desc = qs('detailDescription');
    desc.textContent = item.description || 'Podrobnosti o projektu budou doplněny.';

    // Simple gallery: use hero + any additional images array
    const gallery = document.getElementById('detailGalleryGrid');
    const images = Array.isArray(item.gallery) ? item.gallery : [item.image];
    const frag = document.createDocumentFragment();
    images.forEach(src => {
      const a = document.createElement('a');
      a.href = src;
      a.target = '_blank';
      const img = document.createElement('img');
      img.src = src;
      img.alt = item.title;
      img.loading = 'lazy';
      a.appendChild(img);
      frag.appendChild(a);
    });
    gallery.appendChild(frag);
  } catch (e) {
    console.error('reference-detail:', e);
  }
})();

// Populate the reference detail from sessionStorage or URL params
(function(){
  function qs(name){
    return new URLSearchParams(location.search).get(name) || '';
  }
  function el(id){ return document.getElementById(id); }

  let data = null;
  try {
    const raw = sessionStorage.getItem('selectedReference');
    if (raw) data = JSON.parse(raw);
  } catch {}

  if (!data) {
    data = {
      title: qs('title'),
      img: qs('img'),
      desc: qs('desc')
    };
  }

  // Fallbacks
  data = Object.assign({ title: 'Reference', img: '', desc: '', category: '', location: '', year: '' }, data || {});

  const titleEl = el('ref-title');
  const imgEl = el('ref-image');
  const descEl = el('ref-description');
  const catEl = el('ref-category');
  const locEl = el('ref-location');
  const yearEl = el('ref-year');

  titleEl.textContent = data.title;
  if (data.img) {
    imgEl.src = data.img;
    imgEl.style.display = '';
  } else {
    imgEl.style.display = 'none';
  }
  descEl.textContent = data.desc;
  if (data.category) { catEl.textContent = data.category; catEl.style.display = 'inline-flex'; } else { catEl.style.display = 'none'; }
  if (data.location) { locEl.textContent = data.location; locEl.style.display = ''; } else { locEl.style.display = 'none'; }
  if (data.year) { yearEl.textContent = data.year; yearEl.style.display = ''; } else { yearEl.style.display = 'none'; }
})();
