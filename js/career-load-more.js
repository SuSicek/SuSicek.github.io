(function(){
  const VISIBLE = 4;
  const onReady = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  const getCards = (list) => Array.from(list.querySelectorAll('.job-card'));

  onReady(() => {
    const list = document.getElementById('careerJobsList') || document.querySelector('.career-list');
    if (!list) return;

    let wrap = document.querySelector('.career-load-more-wrap');
    let btn;

    const ensureWrap = () => {
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.className = 'career-load-more-wrap';
        list.parentNode.insertBefore(wrap, list.nextSibling);
      }
      return wrap;
    };

    const ensureButton = () => {
      ensureWrap();
      if (!btn) {
        btn = document.createElement('a');
        btn.href = '#';
        btn.role = 'button';
        btn.className = 'btn btn-secondary load-more-jobs';
        btn.textContent = 'Více pozic';
        btn.setAttribute('aria-controls', list.id || 'careerJobsList');
        btn.setAttribute('aria-expanded', 'false');
        wrap.appendChild(btn);
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          getCards(list).forEach(el => el.classList.remove('is-hidden'));
          btn.style.display = 'none';
          btn.setAttribute('aria-expanded', 'true');
        });
      }
      return btn;
    };

    const applyVisibility = () => {
      const cards = getCards(list);
      cards.forEach((el, idx) => {
        if (idx >= VISIBLE) el.classList.add('is-hidden'); else el.classList.remove('is-hidden');
      });
      const hasMore = cards.length > VISIBLE;
      if (hasMore) ensureButton().style.display = '';
      else if (btn) btn.style.display = 'none';
    };

    // Run after initial render
    setTimeout(applyVisibility, 0);

    // React to dynamically added cards
    const mo = new MutationObserver(() => { setTimeout(applyVisibility, 0); });
    mo.observe(list, { childList: true, subtree: true });
  });
})();
