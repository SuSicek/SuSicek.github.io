import { ref, computed } from 'vue'

const references = ref([
  // Energetika References
  {
    id: 'energetika-1',
    slug: 'montaz-potrubich-tras-bps-vyskov',
    title: 'Auxilien - Montáž potrubních tras – SVR v areálu BPS Vyškov',
    division: 'Energetika',
    year: 2025,
    price: '8 mil. Kč',
    location: 'Vyškov',
    financial: '8 mil. Kč',
    center: '610',
    image: '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_072952_0014_1755585215369_photo.jpg',
    images: [
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_072952_0014_1755585215369_photo.jpg',
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_073908_0039_1755585208419_photo.jpg',
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_074016_0044_1755585207372_photo.jpg',
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_072930_0012_1755585215618_photo.jpg',
      '/fotky/references/energetika/610 - Vyškov/dji_fly_20250819_073712_0035_1755585209488_photo.jpg'
    ],
    short: 'Výstavba nového elektrokotle a potrubních tras v bioplynové stanici.',
    long: 'V areálu bioplynové stanice ve Vyškově jsme realizovali výstavbu a montáž nového vysokonapěťového elektrokotle o elektrickém výkonu 12 MWe. Tento zdroj byl primárně vybudován pro zajištění výkonové rovnováhy a stability přenosové soustavy pod správou operátora ČEPS. Naše plnění v rámci tohoto projektu zahrnovalo kompletní strojní montáž elektrokotle, instalaci pěti chladicích věží s celkovým tepelným výkonem 16,8 MWt a montáž přidružených ocelových konstrukcí. Zásadní součástí prací byla rovněž instalace vysokoteplotních okruhů, rozvodů chladicího média, napojení na výměníky, osazení čerpadel a bezpečnostních prvků včetně výstavby potrubních tras a rozdělovačů v dimenzích DN200 až DN400.'
  },
  {
    id: 'energetika-2',
    slug: 'oprava-elektroinstalace-vd-bojkovice',
    title: 'VD Bojkovice - oprava elektroinstalace',
    division: 'Energetika',
    year: 2025,
    price: '2 mil. Kč',
    location: 'Bojkovice',
    financial: '2 mil. Kč',
    center: '620',
    technicians: 'Grombíř, Šmerda',
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
    slug: 'pd-navyseni-vykonu-hvs-c-energy-plana',
    title: 'PD Navýšení výkonu HVS na zdroji C-energy',
    division: 'Energetika',
    year: 2026,
    price: '2 mil. Kč',
    location: 'Planá nad Lužnicí',
    financial: '2 mil. Kč',
    center: '603',
    image: '/fotky/references/energetika/603 - PLANÁ - HVS - PD - Navýšení výkonu HVS/f565fdb8-464a-44b5-8ea3-d940566f5c63.png',
    images: [
      '/fotky/references/energetika/603 - PLANÁ - HVS - PD - Navýšení výkonu HVS/a4b993f1-b99f-4874-ba0f-37851606be83.jpeg',
      '/fotky/references/energetika/603 - PLANÁ - HVS - PD - Navýšení výkonu HVS/bd244106-9c09-4f5d-8fc9-adbdcd7462c4.jpeg',
      '/fotky/references/energetika/603 - PLANÁ - HVS - PD - Navýšení výkonu HVS/f565fdb8-464a-44b5-8ea3-d940566f5c63.png'
    ],
    short: 'Projektová dokumentace pro navýšení výkonu hlavní výměníkové stanice.',
    long: 'V rámci rozšiřování energetické infrastruktury jsme zpracovali projektovou dokumentaci pro navýšení výkonu hlavní výměníkové stanice (HVS) v areálu teplárny C-Energy v Plané nad Lužnicí. Cílem projektu je celkové navýšení tepelného výkonu HVS o 20 MWt, a to integrací nového špičkového ohříváku o výkonu 10 MWt a základního ohříváku o výkonu 10 MWt. Náš návrh pokrývá jak technologickou část, tak stavební úpravy, které zahrnují demolici původních konstrukcí a realizaci nových železobetonových základů pro oběhová čerpadla uvnitř stávající haly. Pro ochranu nově instalovaných technologií, expanzních systémů a dochlazovačů kondenzátu je navržena přístavba nového ocelového přístřešku opláštěného sendvičovými panely. Projekt je koncipován s důrazem na minimalizaci prostojů.'
  },
  {
    id: 'energetika-4',
    slug: 'uprava-horkovodni-site-czt-plzen',
    title: 'Plzeňská teplárenská, a.s. - Úprava horkovodní sítě CZT',
    division: 'Energetika',
    year: 2025,
    price: '38,5 mil. Kč',
    location: 'Plzeň',
    financial: '38,5 mil. Kč',
    center: '603',
    image: '/fotky/references/energetika/603 - REF - Plzeň/IMG_1.JPEG',
    images: [
      '/fotky/references/energetika/603 - REF - Plzeň/IMG_1.JPEG',
      '/fotky/references/energetika/603 - REF - Plzeň/IMG_2.JPEG'
    ],
    short: 'Komplexní úprava horkovodní sítě centrálního zásobování teplem.',
    long: 'Pro společnost Plzeňská teplárenská, a.s. jsme formou dodávky na klíč realizovali projekt situovaný do dvou provozů: Doubravka a Energetika. Jádrem technického plnění byla instalace soustavy posilovacích čerpadel a jejich potrubní napojení na stávající infrastrukturu centrálního zásobování teplem, včetně implementace technologie nezbytné pro řízení provozu a navazující datové přenosy. Součástí komplexního inženýringu bylo zpracování prováděcí projektové dokumentace, demontáž a ekologická likvidace původních strojních zařízení i realizace nových nosných konstrukcí.'
  },
  {
    id: 'energetika-5',
    slug: 'plynova-kotelna-rozvody-pary-fnusa-brno',
    title: 'Amper Industry s.r.o. - Plynová kotelna, rozvody páry, přípojka STL plyn – FNUSA',
    division: 'Energetika',
    year: 2025,
    price: '65,5 mil. Kč',
    location: 'Brno',
    financial: '65,5 mil. Kč',
    center: '603',
    image: '/fotky/references/energetika/603 - REF - FNUSA/IMG_1.JPEG',
    images: [
      '/fotky/references/energetika/603 - REF - FNUSA/IMG_1.JPEG',
      '/fotky/references/energetika/603 - REF - FNUSA/IMG_2.JPEG'
    ],
    short: 'Komplexní optimalizace parního systému a vybudování centrálního zdroje.',
    long: 'V rámci EPC projektu pro Fakultní nemocnici u sv. Anny v Brně jsme jako partner společnosti Amper Industry, s.r.o. zrealizovali komplexní optimalizaci parního systému a vybudování nového centrálního zdroje. Jádrem technického plnění byla kompletní dodávka a instalace parní kotelny s celkovým výkonem do 3,5 MWt. Zajišťovali jsme ucelený proces od zpracování projektové dokumentace (DSP, DPS, DSPS) a inženýringu, přes vybudování nové středotlaké plynové přípojky s řízeným protlakem, osazení úpravny napájecí vody s reverzní osmózou a kondenzátního hospodářství, až po realizaci navazujících areálových parních rozvodů pro VZT a nemocniční sterilizaci. Součástí zprovoznění byla kompletní integrace technologie do systému MaR.'
  },
  {
    id: 'energetika-6',
    slug: 'parovod-madeta-jindrichuv-hradec',
    title: 'Parovod MADETA – Jindřichův Hradec',
    division: 'Energetika',
    year: 2025,
    price: '102,5 mil. Kč',
    location: 'Jindřichův Hradec',
    financial: '102,5 mil. Kč',
    center: '610',
    image: '/fotky/references/energetika/610 - REF - Madeta/IMG_1.JPEG',
    images: [
      '/fotky/references/energetika/610 - REF - Madeta/IMG_1.JPEG',
      '/fotky/references/energetika/610 - REF - Madeta/IMG_2.JPEG'
    ],
    short: 'Výstavba dálkového parovodu pro výrobní závod MADETA.',
    long: 'Naše firma zhotovila pro výrobní závod MADETA a.s. v Jindřichově Hradci nový dálkový parovod, který zajišťuje primární energetické zásobování podniku technologickou párou z Energetického centra s.r.o. Tímto řešením jsme úspěšně nahradili produkci páry z lokálních plynových kotlů za zdroj z biomasy. Liniová stavba o celkové délce 2 285 metrů je realizována jako dvoutrubkový předizolovaný systém, jež byl doplněn o soustavu šachet.'
  },
  {
    id: 'energetika-7',
    slug: 'vymena-elektroinstalace-zs-havirov',
    title: 'Havířov - ZŠ M. Kudeříkové - výměna elektroinstalace a datových rozvodů',
    division: 'Energetika',
    year: 2025,
    price: '47 mil. Kč',
    location: 'Havířov',
    financial: '47 mil. Kč',
    center: '620',
    image: '/fotky/references/energetika/620 - REF - ZŠ Kudeříkové/IMG_1.JPEG',
    images: [
      '/fotky/references/energetika/620 - REF - ZŠ Kudeříkové/IMG_1.JPEG',
      '/fotky/references/energetika/620 - REF - ZŠ Kudeříkové/IMG_4032.JPEG'
    ],
    short: 'Kompletní výměna elektroinstalace a datových rozvodů v základní škole.',
    long: 'Pro statutární město Havířov jsme zrealizovali zakázku na kompletní výměnu elektroinstalace a datových rozvodů v budovách Základní školy M. Kudeříkové. Tento rozsáhlý projekt zahrnoval stavební a montážní práce hned v pěti školních pavilonech a přilehlých prostorech tělocvičny a koridorů. Náš tým zvládl dokončení a předání plně funkčního díla ve stanovené lhůtě 120 kalendářních dnů od převzetí staveniště.'
  },
  {
    id: 'energetika-8',
    slug: 'opravy-energetickych-zarizeni-teplarny-brno',
    title: 'Teplárny Brno, a.s. - Opravy energetických zařízení',
    division: 'Energetika',
    year: 2013,
    price: 'cca 10 mil ročně',
    location: 'Brno',
    financial: 'cca 10 mil ročně',
    center: '630',
    image: '/fotky/references/energetika/630 - REF - Opravy energetických zařízení/IMG_1.JPEG',
    images: [
      '/fotky/references/energetika/630 - REF - Opravy energetických zařízení/IMG_1.JPEG',
      '/fotky/references/energetika/630 - REF - Opravy energetických zařízení/IMG_2.JPEG'
    ],
    short: 'Komplexní servisní činnosti, údržba a havarijní opravy energetických celků.',
    long: 'V rámci zajištění provozní spolehlivosti vykonáváme pro společnost Teplárny Brno, a.s. realizaci komplexní servisní činnosti, údržbu a havarijní opravy energetických celků. Naše plnění zahrnuje práce na strojních, plynových, tlakových a zvedacích zařízeních napříč tepelnými zdroji, distribučními elektrorozvodnami a parními či horkovodními sítěmi na území města Brna. Divize Energetika zajišťuje nepřetržitou havarijní pohotovost v režimu 24/7 s garantovaným nástupem k zásahu do 4 hodin od vyzvání. Zajišťovali jsme rovněž specializované opravy a revize turbín, tlakových nádob, čerpadel, kotlů a výměníků, včetně certifikovaných svářečských a zámečnických prací či vystavování revizních zpráv. Součástí náplně údržby jsou také práce na elektroinstalaci včetně MaR.'
  },
  {
    id: 'energetika-9',
    slug: 'fve-97kwp-strecha-ecjh-jindrichuv-hradec',
    title: 'Energetické centrum s.r.o. - FVE 97,2 kWp na střeše objektu ECJH',
    division: 'Energetika',
    year: 2023,
    price: '3,2 mil. Kč',
    location: 'Jindřichův Hradec',
    financial: '3,2 mil. Kč',
    center: '630',
    image: '/fotky/references/energetika/630 - REF - FVE 100kWp/IMG_1.JPG',
    images: [
      '/fotky/references/energetika/630 - REF - FVE 100kWp/DJI_0307.JPG',
      '/fotky/references/energetika/630 - REF - FVE 100kWp/DJI_0313.JPG',
      '/fotky/references/energetika/630 - REF - FVE 100kWp/IMG_1.JPG'
    ],
    short: 'Kompletní dodávka a montáž střešní fotovoltaické elektrárny.',
    long: 'Pro společnost Energetické centrum s.r.o. jsme zajistili kompletní dodávku a montáž střešní fotovoltaické elektrárny o výkonu 97,2 kWp v areálu v Jindřichově Hradci. Zakázka obsáhla zhotovení plně funkčního provozuschopného díla včetně zpracování dokumentace skutečného provedení stavby a nezbytné součinnosti při připojení do distribuční sítě společnosti EG.D, a.s..'
  },
  {
    id: 'energetika-10',
    slug: 'uprava-ochrany-pred-bleskem',
    title: 'Úprava ochrany před bleskem',
    division: 'Energetika',
    year: 2024,
    price: '',
    location: '',
    financial: '',
    center: '630',
    image: '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_1.jpg',
    images: [
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_1.jpg',
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_135228.jpg',
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_135236.jpg',
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_135344.jpg',
      '/fotky/references/energetika/630 - úprava ochrany před bleskem/IMG_20241007_140147.jpg'
    ],
    short: '',
    long: ''
  },
  // Stavba References
  {
    id: 'stavba-1',
    slug: 'prestavba-parovodu-na-horkovod-tabor',
    title: 'Tábor západ – přestavba parovodu na horkovod',
    division: 'Stavba',
    year: 2023,
    price: '195 mil. Kč',
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
    slug: 'energeticke-uspory-smetanova-vsetin',
    title: 'ENERGETICKÉ ÚSPORY BUDOVY SMETANOVA 841, VSETÍN',
    division: 'Stavba',
    year: 2023, 
    price: '31 mil. Kč',
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
    slug: 'pd-lesna-projektova-dokumentace',
    title: 'Projekt Lesná',
    division: 'Stavba',
    year: 2024,
    price: '2,9 mil. Kč',
    image: '/fotky/references/Lesná/PD Lesná.jpg',
    images: [
        '/fotky/references/Lesná/PD Lesná.jpg'
    ],
    short: 'Kompletní projektová dokumentace a realizace pro lokalitu Lesná.',
    long: 'Kompletní projektová dokumentace a realizace pro lokalitu Lesná. Projekt zahrnuje architektonické i technické řešení.'
  },
  {
    id: 'stavba-bd-lesna',
    slug: 'bd-pegas-brno-lesna',
    title: 'Projektová dokumentace a výstavba BD Pegas',
    division: 'Stavba',
    year: 2026,
    price: '138 mil. Kč',
    location: 'Brno-Lesná',
    financial: '138 mil. Kč',
    image: '/fotky/references/4_ BD Lesná_stavba/WhatsApp Image 2026-03-25 at 09.33.43.jpeg',
    images: [
      '/fotky/references/4_ BD Lesná_stavba/WhatsApp Image 2026-03-25 at 09.10.53.jpeg',
      '/fotky/references/4_ BD Lesná_stavba/WhatsApp Image 2026-03-25 at 09.10.53 (1).jpeg',
      '/fotky/references/4_ BD Lesná_stavba/WhatsApp Image 2026-03-25 at 09.10.53 (2).jpeg',
      '/fotky/references/4_ BD Lesná_stavba/WhatsApp Image 2026-03-25 at 09.10.53 (5).jpeg',
      '/fotky/references/4_ BD Lesná_stavba/WhatsApp Image 2026-03-25 at 09.32.43.jpeg',
      '/fotky/references/4_ BD Lesná_stavba/WhatsApp Image 2026-03-25 at 09.33.05.jpeg',
      '/fotky/references/4_ BD Lesná_stavba/WhatsApp Image 2026-03-25 at 09.33.22.jpeg',
      '/fotky/references/4_ BD Lesná_stavba/WhatsApp Image 2026-03-25 at 09.33.43.jpeg',
      '/fotky/references/4_ BD Lesná_stavba/3d128595-54ce-43fd-a380-c4770b7efb34.jpeg',
      '/fotky/references/4_ BD Lesná_stavba/49e38e79-4e47-4abf-8d4d-5ae58390286f.jpeg',
      '/fotky/references/4_ BD Lesná_stavba/b4eb1586-89f2-41d7-a879-d00229cfae80.jpeg',
      '/fotky/references/4_ BD Lesná_stavba/e10fa2ad-f399-46bd-89f8-02db1d4f570c.jpeg'
    ],
    short: 'Zpracování projektové dokumentace a výstavba BD Pegas s 27 byty v atraktivní lokalitě Brno-Lesná.',
    long: 'Zpracování projektové dokumentace a následná výstavba BD v atraktivní lokalitě Brno-Lesná. Novostavba nabízí 27 moderních bytů o velikosti 1+kk až 4+kk. Architektonicky unikátní projekt tvoří dva gradující celky, které díky svažitému terénu poskytují obyvatelům prostorné terasy. Konstrukci domu zajišťuje odolný železobetonový skelet, zatímco interiér prosvětluje unikátní centrální světlík procházející celou stavbou. Budova klade velký důraz na udržitelnost, což dokazuje kvalitní zateplení fasády i systém pro efektivní hospodaření s dešťovou vodou. Součástí projektu je komfortní parkování pro rezidenty řešené kombinací vnitřních stání v podzemní garáži a venkovních stání přímo na pozemku objektu a vybudování nové příjezdové infrastruktury.'
  },
  {
    id: 'stavba-4',
    slug: 'rekonstrukce-administrativni-budovy-lidicka-brno',
    title: 'Rekonstrukce 2. NP administrativní budovy Lidická 25/27, Brno',
    division: 'Stavba',
    year: 2024,
    price: '6 mil. Kč',
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
    slug: 'rekonstrukce-pozarni-zbrojnice-stary-liskovec',
    title: 'Rekonstrukce požární zbrojnice Brno-Starý Lískovec',
    division: 'Stavba',
    year: 2022,
    price: '8,2 mil. Kč',
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
    slug: 'rekonstrukce-rozovdu-tepla-bystrice-nad-pernstejnem',
    title: 'Rekonstrukce stávajících rozvodů tepla a instalace nových potrubních rozvodů v Bystřici nad Pernštejnem',
    division: 'Stavba',
    year: 2024,
    price: '14,7 mil. Kč',
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
    slug: 'modernizace-cov-zdroje-tepla-kristanov',
    title: 'Křišťanov – modernizace ČOV a zdroje tepla',
    division: 'Stavba',
    year: 2020,
    price: '6,3 mil. Kč',
    image: '/fotky/references/kristanov/Křišťanov3.jpg',
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
    slug: 'oprava-vodovodu-vojensky-ujezd-brezina',
    title: 'Oprava vodovodního řadu ve Vojenském újezdu Březina',
    division: 'Stavba',
    year: 2022,
    price: '4,3 mil. Kč',
    image: '/fotky/references/brezina/Březina4.jpg',
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
    slug: 'rekonstrukce-hasicske-zbrojnice-husovice',
    title: 'Rekonstrukce hasičské zbrojnice Husovice – 3. etapa',
    division: 'Stavba',
    year: 2024,
    price: '0,4 mil. Kč',
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
    slug: 'oprava-kanalizace-botanicka-brno',
    title: 'Oprava ležaté kanalizace a přípojek Botanická',
    division: 'Stavba',
    year: 2024,
    price: '4 mil. Kč',
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
    slug: 'rekonstrukce-kotelny-cov',
    title: 'ČOV – rekonstrukce kotelny',
    division: 'TZB',
    year: 2022,
    price: '8,6 mil. Kč ',
    image: '/fotky/references/ČOV – rekonstrukce kotelny.jpg',
    short: 'Instalace tří plynových nízkoteplotních litinových kotlů s přetlakovým spalováním.',
    long: 'Instalace tří plynových nízkoteplotních litinových kotlů s přetlakovým spalováním. Dva nízkoteplotní litinové kotle o maximálním výkonu 1020 kW, typ: BUDERUS LOGANO GE615 921-1020 a jeden nízkoteplotní litinový kotel o maximálním výkonu 740 kW, typ: BUDERUS LOGANO GE615 661-740. Celkový instalovaný výkon 2780 kW.'
  },
  {
    id: 'tzb-2',
    slug: 'instalace-dps-vinohrady-bzenecka',
    title: 'Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká',
    division: 'TZB',
    year: 2024,
    price: '28,7 mil. Kč',
    image: '/fotky/references/Rekonstrukce systému zásobování teplem, Vinohrady - instalace DPS v objektech - VO10 Bzenecká.jpg',
    short: 'Náhrada teplovodních rozvodů a decentralizace topení a přípravy teplé vody.',
    long: 'Náhrada stávajících teplovodních rozvodů za horkovodní a současná decentralizace topení a přípravy teplé vody. Instalace jedenácti domovních předávacích stanic vč. měření a regulace.'
  },
  {
    id: 'tzb-3',
    slug: 'rekonstrukce-sczt-benesova-etapa1',
    title: 'Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa',
    division: 'TZB',
    year: 2025,
    price: '12 mil. Kč',
    image: '/fotky/references/Rekonstrukce SCZT pára x HV – oblast ul. Benešova – I. Etapa.jpg',
    short: 'Náhrada parovodního potrubí za nový horkovod na ulici Benešova.',
    long: 'Náhrada parovodního potrubí za nový horkovod převážně ve stávající trase na ulici Benešova. Délka trasy předizolovaného potrubí 2x DN 150/280 – 98 m.'
  },
  {
    id: 'tzb-4',
    slug: 'rekonstrukce-sczt-kopecna-fnusa2',
    title: 'Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská,  FNUSA II',
    division: 'TZB',
    year: 2025,
    price: '119 mil. Kč ',
    image: '/fotky/references/Rekonstrukce SCZT pára x HV – oblast ul. Kopečná, Anenská,  FNUSA II.jpg',
    short: 'Náhrada parovodního potrubí za nový horkovod na ulicích Kopečná, Anenská, Vodní a Hybešova v Brně.',
    long: 'Náhrada parovodního potrubí za nový horkovod na ulicích Kopečná, Anenská, Vodní a Hybešova v Brně. Délka trasy potrubí 2x DN 250/450 – cca 680 m, potrubí 2x DN 200/355 – cca 86, potrubí 2x DN 150/280 – cca 53 m aj. Celková délka horkovodu ve stávající a nové trase cca 1202,9 m.'
  },
  {
    id: 'tzb-5',
    slug: 'rekonstrukce-horkovodu-dn300-belohorska',
    title: 'Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16',
    division: 'TZB',
    year: 2025,
    price: '48 mil. Kč',
    image: '/fotky/references/Rekonstrukce horkovodu DN 300 Bělohorská v úseku PŠ – B 16.jpg',
    short: 'Náhrada parovodního potrubí za nový horkovod na ulicích Špitálka, Plynárenská a Tkalcovská.',
    long: 'Náhrada parovodního potrubí za nový horkovod převážně ve stávající trase na ulicích Špitálka, Plynárenská a Tkalcovská. Délka trasy potrubí 2x DN 300/500 – 449 m a 2x DN 250/400 – 52 m.'
  },
  {
    id: 'tzb-6',
    slug: 'modernizace-zdroju-tepla-lipnik-etapa2',
    title: 'Lipník – modernizace zdrojů tepla II. Etapa',
    division: 'TZB',
    year: 2025,
    price: '51,1 mil. Kč ',
    image: '/fotky/references/Lipník – modernizace zdrojů tepla II. Etapa.jpg',
    short: 'Stavební práce spočívající v modernizaci plynových kotelen ve vojenském areálu.',
    long: 'Předmětem díla byly stavební práce spočívající v modernizaci plynových kotelen v objektech nacházejících se ve vojenském areálu Lipník nad Bečvou.'
  },
  {
    id: 'tzb-7',
    slug: 'rodinny-dum-sklad-inzenyrske-site',
    title: 'Rodinný dům, sklad + připojení na inženýrské sítě',
    division: 'TZB',
    year: 2024,
    price: '0,7 mil. Kč ',
    image: '/fotky/references/Rodinný dům, sklad + připojení na inženýrské sítě.jpg',
    short: 'Realizace podlahového topení, rozvody vody a kanalizace a dodávka zdravotně zařizovacích předmětů.',
    long: 'Realizace podlahového topení, rozvody vody a kanalizace a dodávka zdravotně zařizovacích předmětů.'
  },
  {
    id: 'tzb-8',
    slug: 'instalace-dps-vinohrady-velkopavlovicka',
    title: 'Rekonstrukce systému zásobování teplem, Vinohrady – instalace DPS v objektech – VO02 Velkopavlovická',
    division: 'TZB',
    year: 2025,
    price: '29,2 mil. Kč',
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
