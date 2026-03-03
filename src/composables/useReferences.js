import { ref, computed } from 'vue'

const references = ref([
  // Energetika References
  {
    id: 'energetika-1',
    title: 'Auxilien_BFS - Montáž potrubních tras – SVR v areálu BPS Vyškov',
    division: 'Energetika',
    year: 2025,
    price: '7,3 mil. Kč',
    image: '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_072952_0014_1755585215369_photo.jpg',
    images: [
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_073712_0035_1755585209488_photo.jpg',
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_072930_0012_1755585215618_photo.jpg',
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_072952_0014_1755585215369_photo.jpg',
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_073908_0039_1755585208419_photo.jpg',
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_074016_0044_1755585207372_photo.jpg'
    ],
    short: 'Výstavba nového elektrokotle a potrubních tras v bioplynové stanici.',
    long: 'V areálu bioplynové stanice Vyškov jsme realizovali výstavbu nového elektrokotle o výkonu 12 MWe, který zajistil stabilitu elektrické sítě pod dohledem ČEPS. Projekt zahrnoval montáž vysokonapěťového zdroje, rozsáhlých potrubních systémů DN200–400, 5 chladicích věží s výkonem 16,8 MWt, ocelových konstrukcí a všechny doprovodné práce.'
  },
  {
    id: 'energetika-2',
    title: 'VD Bojkovice - oprava elektroinstalace',
    division: 'Energetika',
    year: 2025,
    price: '2 mil. Kč',
    image: '/fotky/references/energetika/620 - Bojkovice/Nový stav pohony.jpg',
    images: [
      '/fotky/references/energetika/620 - Bojkovice/Nový stav pohony.jpg',
      '/fotky/references/energetika/620 - Bojkovice/20250512_081237.jpg',
      '/fotky/references/energetika/620 - Bojkovice/att.eDn8QnGaZ51u6qfcLcVvBA_3h7rMYMyI68757gcQmaM.JPG',
      '/fotky/references/energetika/620 - Bojkovice/att.iTDdVS3nz_21JyY7AcgV8gJ613kFavBkL3_-F8mgxo8.JPG',
      '/fotky/references/energetika/620 - Bojkovice/att.xR_1CGnI0iXHHkGZtph7p7Aaa42cdSK_qn1O_5ZSxjk.JPG',
      '/fotky/references/energetika/620 - Bojkovice/att.z8Pgzb6-IpjlkxZDHpAyOksMXkEh4A-NfBRuaOp0k5o.JPG'
    ],
    short: 'Výměna dosloužilých pohonů návodních a provozních uzávěrů. Nová technologická i stavební elektroinstalace včetně nových rozvaděčů.',
    long: 'Výměna dosloužilých pohonů návodních a provozních uzávěrů. Nová technologická i stavební elektroinstalace včetně nových rozvaděčů. Zabezpečovací a kamerový systém. Dálková vizualizace a hlášení provozních stavů. Stávající pohony bylo nutné demontovat, detailně zaměřit a poté nechat přesně vysoustružit, aby nové pohony dokonale sedli na stávající uzávěry. Práce probíhala ve strojovně, která je více než 10 metrů pod hladinou, proto bylo nutné rozvaděče a pohony dopravit na místo určení pomocí jeřábu. Vzhledem ke koroznímu prostředí bylo vše dodáváno v nerezovém provedení.'
  },
  {
    id: 'energetika-3',
    title: 'C-Energy - PD - Redukční stanice páry',
    division: 'Energetika',
    year: 2025,
    price: '20 mil. Kč',
    image: '/fotky/references/energetika/603 - C-energy, redukční stanice/bd244106-9c09-4f5d-8fc9-adbdcd7462c4.jpeg',
    images: [
      '/fotky/references/energetika/603 - C-energy, redukční stanice/bd244106-9c09-4f5d-8fc9-adbdcd7462c4.jpeg',
      '/fotky/references/energetika/603 - C-energy, redukční stanice/a4b993f1-b99f-4874-ba0f-37851606be83.jpeg',
      '/fotky/references/energetika/603 - C-energy, redukční stanice/f565fdb8-464a-44b5-8ea3-d940566f5c63.png'
    ],
    short: 'Návrh a projektová dokumentace na rekonstrukci redukční stanice páry.',
    long: 'Byl zpracován návrh redukční stanice páry včetně projektové dokumentace na rekonstrukci stávající redukční stanice o výkonu 60 tun. Navržené řešení zajišťuje redukci parametrů páry z původních 520 °C a tlaku 40 barů na výstupní hodnoty 280 °C a 3 bary, a to v souladu s technologickými požadavky provozu. Součástí projektu je rovněž výměna potrubí za redukční stanicí až do stávajícího rozdělovače, včetně navazujících ocelových konstrukcí.'
  },
  {
    id: 'energetika-4',
    title: 'Úprava ochrany před bleskem - Jihomoravské náměstí 1a',
    division: 'Energetika',
    year: 2024,
    price: '0,3 mil. Kč',
    image: '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_1.jpg',
    images: [
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_1.jpg',
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_135228.jpg',
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_135236.jpg',
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_135344.jpg',
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_140147.jpg'
    ],
    short: 'Demontáž původní a montáž nové soustavy ochrany před bleskem.',
    long: 'Byla provedena demontáž původní soustavy ochrany před bleskem, konkrétně mřížové soustavy, která již nevyhovovala současným požadavkům. Následně byla realizována montáž nové soustavy ochrany před bleskem v souladu s platnými normami a projektovou dokumentací. Nové řešení zohledňuje instalaci fotovoltaické elektrárny (FVE) a zajišťuje odpovídající úroveň ochrany objektu i technologického vybavení.'
  },
  {
    id: 'energetika-5',
    title: 'PLANÁ - HVS - PD - Navýšení výkonu HVS na zdroji C-energy',
    division: 'Energetika',
    year: 2025,
    price: '76 mil. Kč',
    image: '/fotky/references/energetika/603 - PLANÁ - HVS - PD - Navýšení výkonu HVS/Projekt bez názvu (11).jpg',
    images: [
      '/fotky/references/energetika/603 - PLANÁ - HVS - PD - Navýšení výkonu HVS/Projekt bez názvu (11).jpg'
    ],
    short: 'Výměna oběhových čerpadel a navýšení výkonu výměníkových stanic.',
    long: 'Byla provedena výměna oběhových čerpadel v horkovodní soustavě Planá. Každé čerpadlo má průtok 600 tun a celkem budou instalována tři čerpadla. Součástí projektu bylo navýšení výkonu výměníkových stanic o 20 MW. Projekt zahrnoval kompletní realizaci, včetně stavby, měření a strojní části. Instalovány byly dva zaplavované trubkové výměníky.'
  },
  // Stavba References
  {
    id: 'stavba-1',
    title: 'Tábor západ – přestavba parovodu na horkovod',
    division: 'Stavba',
    year: 2023,
    price: '195 000 000,- Kč',
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
    id: 'stavba-2',
    title: 'ENERGETICKÉ ÚSPORY BUDOVY SMETANOVA 841, VSETÍN',
    division: 'Stavba',
    year: 2023, 
    price: '31 000 000,- Kč',
    image: '/fotky/references/vsetin/Vsetín 1.jpg',
    images: [
        '/fotky/references/vsetin/Vsetín 1.jpg',
        '/fotky/references/vsetin/Vsetín 2.jpg'
    ],
    short: 'Komplexní zateplení administrativního objektu včetně výměny všech oken a dveří.',
    long: 'Komplexní zateplení administrativního objektu včetně výměny všech oken a dveří. Součástí projektu jsou stavební úpravy interiéru, zateplení střechy a půdy, instalace nového hromosvodu a obklad parteru domu mozaikovým obkladem.'
  },
  {
    id: 'stavba-3',
    title: 'Projekt Lesná',
    division: 'Stavba',
    year: 2024,
    price: '-',
    image: '/fotky/references/Lesná/PD Lesná.jpg',
    images: [
        '/fotky/references/Lesná/PD Lesná.jpg'
    ],
    short: 'Kompletní projektová dokumentace a realizace pro lokalitu Lesná.',
    long: 'Kompletní projektová dokumentace a realizace pro lokalitu Lesná. Projekt zahrnuje architektonické i technické řešení.'
  },
  {
    id: 'stavba-4',
    title: 'Rekonstrukce 2. NP administrativní budovy Lidická 25/27, Brno',
    division: 'Stavba',
    year: 2024,
    price: '6 000 000,- Kč',
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
    id: 'stavba-5',
    title: 'Rekonstrukce požární zbrojnice Brno-Starý Lískovec',
    division: 'Stavba',
    year: 2022,
    price: '8 200 000,- Kč',
    image: '/fotky/references/liskovec/hasička Lískovec 1.jpg',
    images: [
        '/fotky/references/liskovec/hasička Lískovec 1.jpg',
        '/fotky/references/liskovec/hasička Lískovec 2.jpg'
    ],
    short: 'Zateplení fasády, výměna oken, dveří a garážových vrat.',
    long: 'Zateplení fasády, výměna oken, dveří a garážových vrat. Provedení nástavby objektu ve dvorní části a stavební úpravy v interiéru. Součástí stavby byly také nové instalace elektro, ZTI, ÚT a VZT.'
  },
  {
    id: 'stavba-6',
    title: 'Rekonstrukce stávajících rozvodů tepla a instalace nových potrubních rozvodů v Bystřici nad Pernštejnem',
    division: 'Stavba',
    year: 2024,
    price: '14 700 000,- Kč',
    image: '/fotky/references/bystrice/Bystřice_1.JPG',
    images: [
        '/fotky/references/bystrice/Bystřice_1.JPG',
        '/fotky/references/bystrice/Bystřice_2.JPG'
    ],
    short: 'Provedení přeložky stávajících Teplovodních rozvodů a položení nových rozvodů.',
    long: 'Provedení přeložky stávajících Teplovodních rozvodů a položení nových rozvodů v provedení PEX dimenzí DN 160, DN 125, DN 80, DN 65. Což znamenalo mimo jiné i překonat místní říčku Bystřici. Celková délka výkopů byla cca 650 bm, procházející zelenými, asfaltovými a dlážděnými povrchy.'
  },
  {
    id: 'stavba-7',
    title: 'Křišťanov – modernizace ČOV a zdroje tepla',
    division: 'Stavba',
    year: 2020,
    price: '6 300 000,- Kč',
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
    id: 'stavba-8',
    title: 'Oprava vodovodního řadu ve Vojenském újezdu Březina',
    division: 'Stavba',
    year: 2022,
    price: '4 300 000,-',
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
    id: 'stavba-9',
    title: 'Rekonstrukce hasičské zbrojnice Husovice – 3. etapa',
    division: 'Stavba',
    year: 2024,
    price: '380 000,- Kč',
    image: '/fotky/references/hasička Husovice/hasička1.png',
    images: [
        '/fotky/references/hasička Husovice/hasička1.png',
        '/fotky/references/hasička Husovice/hasička2.png',
        '/fotky/references/hasička Husovice/hasička3.png'
    ],
    short: 'Přístavba v areálu hasičské zbrojnice v Brně-Husovicích.',
    long: 'Přístavba v areálu hasičské zbrojnice v Brně-Husovicích. Projekt zahrnuje kompletní stavební část, statiku a všechny profesní části včetně elektro, TZB, VZT, FVE a dalších souvisejících systémů.'
  },
  {
    id: 'stavba-10',
    title: 'Oprava ležaté kanalizace a přípojek Botanická',
    division: 'Stavba',
    year: 2024,
    price: '4 000 000,- Kč',
    image: '/fotky/references/botanicka/Botanická1.JPG',
    images: [
        '/fotky/references/botanicka/Botanická1.JPG',
        '/fotky/references/botanicka/Botanická2.JPG'
    ],
    short: 'Realizace nových domovních přípojek splaškové kanalizace.',
    long: 'Realizace nových domovních přípojek splaškové kanalizace. Pro napojení na hlavní řad kanalizace byla použita metoda štolování.'
  },
  // TZB References
  {
    id: 'tzb-1',
    title: 'ČOV – rekonstrukce kotelny',
    division: 'TZB',
    year: 2022,
    price: '8 600 000,- Kč ',
    image: '/fotky/references/ČOV – rekonstrukce kotelny.jpg',
    short: 'Instalace tří plynových nízkoteplotních litinových kotlů s přetlakovým spalováním.',
    long: 'Instalace tří plynových nízkoteplotních litinových kotlů s přetlakovým spalováním. Dva nízkoteplotní litinové kotle o maximálním výkonu 1020 kW, typ: BUDERUS LOGANO GE615 921-1020 a jeden nízkoteplotní litinový kotel o maximálním výkonu 740 kW, typ: BUDERUS LOGANO GE615 661-740. Celkový instalovaný výkon 2780 kW.'
  },
  {
    id: 'tzb-2',
    title: 'Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká',
    division: 'TZB',
    year: 2024,
    price: '28 700 000,- Kč',
    image: '/fotky/references/Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká.jpg',
    short: 'Náhrada teplovodních rozvodů a decentralizace topení a přípravy teplé vody.',
    long: 'Náhrada stávajících teplovodních rozvodů za horkovodní a současná decentralizace topení a přípravy teplé vody. Instalace jedenácti domovních předávacích stanic vč. měření a regulace.'
  },
  {
    id: 'tzb-3',
    title: 'Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa',
    division: 'TZB',
    year: 2025,
    price: '12 000 000,- Kč',
    image: '/fotky/references/Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa.jpg',
    short: 'Náhrada parovodního potrubí za nový horkovod na ulici Benešova.',
    long: 'Náhrada parovodního potrubí za nový horkovod převážně ve stávající trase na ulici Benešova. Délka trasy předizolovaného potrubí 2x DN 150/280 – 98 m.'
  },
  {
    id: 'tzb-4',
    title: 'Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská,  FNUSA II',
    division: 'TZB',
    year: 2025,
    price: '119 000 000,- Kč ',
    image: '/fotky/references/Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská,  FNUSA II.jpg',
    short: 'Náhrada parovodního potrubí za nový horkovod na ulicích Kopečná, Anenská, Vodní a Hybešova v Brně.',
    long: 'Náhrada parovodního potrubí za nový horkovod na ulicích Kopečná, Anenská, Vodní a Hybešova v Brně. Délka trasy potrubí 2x DN 250/450 – cca 680 m, potrubí 2x DN 200/355 – cca 86, potrubí 2x DN 150/280 – cca 53 m aj. Celková délka horkovodu ve stávající a nové trase cca 1202,9 m.'
  },
  {
    id: 'tzb-5',
    title: 'Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16',
    division: 'TZB',
    year: 2025,
    price: '48 000 000,- Kč',
    image: '/fotky/references/Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16.jpg',
    short: 'Náhrada parovodního potrubí za nový horkovod na ulicích Špitálka, Plynárenská a Tkalcovská.',
    long: 'Náhrada parovodního potrubí za nový horkovod převážně ve stávající trase na ulicích Špitálka, Plynárenská a Tkalcovská. Délka trasy potrubí 2x DN 300/500 – 449 m a 2x DN 250/400 – 52 m.'
  },
  {
    id: 'tzb-6',
    title: 'Lipník – modernizace zdrojů tepla II. Etapa',
    division: 'TZB',
    year: 2025,
    price: '51 100 000,- Kč ',
    image: '/fotky/references/Lipník – modernizace zdrojů tepla II. Etapa.jpg',
    short: 'Stavební práce spočívající v modernizaci plynových kotelen ve vojenském areálu.',
    long: 'Předmětem díla byly stavební práce spočívající v modernizaci plynových kotelen v objektech nacházejících se ve vojenském areálu Lipník nad Bečvou.'
  },
  {
    id: 'tzb-7',
    title: 'Rodinný dům, sklad + připojení na inženýrské sítě',
    division: 'TZB',
    year: 2024,
    price: '700 000,- Kč ',
    image: '/fotky/references/Rodinný dům, sklad + připojení na inženýrské sítě.jpg',
    short: 'Realizace podlahového topení, rozvody vody a kanalizace a dodávka zdravotně zařizovacích předmětů.',
    long: 'Realizace podlahového topení, rozvody vody a kanalizace a dodávka zdravotně zařizovacích předmětů.'
  },
  {
    id: 'tzb-8',
    title: 'Rekonstrukce systému zásobování teplem, Vinohrady – instalace DPS v objektech – VO02 Velkopavlovická',
    division: 'TZB',
    year: 2025,
    price: '29 200 000,- Kč',
    image: '/fotky/references/Rekonstrukce systému zásobování teplem, Vinohrady – instalace DPS v objektech – VO02 Velkopavlovická.jpg',
    short: 'Náhrada teplovodních rozvodů a decentralizace topení a přípravy teplé vody.',
    long: 'Náhrada stávajících teplovodních rozvodů za horkovodní a současná decentralizace topení a přípravy teplé vody. Instalace dvanácti domovních předávacích stanic vč. měření a regulace.'
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
