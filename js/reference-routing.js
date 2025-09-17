// Route clicks on reference cards to the detail page
(function(){
  document.addEventListener('click', function(e){
    const grid = document.querySelector('#references .references-grid');
    if (!grid) return;

    let node = e.target;
    while (node && node !== grid && !node.classList?.contains('reference-card')) {
      node = node.parentElement;
    }
    if (!node || node === grid) return;

    // Intercept and build data payload
    e.preventDefault();

    const titleEl = node.querySelector('.reference-title');
    const imgEl = node.querySelector('img, .reference-image');
    const descEl = node.querySelector('.reference-description');
    const catEl = node.querySelector('.reference-category');
    const locEl = node.querySelector('.reference-location');
    const yearEl = node.querySelector('.reference-year');

    const title = titleEl ? titleEl.textContent.trim() : 'Reference';
    let img = '';
    if (imgEl) {
      if (imgEl.tagName === 'IMG') {
        img = imgEl.getAttribute('src') || '';
      } else {
        const bg = getComputedStyle(imgEl).backgroundImage;
        if (bg && bg !== 'none') {
          const m = bg.match(/url\(["']?(.*?)["']?\)/);
          img = m && m[1] ? m[1] : '';
        }
      }
    }
    const desc = descEl ? descEl.textContent.trim() : '';
    const category = catEl ? catEl.textContent.trim() : '';
    const location = locEl ? locEl.textContent.trim() : '';
    const year = yearEl ? yearEl.textContent.trim() : '';

    const payload = { title, img, desc, category, location, year };
    try { sessionStorage.setItem('selectedReference', JSON.stringify(payload)); } catch {}

    const qs = new URLSearchParams();
    if (title) qs.set('title', title);
    if (img) qs.set('img', img);
    // Keep URL short; other fields restored from sessionStorage

    window.location.href = 'reference.html?' + qs.toString();
  }, false);
})();