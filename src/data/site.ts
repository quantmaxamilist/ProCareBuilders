// Content for Pro Care Builders Ltd.
//
// VERBATIM: every string marked "old site" is copied word for word from
// https://www.procarebuilders.co.uk (pages / and /projects, fetched 2026-11-05).
// Reviews keep their original spelling and punctuation.
//
// NOT on the old site:
//  - company legal line: Companies House record for PRO CARE BUILDERS LTD (15388624)
//  - the landscaping section (src/data/landscaping.ts): DRAFT copy for the client to approve
//  - neutral UI microcopy in components ("Get a free quote", "View project", "Photo 3 of 18")

export const site = {
  name: 'Pro Care Builders',
  legalName: 'Pro Care Builders Ltd',
  url: 'https://www.procarebuilders.co.uk',
  // Companies House (find-and-update.company-information.service.gov.uk), checked 2026-11-05
  companyNumber: '15388624',
  registeredOffice: '2 Major Street, Manselton, Swansea, Wales, SA5 9NN',
  location: 'Swansea, United kingdom', // old site
  email: 'Procarebuilders@yahoo.com', // old site
  phones: [
    { label: 'Mobile', display: '07917 357527', tel: '+447917357527' }, // old site
    { label: 'Office', display: '01792 429194', tel: '+441792429194' }, // old site
  ],
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61556084723926', // old site
    instagram: 'https://www.instagram.com/procarebuilders/', // old site
  },
};

// Page titles and descriptions: old site, exact.
export const seo = {
  home: {
    title: 'Pro Care Builders | builder | Swansea, UK',
    description:
      'Pro care builders take pride in our work! covering all trades with professional tradesmen, with 30+ years experience.',
  },
  projects: {
    title: 'PROJECTS | Pro Care Builders',
    description: 'A look at all our previous projects completed by us!',
  },
};

// Home page copy: old site.
export const home = {
  h1: 'High-Quality Building and Renovation Services',
  h1Full: 'Pro Care Builders - High-Quality Building and Renovation Services',
  sub: 'Professionalism and Customer Care for Residential and Commercial Clients',
  servicesTitle: 'Our Services',
  servicesIntro:
    'Pro Care Builders provides a range of construction solutions for both residential and commercial clients. Our services include:',
  values: [
    'Experience and Expertise',
    'Professional and Skilled Team',
    'High-Quality Workmanship',
    'Sustainability and Accountability',
  ],
  aboutTitle: 'About Pro Care Builders',
  aboutSub: 'High-Quality Building and Renovation Services for Residential and Commercial Clients',
  about:
    'Pro Care Builders is a construction business dedicated to providing high-quality building and renovation services. With a focus on professionalism and customer care, we offer a variety of construction solutions to meet the needs of both residential and commercial clients. Our team of skilled and experienced professionals with 30+ years experience is committed to delivering the highest quality workmanship and ensuring sustainability and accountability in everything we do.',
  projectsTitle: 'Our Projects',
  projectsCta: 'VIEW ALL PROJECTS',
  slogan: 'No job too big or too small',
  quoteTitle: 'Contact us for a free Quotation!',
  callCta: 'CALL US NOW',
};

// The old site's service list, in its order.
export const oldServiceList = [
  'Driveways', 'Patios', 'Plastering', 'Fencing', 'Drainage', 'Dashing', 'Maintenance',
  'Concreting', 'Plumbing', 'Windows/Doors', 'Rendering', 'Roofing', 'Disabled access', 'and more',
];

// Reviews: old site, verbatim.
export const reviews = [
  {
    name: 'Eilish Meredith',
    text: 'lee and his team have done an excellent job. They have transformed our garden. Very efficient and tidy workers. Would highly recommend and definitely use again in the future',
    tags: ['landscaping'],
  },
  {
    name: 'Ryan Michael',
    text: 'Lee & the team came to sort my decking that had been previously done to a very poor standard. They took it apart and rebuilt it to a good standard. Really happy how they carried out their work. Will be using for anything else and highly recommend!!!',
    tags: ['decking', 'landscaping'],
  },
  {
    name: 'Melanie Walters',
    text: 'Great team. Efficient, polite and a really excellent job all round. I totally recommend the. Im a very happy customer',
    tags: ['building'],
  },
];
