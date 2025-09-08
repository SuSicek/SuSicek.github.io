document.addEventListener('DOMContentLoaded', () => {
  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Simple counters
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const co = new IntersectionObserver((ents) => {
    ents.forEach(ent => {
      if (!ent.isIntersecting) return;
      const el = ent.target;
      const target = parseInt(el.dataset.count || '0', 10);
      const start = performance.now();
      const dur = 1000 + Math.min(2000, target * 15);

      function tick(ts) {
        const p = Math.min(1, (ts - start) / dur);
        el.textContent = Math.round(target * (0.2 + 0.8 * p));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      co.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => co.observe(el));

  // Mark "O nás" as active in navbar (if links are already rendered)
  const markActive = () => {
    const links = document.querySelectorAll('.navbar-link');
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      const text = a.textContent?.trim().toLowerCase();
      const isAbout = href.endsWith('aboutus.html') || text === 'o nás';
      a.classList.toggle('active', isAbout);
    });
  };
  // Run after content-loader likely renders nav
  setTimeout(markActive, 200);
});
