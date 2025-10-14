(function(){
  const qs = (sel, root=document) => root.querySelector(sel);
  const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const params = new URLSearchParams(location.search);

  const title = params.get('title') || 'Název pozice';
  const locationText = params.get('location') || 'Lokalita dle dohody';
  const type = params.get('type') || 'Plný úvazek';
  const dept = params.get('dept') || 'Oddělení';
  const ref = params.get('ref');
  const image = params.get('image');
  const applyLink = params.get('apply') || (params.get('email') ? `mailto:${params.get('email')}?subject=Přihláška – ${encodeURIComponent(title)}` : '#apply');

  qsa('[data-js="job-title"]').forEach(el => el.textContent = title);
  qsa('[data-js="job-location"]').forEach(el => el.textContent = locationText);
  qsa('[data-js="job-type"]').forEach(el => el.textContent = type);
  qsa('[data-js="job-dept"]').forEach(el => el.textContent = dept);

  if (ref) {
    qsa('.meta-ref').forEach(el => el.hidden = false);
    qsa('[data-js="job-ref"]').forEach(el => el.textContent = ref);
  }

  // Set page title
  document.title = `${title} | Kariéra`;

  // Hero background image override
  if (image) {
    const hero = qs('[data-js="hero"]');
    if (hero) hero.style.backgroundImage = `linear-gradient(180deg, rgba(2,8,23,0.25), rgba(2,8,23,0.6)), url('${image}')`;
  }

  // Also set page background image if provided
  if (image) {
    document.body.style.background = `linear-gradient(180deg, rgba(2,8,23,0.35), rgba(2,8,23,0.65)), url('${image}') center/cover fixed no-repeat`;
  }

  // Wire CTAs
  ['apply-top','apply-bottom','apply-side'].forEach(key => {
    const el = qs(`[data-js="${key}"]`);
    if (!el) return;
    el.setAttribute('href', applyLink);
    if (applyLink.startsWith('#')) {
      el.addEventListener('click', (e) => {
        const id = applyLink.slice(1);
        const target = qs(`#${id}`);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });

  // Copy share link
  const copyBtn = qs('[data-js="copy-link"]');
  const copyStatus = qs('[data-js="copy-status"]');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        if (copyStatus) copyStatus.textContent = 'Odkaz zkopírován do schránky.';
      } catch (e) {
        if (copyStatus) copyStatus.textContent = 'Nepodařilo se zkopírovat odkaz.';
      }
      setTimeout(() => { if (copyStatus) copyStatus.textContent = ''; }, 2500);
    });
  }
})();
