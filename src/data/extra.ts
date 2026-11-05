// Derived lists: photos (all from the old site's Projects gallery), trades and navigation.
// Alt text describes what is in each photo; it is not copy from the old site.

export type Photo = {
  id: string;
  alt: string;
  w: number;
  h: number;
  arm: 'landscaping' | 'building';
  tags: string[];
};

export const photos: Photo[] = [
  { id: 'driveway-stone-pillars', alt: 'Block-paved driveway between stone pillars in front of a white house', w: 1321, h: 929, arm: 'landscaping', tags: ['driveways'] },
  { id: 'driveway-semi-after', alt: 'New dark block-paved driveway in front of a semi-detached house', w: 1284, h: 816, arm: 'landscaping', tags: ['driveways'] },
  { id: 'driveway-semi-before', alt: 'The same front garden dug out with bags of sand and materials ready', w: 1284, h: 950, arm: 'landscaping', tags: ['driveways'] },
  { id: 'driveway-herringbone', alt: 'Charcoal herringbone block paving beside a stone wall', w: 1200, h: 1600, arm: 'landscaping', tags: ['driveways'] },
  { id: 'driveway-block-path', alt: 'Long block-paved path running down the side of a house', w: 1200, h: 1600, arm: 'landscaping', tags: ['driveways'] },
  { id: 'patio-porcelain-lawn', alt: 'Large pale porcelain patio next to a lawn', w: 1600, h: 1200, arm: 'landscaping', tags: ['patios'] },
  { id: 'patio-balcony-porcelain', alt: 'Porcelain-tiled balcony terrace with glass doors and railings', w: 1600, h: 1200, arm: 'landscaping', tags: ['patios'] },
  { id: 'patio-sandstone', alt: 'Sandstone patio laid beside a lawn with a trampoline', w: 1284, h: 896, arm: 'landscaping', tags: ['patios'] },
  { id: 'patio-courtyard-steps', alt: 'Paved courtyard with block walls and steps up to the garden', w: 1600, h: 1200, arm: 'landscaping', tags: ['patios', 'garden-steps'] },
  { id: 'garden-steps', alt: 'New stone steps climbing a terraced garden', w: 1200, h: 1600, arm: 'landscaping', tags: ['garden-steps'] },
  { id: 'fencing-closeboard', alt: 'New timber close-board fencing around a paved yard', w: 2000, h: 1500, arm: 'landscaping', tags: ['fencing', 'patios'] },
  { id: 'decking-garden', alt: 'New timber decking at the end of a lawned garden with fence panels', w: 1600, h: 1200, arm: 'landscaping', tags: ['decking', 'fencing'] },
  { id: 'rendering-wall', alt: 'Freshly rendered garden wall with a white coping', w: 2000, h: 1500, arm: 'building', tags: ['rendering'] },
  { id: 'front-dash-door', alt: 'Terraced house front with new dash finish and a new front door', w: 1080, h: 1080, arm: 'building', tags: ['dashing', 'windows-doors'] },
  { id: 'plastering-after', alt: 'Living room wall freshly plastered', w: 1284, h: 1039, arm: 'building', tags: ['plastering'] },
  { id: 'plastering-before', alt: 'The same living room wall before plastering', w: 1284, h: 817, arm: 'building', tags: ['plastering'] },
  { id: 'stairwell-after', alt: 'Stairwell wall freshly plastered', w: 1284, h: 1673, arm: 'building', tags: ['plastering'] },
  { id: 'stairwell-before', alt: 'Stairwell with bare brick wall before plastering', w: 1284, h: 1597, arm: 'building', tags: ['plastering'] },
];

export const photo = (id: string) => photos.find((p) => p.id === id)!;
export const src = (id: string, w: 800 | 1600 = 1600) => `/img/work/${id}-${w}.webp`;
// Descriptors use each file's real width (masters under 1600px are not upscaled).
export const srcset = (id: string) => {
  const p = photos.find((x) => x.id === id);
  const big = p ? Math.min(1600, p.w) : 1600;
  return `/img/work/${id}-800.webp 800w, /img/work/${id}-1600.webp ${big}w`;
};

// Before / after pairs found in the old gallery (same job, before and after).
export const pairs = [
  { slug: 'driveway', label: 'Driveway', before: 'driveway-semi-before', after: 'driveway-semi-after' },
  { slug: 'plastering', label: 'Plastering', before: 'plastering-before', after: 'plastering-after' },
  { slug: 'stairwell', label: 'Stairwell', before: 'stairwell-before', after: 'stairwell-after' },
];

// Building trades: names from the old site's service list.
export const buildingTrades = [
  { slug: 'plastering', name: 'Plastering', photo: 'plastering-after' },
  { slug: 'rendering', name: 'Rendering', photo: 'rendering-wall' },
  { slug: 'dashing', name: 'Dashing', photo: 'front-dash-door' },
  { slug: 'windows-doors', name: 'Windows/Doors', photo: null },
  { slug: 'roofing', name: 'Roofing', photo: null },
  { slug: 'concreting', name: 'Concreting', photo: null },
  { slug: 'plumbing', name: 'Plumbing', photo: null },
  { slug: 'disabled-access', name: 'Disabled access', photo: null },
  { slug: 'maintenance', name: 'Maintenance', photo: null },
] as const;

export const nav = [
  { href: '/building', label: 'Building' },
  { href: '/landscaping', label: 'Landscaping' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
