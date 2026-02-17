// Division content used by the Vue app (mirrors web4/data/content.json -> divisions)
// Image paths point to the static assets located under public/fotky.

import { assetPath } from '../utils/assetPath'

export const divisionAliases = {
  prumysl: 'tzb',
  průmyl: 'tzb', // safety for typos
  prumyslovo: 'tzb',
  stavebnictvi: 'stavba',
  stavebnictví: 'stavba'
};

export const divisions = {
  energetika: {
    key: 'energetika',
    title: 'Energetika',
    subtitle: 'Komplexní řešení v oblasti energetiky',
    heroImage: assetPath('fotky/energetika2.png'),
    description:
      'Divize Energetika spojuje dlouholeté zkušenosti s moderními technologiemi. Zajišťujeme kompletní servis – od projektové přípravy přes montáž až po spolehlivý provoz. Našim zákazníkům nabízíme jistotu kvalitního provedení a dodržení všech závazků. Síla našeho týmu je v lidech. Podporujeme odborný růst, předáváme know-how velké energetiky a dáváme prostor nové generaci techniků a inženýrů. Jsme držiteli certifikací ČSN EN 1090-2:2019 a ČSN EN ISO 3834-2:2006 a disponujeme oprávněními TIČR pro práce na tlakových i elektrických zařízeních. To nám umožňuje realizovat i nejnáročnější zakázky s maximální precizností a bezpečností.',
    services: [
      {
        title: 'Projekce a energetické celky',
        description: 'Projekční práce v oblasti energetiky\nDodávky energetických celků',
        icon: 'document-text-outline',
        buttonText: 'Více informací',
        buttonLink: '#'
      },
      {
        title: 'Realizace',
        description: 'Komplexní montážní služby\nVýroba\nOpravy energetických zařízení',
        icon: 'construct-outline',
        buttonText: 'Více informací',
        buttonLink: '#'
      },
      {
        title: 'Elektro a MaR',
        description: 'Kompletní dodávky SIL a SLB\nSlužby MaR',
        icon: 'flash-outline',
        buttonText: 'Více informací',
        buttonLink: '#'
      },
      {
        title: 'Servis a údržba',
        description: 'Servis a údržba energetických zařízení',
        icon: 'build-outline',
        buttonText: 'Více informací',
        buttonLink: '#'
      }
    ],
    projects: [
      {
        title: 'Solární elektrárna Brno',
        description: 'Instalace 500kW fotovoltaické elektrárny na střeše průmyslového objektu',
        image: assetPath('fotky/energetika2.png'),
        year: '2024'
      },
      {
        title: 'Tepelné čerpadlo Ostrava',
        description: 'Komplexní řešení vytápění pro administrativní budovu',
        image: assetPath('fotky/energetika3.png'),
        year: '2023'
      }
    ],
    projectsCta: { text: 'Zobrazit všechny projekty', link: '/references?division=energetika' },
    cta: { title: 'Potřebujete energetické řešení?', text: 'Kontaktujte nás pro bezplatnou konzultaci a cenovou nabídku.', buttonText: 'Získat nabídku', buttonLink: '/contact-us' }
  },
  stavba: {
    key: 'stavba',
    title: 'Stavba',
    subtitle: 'Kvalitní stavební práce od základů po dokončení',
    heroImage: assetPath('fotky/references/vsetin/Vsetín 1.jpg'),
    description:
      'Stavební divize vznikla ve firmě UCHYTIL s.r.o. již na samém začátku a byla zaměřena na podporu realizačních středisek TZB. Během několika let se stavební středisko rozrostlo a začalo provádět stavby většího charakteru a tím vytvářet uplatnění pro střediska TZB a ENERGETIKA. Dnes má svoje nezastupitelné místo ve firmě. Hlavní předností divize stavební je zajištění kompletní dodávky staveb většího i menšího charakteru. Stavební divize disponuje potřebným vybavením a profesně zdatným týmem, který zaručuje vysokou kvalitu prováděných prací a garanci za provedené dílo. Velký důraz je kladen na maximální spokojenost zákazníka.',
    services: [
      {
        title: 'Pozemní stavby',
        description: 'Výstavba a rekonstrukce bytových a rodinných domů, budov občanské vybavenosti, administrativních budov, průmyslových hal, kotelen a výměníkových stanic.',
        icon: 'business-outline',
        buttonText: 'Více informací',
        buttonLink: '#contact'
      },
      {
        title: 'Inženýrské sítě',
        description: 'Výstavba a rekonstrukce vodohospodářských staveb a inženýrských sítí. Zasíťování pozemků – voda, kanalizace, plyn, silnoproud, slaboproud, komunikace.',
        icon: 'water-outline',
        buttonText: 'Více informací',
        buttonLink: '#contact'
      },
      {
        title: 'Tepelné rozvody',
        description: 'Výstavba a rekonstrukce tepelných sítí.',
        icon: 'flame-outline',
        buttonText: 'Více informací',
        buttonLink: '#contact'
      },
      {
        title: 'Projekce',
        description: 'Projektování stavebních řešení, architektonické studie a kompletní projektová dokumentace.',
        icon: 'document-text-outline',
        buttonText: 'Více informací',
        buttonLink: '#contact'
      }
    ],
    projects: [
      {
        title: 'Bytový dům Praha',
        description: 'Výstavba moderního bytového domu s 24 bytovými jednotkami',
        image: assetPath('fotky/stavba2.png'),
        year: '2024'
      },
      {
        title: 'Skladový komplex Pardubice',
        description: 'Výstavba logistického centra o rozloze 5000 m²',
        image: assetPath('fotky/stavba3.png'),
        year: '2023'
      }
    ],
    projectsCta: { text: 'Zobrazit všechny projekty', link: '/references?division=stavba' },
    cta: { title: 'Plánujete stavební projekt?', text: 'Rádi vám pomůžeme s realizací vašeho stavebního záměru.', buttonText: 'Nezávazná poptávka', buttonLink: '/contact-us' }
  },
  tzb: {
    key: 'tzb',
    title: 'TZB',
    subtitle: 'Technická zařízení budov na profesionální úrovni',
    heroImage: assetPath('fotky/references/ČOV – rekonstrukce kotelny.jpg'),
    description:
      'Realizace zakázek, projekce a servis v oborech Technických zařízení budov je pro firmu stěžejním programem činnosti od založení v roce 1994 do současnosti. Dlouhodobě stabilní kolektiv pracovníků poskytuje vysokou kvalitu dodávek a montáží zařízení a technologických celků.',
    services: [
      {
        title: 'Projekce',
        description: 'Zabýváme se tvorbou projektové dokumentace v oboru TZB',
        icon: 'document-text-outline',
        buttonText: 'Více informací',
        buttonLink: '#contact'
      },
      {
        title: 'Realizace',
        description: 'Naše činnost spočívá v komplexním zajištění středních a velkých zakázek v oboru TZB',
        icon: 'construct-outline',
        buttonText: 'Více informací',
        buttonLink: '#contact'
      },
      {
        title: 'Servis',
        description: 'Pevné místo má ve struktuře divize TZB servisní středisko. Servisní technici ve spolupráci se středisky realizace namontované zařízení uvádí do provozu, provádí montáže regulací, zaškolují obsluhu a v kontaktu se zákazníky zůstávají k provedení servisní činnosti.',
        icon: 'build-outline',
        buttonText: 'Více informací',
        buttonLink: '#contact'
      }
    ],
    projects: [],
    projectsCta: { text: 'Zobrazit všechny projekty', link: '/references?division=tzb' },
    cta: { title: 'Potřebujete TZB řešení?', text: 'Naši odborníci vám navrhnou optimální technické řešení.', buttonText: 'Konzultace zdarma', buttonLink: '/contact-us' }
  }
};

export const divisionOrder = ['energetika', 'tzb', 'stavba'];

export function normalizeDivisionSlug(slug) {
  if (!slug) return 'energetika';
  const lower = String(slug).toLowerCase();
  if (divisions[lower]) return lower;
  if (divisionAliases[lower]) return divisionAliases[lower];
  return 'energetika';
}

// Map Ionicons to MDI for Vuetify v-icon
export function iconToMdi(name) {
  const map = {
    'document-text-outline': 'mdi-file-document-outline',
    'construct-outline': 'mdi-tools',
    'flash-outline': 'mdi-flash-outline',
    'build-outline': 'mdi-wrench-outline',
    'hammer-outline': 'mdi-hammer-wrench',
    'business-outline': 'mdi-office-building-outline',
    'water-outline': 'mdi-water-outline',
    'flame-outline': 'mdi-fire',
  };
  return map[name] || 'mdi-cog-outline';
}
