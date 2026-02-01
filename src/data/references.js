
import { assetPath } from '../utils/assetPath'

export const referencesProjects = [
  {
    id: 'project-1',
    images: [assetPath('fotky/stavba.png'), assetPath('fotky/stavba2.png')],
    image: assetPath('fotky/stavba.png'),
    imageAlt: 'Stavební práce',
    title: 'Rezidenční komplex Brno',
    category: 'Stavba',
    description: 'Moderní bytový komplex s 120 bytovými jednotkami včetně kompletní infrastruktury a zelených ploch. Projekt realizován s důrazem na energetickou účinnost a udržitelnost.',
    location: 'Brno, Jihomoravský kraj',
    year: '2023'
  },
  {
    id: 'project-2',
    images: [assetPath('fotky/energetika.png'), assetPath('fotky/energetika2.png')],
    image: assetPath('fotky/energetika.png'),
    imageAlt: 'Energetické řešení',
    title: 'Solární elektrárna Ostrava',
    category: 'Energetika',
    description: 'Instalace fotovoltaické elektrárny o výkonu 2,5 MW včetně připojení k distribuční síti. Projekt přispívá k udržitelné energetice regionu.',
    location: 'Ostrava, Moravskoslezský kraj',
    year: '2023'
  }
];

export function filterReferencesByDivision(divisionKey) {
  const map = { energetika: 'Energetika', stavba: 'Stavba', tzb: 'TZB' };
  const category = map[divisionKey] || null;
  if (!category) return referencesProjects.slice(0, 3);
  return referencesProjects.filter(p => p.category === category).slice(0, 3);
}
