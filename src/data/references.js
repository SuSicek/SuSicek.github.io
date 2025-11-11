
export const referencesProjects = [
  {
    id: 'project-1',
    images: ['/web4/fotky/stavba.png', '/web4/fotky/stavba2.png'],
    image: '/web4/fotky/stavba.png',
    imageAlt: 'Stavební práce',
    title: 'Rezidenční komplex Brno',
    category: 'Stavba',
    description: 'Moderní bytový komplex s 120 bytovými jednotkami včetně kompletní infrastruktury a zelených ploch. Projekt realizován s důrazem na energetickou účinnost a udržitelnost.',
    location: 'Brno, Jihomoravský kraj',
    year: '2023'
  },
  {
    id: 'project-2',
    images: ['/web4/fotky/energetika.png', '/web4/fotky/energetika2.png'],
    image: '/web4/fotky/energetika.png',
    imageAlt: 'Energetické řešení',
    title: 'Solární elektrárna Ostrava',
    category: 'Energetika',
    description: 'Instalace fotovoltaické elektrárny o výkonu 2,5 MW včetně připojení k distribuční síti. Projekt přispívá k udržitelné energetice regionu.',
    location: 'Ostrava, Moravskoslezský kraj',
    year: '2023'
  },
  {
    id: 'project-3',
    images: ['/web4/fotky/tzb.png', '/web4/fotky/prodejna.png'],
    image: '/web4/fotky/tzb.png',
    imageAlt: 'TZB instalace',
    title: 'Obchodní centrum Praha',
    category: 'TZB',
    description: 'Kompletní realizace technických zařízení budov pro velké obchodní centrum včetně klimatizace, vytápění a elektrických rozvodů.',
    location: 'Praha, Hlavní město Praha',
    year: '2022'
  }
];

export function filterReferencesByDivision(divisionKey) {
  const map = { energetika: 'Energetika', stavba: 'Stavba', tzb: 'TZB' };
  const category = map[divisionKey] || null;
  if (!category) return referencesProjects.slice(0, 3);
  return referencesProjects.filter(p => p.category === category).slice(0, 3);
}
