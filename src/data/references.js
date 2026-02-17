
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
  },
  {
    id: 'project-3',
    images: [
      assetPath('fotky/references/hasička Husovice/hasička1.png'),
      assetPath('fotky/references/hasička Husovice/hasička2.png'),
      assetPath('fotky/references/hasička Husovice/hasička3.png')
    ],
    image: assetPath('fotky/references/hasička Husovice/hasička1.png'),
    imageAlt: 'Hasičská zbrojnice Husovice',
    title: 'Rekonstrukce hasičské zbrojnice Husovice – 3. etapa',
    category: 'Stavba',
    description: 'Přístavba v areálu hasičské zbrojnice v Brně-Husovicích. Projekt zahrnuje kompletní stavební část, statiku a všechny profesní části včetně elektro, TZB, VZT, FVE a dalších souvisejících systémů.',
    location: 'Brno-Husovice',
    year: '2024'
  },
  {
    id: 'project-4',
    images: [assetPath('fotky/references/Lesná/PD Lesná.jpg')],
    image: assetPath('fotky/references/Lesná/PD Lesná.jpg'),
    imageAlt: 'PD Lesná',
    title: 'Projekt Lesná',
    category: 'Stavba',
    description: 'Kompletní projektová dokumentace a realizace pro lokalitu Lesná. Projekt zahrnuje architektonické i technické řešení.',
    location: 'Brno-Lesná',
    year: '2024'
  }
];

export function filterReferencesByDivision(divisionKey) {
  const map = { energetika: 'Energetika', stavba: 'Stavba', tzb: 'TZB' };
  const category = map[divisionKey] || null;
  if (!category) return referencesProjects.slice(0, 3);
  return referencesProjects.filter(p => p.category === category).slice(0, 3);
}
