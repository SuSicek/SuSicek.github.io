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

  const thumbItems = Array.from(document.querySelectorAll('.culture-thumb'));
  const thumbButtons = thumbItems
    .map((item) => item.querySelector('.culture-thumb-button'))
    .filter((button) => button instanceof HTMLElement);

  const cultureLinks = Array.from(document.querySelectorAll('.culture-list .culture-link'));

  let activeId = feature.dataset.active || (thumbItems[0] ? thumbItems[0].id : null);

  function setPressed(button, pressed) {
    button.setAttribute('aria-pressed', String(pressed));
  }

  function swapImage(button) {
    const currentSrc = featureImg.getAttribute('src');
    const newSrc = button.dataset.image || currentSrc;

    if (currentSrc !== newSrc) {
      feature.classList.add('is-swapping');
      const clearSwapState = () => {
        feature.classList.remove('is-swapping');
      };
      featureImg.addEventListener('load', clearSwapState, { once: true });
      featureImg.addEventListener('error', clearSwapState, { once: true });
      featureImg.setAttribute('src', newSrc);
    } else {
      feature.classList.remove('is-swapping');
    }

    featureImg.setAttribute('alt', button.dataset.alt || '');
    featureLabel.textContent = button.dataset.label || '';
    featureCopy.textContent = button.dataset.copy || '';
  }

  function activateThumb(id, options = {}) {
    const thumbItem = thumbItems.find((item) => item.id === id);
    const button = thumbItem ? thumbItem.querySelector('.culture-thumb-button') : null;

    if (!thumbItem || !(button instanceof HTMLElement)) {
      return;
    }

    if (activeId === id) {
      if (options.scrollToThumb) {
        thumbItem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
      return;
    }

    thumbItems.forEach((item) => item.classList.toggle('is-active', item === thumbItem));
    thumbButtons.forEach((btn) => setPressed(btn, btn === button));

    swapImage(button);

    feature.dataset.active = id;
    activeId = id;

    if (options.scrollToThumb) {
      thumbItem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }

  thumbButtons.forEach((button) => {
    const parent = button.closest('.culture-thumb');
    if (!parent || !parent.id) {
      return;
    }

    button.addEventListener('click', () => {
      activateThumb(parent.id);
      feature.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateThumb(parent.id);
        feature.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  cultureLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (!href.startsWith('#')) {
      return;
    }
    const targetId = href.slice(1);

    link.addEventListener('click', (event) => {
      const targetExists = thumbItems.some((item) => item.id === targetId);
      if (!targetExists) {
        return;
      }
      event.preventDefault();
      activateThumb(targetId, { scrollToThumb: true });
      feature.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    link.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const targetExists = thumbItems.some((item) => item.id === targetId);
        if (!targetExists) {
          return;
        }
        event.preventDefault();
        activateThumb(targetId, { scrollToThumb: true });
        feature.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  if (activeId) {
    activateThumb(activeId);
  }
});
