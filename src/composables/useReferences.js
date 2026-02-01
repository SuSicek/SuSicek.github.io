import { ref, computed } from 'vue'

// Single source of truth for references used across the app
// NOTE: Replace this mock with API/data loading when available
const references = ref([
  {
    id: 1,
    title: 'Administrativní centrum Delta',
    division: 'Stavba',
    year: 2024,
    price: '120.000.000,-',
    image: '/fotky/stavba.png',
    short: 'Komplexní výstavba admin centra, 8 000 m² podlahové plochy.',
    long: 'Komplexní výstavba administrativního centra Delta s celkovou užitnou plochou 8 000 m². Součástí projektu byla kompletní inženýrská činnost, realizace hrubé stavby, technických zařízení budov a finálních interiérů.'
  },
  {
    id: 2,
    title: 'Modernizace kotelny EnergoPlant',
    division: 'Energetika',
    year: 2023,
    price: '45.000.000,-',
    image: '/fotky/energetika.png',
    short: 'Instalace vysoce účinných kotlů a optimalizace distribuce.',
    long: 'Modernizace stávající plynové kotelny na vysoce účinný nízkoemisní zdroj. Instalace kondenzačních kotlů a nového řídicího systému pro optimalizaci distribuce tepla.'
  },
  {
    id: 3,
    title: 'Rekonstrukce retail parku Jih',
    division: 'Stavba',
    year: 2022,
    price: '32.500.000,-',
    image: '/fotky/prodejna.png',
    short: 'Kompletní rekonstrukce objektu a technických systémů.',
    long: 'Rozsáhlá rekonstrukce nákupního parku Jih, zahrnující opravu fasády, výměnu oken a dveří, a kompletní modernizaci vnitřních instalací.'
  },
  {
    id: 5,
    title: 'Výstavba logistického centra NorthHub',
    division: 'Stavba',
    year: 2023,
    price: '85.000.000,-',
    image: '/fotky/kontejner.png',
    short: 'Novostavba haly, administrativy a technologií.',
    long: 'Výstavba nového logistického a skladovacího areálu NorthHub na zelené louce. Areál zahrnuje skladovou halu, administrativní budovu a zpevněné plochy pro kamionovou dopravu.'
  },
  {
    id: 6,
    title: 'FVE a bateriové úložiště EcoSite',
    division: 'Energetika',
    year: 2024,
    price: '18.200.000,-',
    image: '/fotky/energetika.png',
    short: 'Hybridní systém výroby a akumulace elektrické energie.',
    long: 'Instalace střešní fotovoltaické elektrárny o výkonu 450 kWp doplněné o bateriové úložiště s kapacitou 300 kWh. Systém zajišťuje částečnou energetickou soběstačnost areálu.'
  },
  {
    id: 7,
    title: 'Kogenerační jednotka CityHeat',
    division: 'Energetika',
    year: 2022,
    price: '12.800.000,-',
    image: '/fotky/energetika.png',
    short: 'Dodávka a uvedení do provozu kogenerační jednotky.',
    long: 'Dodávka, instalace a zprovoznění kogenerační jednotky pro kombinovanou výrobu elektřiny a tepla. Jednotka slouží jako primární zdroj pro centrální zásobování teplem.'
  },
  // TZB References
  {
    id: 101,
    title: 'Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16',
    division: 'TZB',
    year: 2025,
    price: '58.451.954,-',
    image: '/fotky/references/Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16.jpg',
    short: 'Rekonstrukce horkovodu v úseku PŠ – B 16.',
    long: 'Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16.\n\nDoba realizace: 02/2025 – 12/2025'
  },
  {
    id: 102,
    title: 'Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa',
    division: 'TZB',
    year: 2025,
    price: '14.466.018,-',
    image: '/fotky/references/Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa.jpg',
    short: 'Rekonstrukce parovodů a horkovodů v oblasti ul. Benešova – I. Etapa.',
    long: 'Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa.\n\nDoba realizace: 07/2025 – 11/2025'
  },
  {
    id: 103,
    title: 'Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká',
    division: 'TZB',
    year: 2024,
    price: '34.685.860,-',
    image: '/fotky/references/Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká.jpg',
    short: 'Instalace DPS v objektech VO10 Bzenecká v rámci rekonstrukce SZT.',
    long: 'Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká.\n\nDoba realizace: 06/2024 – 10/2024'
  },
  {
    id: 104,
    title: 'ČOV – rekonstrukce kotelny',
    division: 'TZB',
    year: 2022,
    price: '10.401.068,-',
    image: '/fotky/references/ČOV – rekonstrukce kotelny.jpg',
    short: 'Kompletní rekonstrukce technologie kotelny ČOV.',
    long: 'ČOV – rekonstrukce kotelny.\n\nDoba realizace: 06/2022 – 10/2022'
  },
  {
    id: 105,
    title: 'Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská,  FNUSA II',
    division: 'TZB',
    year: 2025,
    price: '143.806.956,-',
    image: '/fotky/references/Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská,  FNUSA II.jpg',
    short: 'Rozsáhlá rekonstrukce SCZT v oblasti ul. Kopečná, Anenská, FNUSA II.',
    long: 'Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská, FNUSA II.\n\nDoba realizace: 03/2025 – 12/2025'
  },
  {
    id: 106,
    title: 'Lipník – modernizace zdrojů tepla II. Etapa',
    division: 'TZB',
    year: 2025,
    price: '61.874.497,-',
    image: '/fotky/references/Lipník – modernizace zdrojů tepla II. Etapa.jpg',
    short: 'Druhá etapa modernizace zdrojů tepla v lokalitě Lipník.',
    long: 'Lipník – modernizace zdrojů tepla II. Etapa.\n\nDoba realizace: 04/2024 – 04/2025'
  },
  {
    id: 107,
    title: 'Rodinný dům, sklad + připojení na inženýrské sítě',
    division: 'TZB',
    year: 2024,
    price: '857.649,-',
    image: '/fotky/references/Rodinný dům, sklad + připojení na inženýrské sítě.jpg',
    short: 'Realizace části TZB pro rodinný dům a sklad.',
    long: 'Rodinný dům, sklad + připojení na inženýrské sítě (část TZB).\n\nCena je uvedena pouze za část TZB.\n\nDoba realizace: 02/2023 – 07/2024'
  },
  {
    id: 108,
    title: 'Rekonstrukce systému zásobování teplem, Vinohrady – instalace DPS v objektech – VO02 Velkopavlovická',
    division: 'TZB',
    year: 2025,
    price: '35.402.180,-',
    image: '/fotky/references/Rekonstrukce systému zásobování teplem, Vinohrady – instalace DPS v objektech – VO02 Velkopavlovická.jpg',
    short: 'Instalace DPS v objektech VO02 Velkopavlovická.',
    long: 'Rekonstrukce systému zásobování teplem, Vinohrady – instalace DPS v objektech – VO02 Velkopavlovická.\n\nDoba realizace: 06/2025 – 09/2025'
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
