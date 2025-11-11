import { ref, computed } from 'vue'

// Single source of truth for references used across the app
// NOTE: Replace this mock with API/data loading when available
const references = ref([
  {
    id: 1,
    title: 'Administrativní centrum Delta',
    division: 'Stavba',
    year: 2024,
    image: '/fotky/stavba.png',
    short: 'Komplexní výstavba admin centra, 8 000 m² podlahové plochy.'
  },
  {
    id: 2,
    title: 'Modernizace kotelny EnergoPlant',
    division: 'Energetika',
    year: 2023,
    image: '/fotky/energetika.png',
    short: 'Instalace vysoce účinných kotlů a optimalizace distribuce.'
  },
  {
    id: 3,
    title: 'Rekonstrukce retail parku Jih',
    division: 'Stavba',
    year: 2022,
    image: '/fotky/prodejna.png',
    short: 'Kompletní rekonstrukce objektu a technických systémů.'
  },
  {
    id: 4,
    title: 'Instalace HVAC systému TechLabs',
    division: 'TZB',
    year: 2024,
    image: '/fotky/energetika.png',
    short: 'Kompletní dodávka vzduchotechniky a řízení klimatu.'
  },
  {
    id: 5,
    title: 'Výstavba logistického centra NorthHub',
    division: 'Stavba',
    year: 2023,
    image: '/fotky/kontejner.png',
    short: 'Novostavba haly, administrativy a technologií.'
  },
  {
    id: 6,
    title: 'FVE a bateriové úložiště EcoSite',
    division: 'Energetika',
    year: 2024,
    image: '/fotky/energetika.png',
    short: 'Hybridní systém výroby a akumulace elektrické energie.'
  },
  // Extra Energetika to reach >=3
  {
    id: 7,
    title: 'Kogenerační jednotka CityHeat',
    division: 'Energetika',
    year: 2022,
    image: '/fotky/energetika.png',
    short: 'Dodávka a uvedení do provozu kogenerační jednotky pro centrální vytápění.'
  },
  // Extra TZB to reach >=3
  {
    id: 8,
    title: 'VZT systém Kampus Sever',
    division: 'TZB',
    year: 2023,
    image: '/fotky/prodejna.png',
    short: 'Komplexní vzduchotechnika včetně rekuperace a regulace zón.'
  },
  {
    id: 9,
    title: 'Chladicí okruh DataCenter X',
    division: 'TZB',
    year: 2022,
    image: '/fotky/energetika.png',
    short: 'Návrh a instalace redundantního chladicího okruhu pro datové centrum.'
  }
])

// Mapping helpers for division slugs <-> display names
export const divisionKeyToName = (key) => ({ energetika: 'Energetika', stavba: 'Stavba', tzb: 'TZB' }[key] || null)
export const divisionNameToKey = (name) => ({ Energetika: 'energetika', Stavba: 'stavba', TZB: 'tzb' }[name] || null)

export function useReferences() {
  const years = computed(() => Array.from(new Set(references.value.map(r => r.year))).sort((a, b) => b - a))
  const divisions = computed(() => Array.from(new Set(references.value.map(r => r.division))))

  const filterByDivisionKey = (divisionKey) => {
    const name = divisionKeyToName(divisionKey)
    if (!name) return []
    return references.value.filter(r => r.division === name)
  }

  return {
    references,
    years,
    divisions,
    filterByDivisionKey
  }
}
