document.addEventListener('DOMContentLoaded', () => {
  const feature = document.querySelector('.culture-feature');
  if (!feature) {
    return;
  }

  const featureImg = feature.querySelector('img');
  const featureLabel = feature.querySelector('.culture-feature-label');
  const featureCopy = feature.querySelector('.culture-feature-copy');

  if (!featureImg || !featureLabel || !featureCopy) {
    return;
  }

  const cultureLinks = Array.from(document.querySelectorAll('.culture-list .culture-link'));
  if (!cultureLinks.length) {
    return;
  }

  let activeLink = null;

  function swapFeature(link) {
    const nextSrc = link.dataset.image || featureImg.getAttribute('src');
    const nextAlt = link.dataset.alt || '';
    const nextLabel = link.dataset.label || link.querySelector('.culture-link-title')?.textContent || '';
    const nextCopy = link.dataset.copy || link.querySelector('.culture-link-text')?.textContent || '';

    if (featureImg.getAttribute('src') !== nextSrc) {
      feature.classList.add('is-swapping');
      const clearSwapState = () => {
        feature.classList.remove('is-swapping');
      };
      featureImg.addEventListener('load', clearSwapState, { once: true });
      featureImg.addEventListener('error', clearSwapState, { once: true });
      featureImg.setAttribute('src', nextSrc);
    }

    featureImg.setAttribute('alt', nextAlt);
    featureLabel.textContent = nextLabel;
    featureCopy.textContent = nextCopy;
  }

  function activateLink(link, options = {}) {
    if (!link || link === activeLink) {
      if (options.scrollToFeature) {
        feature.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    cultureLinks.forEach((item) => {
      const isActive = item === link;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    swapFeature(link);
    activeLink = link;
    feature.dataset.active = link.dataset.label || link.dataset.image || '';

    if (options.scrollToFeature) {
      feature.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  cultureLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      activateLink(link, { scrollToFeature: true });
    });

    link.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateLink(link, { scrollToFeature: true });
      }
    });
  });

  activateLink(cultureLinks[0]);
});
