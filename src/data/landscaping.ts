// LANDSCAPING — DRAFT COPY FOR THE CLIENT TO APPROVE.
// The old site has no landscaping pages. The owner asked for them for the new company.
// Service names come from the old service list (Driveways, Patios, Fencing, Drainage), the
// decking review and the garden photos. The wording below is plain description of the photos
// and the free-quotation offer only: no guarantees, materials specs, prices or areas are claimed.

export type LandService = {
  slug: string;
  name: string;
  lede: string;
  body: string[];
  photos: string[];
  review?: string; // reviewer name from site.ts
};

export const landscapingIntro =
  'Landscaping from Pro Care Builders: driveways, patios, fencing, decking, garden steps and drainage for homes and businesses in Swansea.';

export const landServices: LandService[] = [
  {
    slug: 'driveways',
    name: 'Driveways',
    lede: 'New driveways and block paving, dug out, prepared and laid by our team.',
    body: [
      'From a path down the side of the house to a full front driveway, we take up the old surface, prepare the ground and lay the new one.',
      'Our projects include charcoal herringbone paving, brindle block paths and a front garden turned into a driveway.',
    ],
    photos: ['driveway-stone-pillars', 'driveway-semi-after', 'driveway-semi-before', 'driveway-herringbone', 'driveway-block-path'],
  },
  {
    slug: 'patios',
    name: 'Patios',
    lede: 'Porcelain and sandstone patios, terraces and courtyards.',
    body: [
      'A patio is often the first thing that makes a garden usable. We lay them beside the lawn, on raised terraces and in courtyards.',
      'Our projects include large pale porcelain patios, a sandstone patio beside the lawn and a balcony terrace.',
    ],
    photos: ['patio-porcelain-lawn', 'patio-sandstone', 'patio-balcony-porcelain', 'patio-courtyard-steps', 'fencing-closeboard'],
    review: 'Eilish Meredith',
  },
  {
    slug: 'fencing',
    name: 'Fencing',
    lede: 'New timber fencing for gardens, yards and boundaries.',
    body: [
      'We put up new fencing to close in a garden or yard and replace tired panels along a boundary.',
      'Our projects include close-board timber fencing around a paved yard and new panels round a lawned garden.',
    ],
    photos: ['fencing-closeboard', 'decking-garden'],
  },
  {
    slug: 'decking',
    name: 'Decking',
    lede: 'Timber decking built new, or taken apart and rebuilt properly.',
    body: [
      'We build new decks at the end of the garden and put right decking that was not done well the first time.',
    ],
    photos: ['decking-garden'],
    review: 'Ryan Michael',
  },
  {
    slug: 'garden-steps',
    name: 'Garden steps',
    lede: 'Steps and walls that make a sloping garden easy to use.',
    body: [
      'Terraced gardens need steps that are safe underfoot and walls that hold the ground.',
      'Our projects include new stone steps up a terraced garden and a paved courtyard with steps up to the lawn.',
    ],
    photos: ['garden-steps', 'patio-courtyard-steps'],
    review: 'Eilish Meredith',
  },
  {
    slug: 'drainage',
    name: 'Drainage',
    lede: 'Drainage work on its own, or as part of a driveway, patio or garden job.',
    body: [
      'Water has to go somewhere. We sort drainage for homes and businesses, including as part of new driveways and patios.',
    ],
    photos: ['driveway-block-path', 'patio-porcelain-lawn'],
  },
];
