// References loader with division/name filtering and pagination
(function () {
  const grid = document.getElementById('projectsGrid');
  const loadMoreBtn = document.getElementById('loadMoreRefs');
  const emptyState = document.getElementById('projectsEmpty');
  const searchInput = document.getElementById('refSearchInput');
  const divisionChipset = document.getElementById('refDivisionChips');
  const resetBtn = document.getElementById('refResetBtn');

  if (!grid) return;

  const PAGE_SIZE = 6;
  const SEARCH_DEBOUNCE_MS = 200;

  let projects = [];
  let filteredProjects = [];
  let cursor = 0;
  let searchDebounceId = null;
  let activeDivision = 'all';
  let divisionButtons = [];

  const detailHrefBase = new URL('reference-detail.html', window.location.href).href;

  function updateLoadMoreVisibility() {
    if (!loadMoreBtn) return;
    if (filteredProjects.length === 0 || cursor >= filteredProjects.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = '';
    }
  }

  function syncEmptyState() {
    if (!emptyState) return;
    const shouldHide = filteredProjects.length > 0;
    emptyState.hidden = shouldHide;
    emptyState.setAttribute('aria-hidden', shouldHide ? 'true' : 'false');
    emptyState.style.display = shouldHide ? 'none' : '';
  }

  function setActiveDivision(nextDivision, options = {}) {
    const { apply = true, force = false } = options;
    const shouldUpdate = force || activeDivision !== nextDivision;

    if (!shouldUpdate) {
      if (apply) applyFilters();
      return;
    }

    activeDivision = nextDivision;

    if (divisionButtons.length) {
      divisionButtons.forEach((button) => {
        const isActive = button.dataset.value === activeDivision;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-checked', String(isActive));
        button.tabIndex = isActive ? 0 : -1;
      });
    }

    if (apply) {
      applyFilters();
    }
  }

  function createDivisionButton(value, label) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'ref-chip-button';
    button.dataset.value = value;
    button.textContent = label;
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', 'false');
    button.tabIndex = -1;

    button.addEventListener('click', () => {
      setActiveDivision(value);
    });

    button.addEventListener('keydown', (event) => {
      if (!divisionButtons.length) return;
      let nextIndex = -1;
      const currentIndex = divisionButtons.indexOf(button);
      if (currentIndex === -1) return;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        nextIndex = (currentIndex + 1) % divisionButtons.length;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        nextIndex = (currentIndex - 1 + divisionButtons.length) % divisionButtons.length;
      } else if (event.key === 'Home') {
        event.preventDefault();
        nextIndex = 0;
      } else if (event.key === 'End') {
        event.preventDefault();
        nextIndex = divisionButtons.length - 1;
      }

      if (nextIndex >= 0) {
        const nextButton = divisionButtons[nextIndex];
        if (nextButton) {
          nextButton.focus();
          setActiveDivision(nextButton.dataset.value);
        }
      }
    });

    return button;
  }

  function populateFilterOptions() {
    if (divisionChipset) {
      divisionChipset.setAttribute('role', 'radiogroup');
      if (!divisionChipset.hasAttribute('aria-label') && !divisionChipset.hasAttribute('aria-labelledby')) {
        divisionChipset.setAttribute('aria-label', 'Filtrovat podle divize');
      }
      const divisions = Array.from(
        new Set(
          projects
            .map((project) => project.division)
            .filter((division) => typeof division === 'string' && division.trim().length)
        )
      )
        .map((division) => {
          const cleanLabel = division.trim();
          return {
            label: cleanLabel,
            value: cleanLabel.toLowerCase(),
          };
        })
        .sort((a, b) => a.label.localeCompare(b.label, 'cs', { sensitivity: 'base' }));

      divisionChipset.innerHTML = '';
      divisionButtons = [];

      const allButton = createDivisionButton('all', 'Všechny divize');
      allButton.tabIndex = 0;
      divisionChipset.appendChild(allButton);
      divisionButtons.push(allButton);

      divisions.forEach(({ label, value }) => {
        const button = createDivisionButton(value, label);
        divisionChipset.appendChild(button);
        divisionButtons.push(button);
      });

      setActiveDivision('all', { apply: false, force: true });
    }

  }

  function collectFilterState() {
    const state = {
      search: searchInput ? searchInput.value.trim().toLowerCase() : '',
      division: activeDivision || 'all',
    };

    if (state.division && state.division !== 'all') {
      state.division = state.division.toLowerCase();
    }

    return state;
  }

  function renderCards(projectSlice) {
    const fragment = document.createDocumentFragment();

    projectSlice.forEach((project) => {
      const card = document.createElement('article');
      card.className = 'reference-card';
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        window.location.href = `${detailHrefBase}?i=${project.__index}`;
      });

      const img = document.createElement('img');
      img.className = 'reference-image';
      img.loading = 'lazy';
      img.src = project.image;
      img.alt = project.title || '';

      const overlay = document.createElement('div');
      overlay.className = 'reference-overlay';

      const body = document.createElement('div');
      body.className = 'reference-content';

      const title = document.createElement('h3');
      title.className = 'reference-title';
      title.textContent = project.title || '';

      const category = document.createElement('span');
      category.className = 'reference-category';
      category.textContent = project.division || '';

      const meta = document.createElement('span');
      meta.className = 'reference-meta';
      meta.textContent = project.year ? `${project.year}` : '';

      body.appendChild(title);
      body.appendChild(category);
      if (meta.textContent) {
        body.appendChild(meta);
      }

      card.appendChild(img);
      card.appendChild(overlay);
      card.appendChild(body);

      fragment.appendChild(card);
    });

    grid.appendChild(fragment);
  }

  function renderNext() {
    const slice = filteredProjects.slice(cursor, cursor + PAGE_SIZE);
    if (!slice.length) {
      updateLoadMoreVisibility();
      return;
    }

    renderCards(slice);
    cursor += slice.length;
    updateLoadMoreVisibility();
  }

  function applyFilters() {
    const state = collectFilterState();

    filteredProjects = projects.filter((project) => {
      if (state.division !== 'all') {
        const division = (project.division || '').toLowerCase();
        if (division !== state.division) return false;
      }

      if (state.search) {
        const title = (project.title || '').toLowerCase();
        if (!title.includes(state.search)) return false;
      }

      return true;
    });

    filteredProjects.sort((a, b) => {
      const yearDiff = Number(b.year) - Number(a.year);
      if (yearDiff !== 0) return yearDiff;
      return (a.title || '').localeCompare(b.title || '', 'cs', { sensitivity: 'base' });
    });

    grid.innerHTML = '';
    cursor = 0;
    syncEmptyState();
    renderNext();
  }

  async function init() {
    try {
      let res = await fetch('./data/references.json', { cache: 'no-cache' });
      if (!res.ok) {
        res = await fetch('../data/references.json', { cache: 'no-cache' });
      }
      if (!res.ok) throw new Error('Failed to load references');

      const data = await res.json();
      const source = Array.isArray(data.projects) ? data.projects : [];
      projects = source.map((project, index) => ({ ...project, __index: index }));

      populateFilterOptions();
      setActiveDivision('all', { apply: false, force: true });
      applyFilters();

      if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderNext);
        updateLoadMoreVisibility();
      }

      if (searchInput) {
        searchInput.addEventListener('input', () => {
          if (searchDebounceId) window.clearTimeout(searchDebounceId);
          searchDebounceId = window.setTimeout(() => {
            applyFilters();
          }, SEARCH_DEBOUNCE_MS);
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) {
            searchInput.value = '';
          }
          setActiveDivision('all', { apply: false, force: true });
          applyFilters();
          if (searchInput) {
            searchInput.focus({ preventScroll: true });
          }
        });
      }
    } catch (error) {
      console.error('references-loader:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
