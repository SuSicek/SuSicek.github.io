import { ref, computed } from 'vue'

// Single source of truth for references used across the app
// NOTE: Replace this mock with API/data loading when available
const references = ref([
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
  // Stavba References
  {
    id: 201,
    title: 'Křišťanov – modernizace ČOV a zdroje tepla',
    division: 'Stavba',
    year: 2020,
    price: '6.300.000,-',
    image: '/fotky/references/kristanov/Křišťanov1.jpg',
    images: [
        '/fotky/references/kristanov/Křišťanov1.jpg',
        '/fotky/references/kristanov/Křišťanov2.jpg',
        '/fotky/references/kristanov/Křišťanov3.jpg',
        '/fotky/references/kristanov/Křišťanov4.jpg'
    ],
    short: 'Výstavba zařízení pro čistění odpadních vod z rekreačního areálu a plynofikace uhelné kotelny.',
    long: 'Výstavba zařízení pro čistění odpadních vod z rekreačního areálu a plynofikace uhelné kotelny.'
  },
  {
    id: 202,
    title: 'Oprava vodovodního řadu ve Vojenském újezdu Březina',
    division: 'Stavba',
    year: 2022,
    price: '4.300.000,-',
    image: '/fotky/references/brezina/Březina1.jpg',
    images: [
        '/fotky/references/brezina/Březina1.jpg',
        '/fotky/references/brezina/Březina2.jpg',
        '/fotky/references/brezina/Březina3.jpg',
        '/fotky/references/brezina/Březina4.jpg'
    ],
    short: 'Rekonstrukce stávajícího litinového vodovodního řadu.',
    long: 'Rekonstrukce stávajícího litinového vodovodního řadu pro zajištění dodávky pitné a požární vody do areálu kasáren a přilehlého území.'
  },
  {
    id: 203,
    title: 'Oprava ležaté kanalizace a přípojek Botanická',
    division: 'Stavba',
    year: 2024,
    price: '4.000.000,-',
    image: '/fotky/references/botanicka/Botanická1.JPG',
    images: [
        '/fotky/references/botanicka/Botanická1.JPG',
        '/fotky/references/botanicka/Botanická2.JPG'
    ],
    short: 'Realizace nových domovních přípojek splaškové kanalizace.',
    long: 'Realizace nových domovních přípojek splaškové kanalizace. Pro napojení na hlavní řad kanalizace byla použita metoda štolování.'
  },
  {
    id: 204,
    title: 'ENERGETICKÉ ÚSPORY BUDOVY SMETANOVA 841, VSETÍN',
    division: 'Stavba',
    year: 2023, 
    price: '31.000.000,-',
    image: '/fotky/references/vsetin/Vsetín 1.jpg',
    images: [
        '/fotky/references/vsetin/Vsetín 1.jpg',
        '/fotky/references/vsetin/Vsetín 2.jpg'
    ],
    short: 'Komplexní zateplení administrativního objektu včetně výměny všech oken a dveří.',
    long: 'Komplexní zateplení administrativního objektu včetně výměny všech oken a dveří. Součástí projektu jsou stavební úpravy interiéru, zateplení střechy a půdy, instalace nového hromosvodu a obklad parteru domu mozaikovým obkladem.'
  },
  {
    id: 205,
    title: 'Rekonstrukce požární zbrojnice Brno-Starý Lískovec',
    division: 'Stavba',
    year: 2022,
    price: '8.200.000,-',
    image: '/fotky/references/liskovec/hasička Lískovec 1.jpg',
    images: [
        '/fotky/references/liskovec/hasička Lískovec 1.jpg',
        '/fotky/references/liskovec/hasička Lískovec 2.jpg'
    ],
    short: 'Zateplení fasády, výměna oken, dveří a garážových vrat.',
    long: 'Zateplení fasády, výměna oken, dveří a garážových vrat. Provedení nástavby objektu ve dvorní části a stavební úpravy v interiéru. Součástí stavby byly také nové instalace elektro, ZTI, ÚT a VZT.'
  },
  {
    id: 206,
    title: 'Rekonstrukce 2. NP administrativní budovy Lidická 25/27, Brno',
    division: 'Stavba',
    year: 2024,
    price: '6.000.000,-',
    image: '/fotky/references/lidicka/Lidická1.jpg',
    images: [
        '/fotky/references/lidicka/Lidická1.jpg',
        '/fotky/references/lidicka/Lidická2.jpg',
        '/fotky/references/lidicka/Lidická3.jpg',
        '/fotky/references/lidicka/Lidická4.jpg',
        '/fotky/references/lidicka/Lidická6.jpg'
    ],
    short: 'Rekonstrukce a stavební úpravy 2. nadzemního podlaží administrativní budovy.',
    long: 'Rekonstrukce a stavební úpravy 2. nadzemního podlaží administrativní budovy. Realizovaly se nové kanceláře, sociální zařízení, zázemí pro zaměstnance včetně nových vzduchotechnických zařízení, elektrorozvodů a osvětlení.'
  },
  {
    id: 207,
    title: 'Tábor západ – přestavba parovodu na horkovod',
    division: 'Stavba',
    year: 2023,
    price: '195.000.000,-',
    image: '/fotky/references/tabor/Tábor1.jpg',
     images: [
        '/fotky/references/tabor/Tábor1.jpg',
        '/fotky/references/tabor/Tábor2.jpg',
        '/fotky/references/tabor/Tábor3.jpg'
    ],
    short: 'Přestavba parovodních tepelných rozvodů na horkovodní.',
    long: 'Přestavba parovodních tepelných rozvodů na horkovodní. Cílem této realizace bylo zefektivnit systém centrálního zásobování tepla pro řadu obytných budov, budov občanské vybavenosti, organizací, úřadů a firem ve městě Tábor.'
  },
  {
    id: 208,
    title: 'Rekonstrukce stávajících rozvodů tepla a instalace nových potrubních rozvodů v Bystřici nad Pernštejnem',
    division: 'Stavba',
    year: 2024,
    price: '14.700.000,-',
    image: '/fotky/references/bystrice/Bystřice_1.JPG',
    images: [
        '/fotky/references/bystrice/Bystřice_1.JPG',
        '/fotky/references/bystrice/Bystřice_2.JPG'
    ],
    short: 'Provedení přeložky stávajících Teplovodních rozvodů a položení nových rozvodů.',
    long: 'Provedení přeložky stávajících Teplovodních rozvodů a položení nových rozvodů v provedení PEX dimenzí DN 160, DN 125, DN 80, DN 65. Což znamenalo mimo jiné i překonat místní říčku Bystřici. Celková délka výkopů byla cca 650 bm, procházející zelenými, asfaltovými a dlážděnými povrchy.'
  },
  // TZB References
  {
    id: 101,
    title: 'Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16',
    division: 'TZB',
    year: 2025,
    price: '58.500.000,-',
    image: '/fotky/references/Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16.jpg',
    short: 'Rekonstrukce horkovodu v úseku PŠ – B 16.',
    long: 'Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16.'
  },
  {
    id: 102,
    title: 'Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa',
    division: 'TZB',
    year: 2025,
    price: '14.500.000,-',
    image: '/fotky/references/Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa.jpg',
    short: 'Rekonstrukce parovodů a horkovodů v oblasti ul. Benešova – I. Etapa.',
    long: 'Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa.'
  },
  {
    id: 103,
    title: 'Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká',
    division: 'TZB',
    year: 2024,
    price: '34.700.000,-',
    image: '/fotky/references/Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká.jpg',
    short: 'Instalace DPS v objektech VO10 Bzenecká v rámci rekonstrukce SZT.',
    long: 'Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká.'
  },
  {
    id: 104,
    title: 'ČOV – rekonstrukce kotelny',
    division: 'TZB',
    year: 2022,
    price: '10.400.000,-',
    image: '/fotky/references/ČOV – rekonstrukce kotelny.jpg',
    short: 'Kompletní rekonstrukce technologie kotelny ČOV.',
    long: 'ČOV – rekonstrukce kotelny.'
  },
  {
    id: 105,
    title: 'Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská,  FNUSA II',
    division: 'TZB',
    year: 2025,
    price: '144.000.000,-',
    image: '/fotky/references/Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská,  FNUSA II.jpg',
    short: 'Rozsáhlá rekonstrukce SCZT v oblasti ul. Kopečná, Anenská, FNUSA II.',
    long: 'Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská, FNUSA II.'
  },
  {
    id: 106,
    title: 'Lipník – modernizace zdrojů tepla II. Etapa',
    division: 'TZB',
    year: 2025,
    price: '62.000.000,-',
    image: '/fotky/references/Lipník – modernizace zdrojů tepla II. Etapa.jpg',
    short: 'Druhá etapa modernizace zdrojů tepla v lokalitě Lipník.',
    long: 'Lipník – modernizace zdrojů tepla II. Etapa.'
  },
  {
    id: 107,
    title: 'Rodinný dům, sklad + připojení na inženýrské sítě',
    division: 'TZB',
    year: 2024,
    price: '900.000,-',
    image: '/fotky/references/Rodinný dům, sklad + připojení na inženýrské sítě.jpg',
    short: 'Realizace části TZB pro rodinný dům a sklad.',
    long: 'Rodinný dům, sklad + připojení na inženýrské sítě (část TZB).\n\nCena je uvedena pouze za část TZB.'
  },
  {
    id: 108,
    title: 'Rekonstrukce systému zásobování teplem, Vinohrady – instalace DPS v objektech – VO02 Velkopavlovická',
    division: 'TZB',
    year: 2025,
    price: '35.500.000,-',
    image: '/fotky/references/Rekonstrukce systému zásobování teplem, Vinohrady – instalace DPS v objektech – VO02 Velkopavlovická.jpg',
    short: 'Instalace DPS v objektech VO02 Velkopavlovická.',
    long: 'Rekonstrukce systému zásobování teplem, Vinohrady – instalace DPS v objektech – VO02 Velkopavlovická.'
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
