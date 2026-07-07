export type AudienceTier = 'residential' | 'commercial' | 'trade';

export const tiers: {
  key: AudienceTier;
  label: string;
  tagline: string;
  desc: string;
}[] = [
  {
    key: 'residential',
    label: 'For Homeowners',
    tagline: 'Signature finishes for the homes you live in.',
    desc: 'Villas, apartments, and independent homes — premium textures, decorative finishes, and elite interior painting delivered by trained craftsmen.',
  },
  {
    key: 'commercial',
    label: 'For Commercial & Hospitality',
    tagline: 'Statement spaces built to be experienced.',
    desc: 'Offices, retail, hotels, and restaurants — feature walls, waterproofing, and full-scale execution on tight commercial timelines.',
  },
  {
    key: 'trade',
    label: 'For Architects & Interior Designers',
    tagline: 'A trade partner your specifications can trust.',
    desc: 'Priority scheduling, trade terms, and a complimentary Studio Wall — Nakkashi is built to be your execution partner on high-spec projects.',
  },
];

export const services = [
  {
    cat: 'texture',
    title: 'Signature Texture Collection',
    tag: 'Texture',
    tiers: ['residential', 'commercial', 'trade'] as AudienceTier[],
    desc: 'Artistic textures that bring depth, character, and sophistication — stucco, lime-wash, metallic, and exclusive Nakkashi-original patterns.',
    shortDesc: 'Artistic textures designed to bring depth, character, and sophistication to every surface.',
    bullets: [
      'Royale-play & art-effect textures',
      'Stucco, travertino & limewash',
      'Custom motif & stencil patterns',
      'Metallic & pearl finishes',
    ],
    icon: '<path d="M4 20l5-5"/><path d="M14 4l6 6-9 9H5v-6z"/><path d="M11 7l6 6"/>',
    href: '/services',
    label: 'Explore textures',
  },
  {
    cat: 'interior',
    title: 'Elite Interior Finishes',
    tag: 'Interior',
    tiers: ['residential', 'commercial'] as AudienceTier[],
    desc: 'Premium smooth emulsion finishes for living spaces, bedrooms, and ceilings — low-odour, washable, and built to last.',
    shortDesc: 'Premium painting crafted to deliver flawless aesthetics and enduring beauty for every room.',
    bullets: [
      'Premium emulsion & enamel systems',
      'Low-VOC, washable finishes',
      'Designer colour matching',
      'Furniture & ceiling refinishing',
    ],
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>',
    href: '/services',
    label: 'View interior work',
  },
  {
    cat: 'artistry',
    title: 'Luxury Surface Artistry',
    tag: 'Decorative',
    tiers: ['residential', 'trade'] as AudienceTier[],
    desc: 'Italian-inspired Raj Hans, bespoke metallic effects, and polished concrete — surfaces that feel as good as they look.',
    shortDesc: 'Exclusive finishes inspired by contemporary architecture and high-end luxury interiors.',
    bullets: [
      'Raj Hans & marmorino',
      'Metallic glazes & gold leaf',
      'Polished concrete effects',
      'Hand-applied colour layering',
    ],
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 010 18"/><path d="M3 12h18"/>',
    href: '/services',
    label: 'See finishes',
  },
  {
    cat: 'statement',
    title: 'Statement Wall Creations',
    tag: 'Feature',
    tiers: ['residential', 'commercial', 'trade'] as AudienceTier[],
    desc: 'Bespoke feature walls designed to anchor a room — custom murals, 3D textured panels, and architectural accent walls.',
    shortDesc: 'Bespoke feature walls designed to become the focal point of exceptional, memorable spaces.',
    bullets: [
      'Architectural feature walls',
      'Custom-designed murals',
      '3D textured panels',
      'Headboard & accent walls',
    ],
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
    href: '/services',
    label: 'View statement walls',
  },
  {
    cat: 'waterproof',
    title: 'ShieldPro Waterproofing',
    tag: 'Protection',
    tiers: ['residential', 'commercial'] as AudienceTier[],
    desc: 'Terrace, bathroom, and crack-sealing solutions that stop seepage at the source and protect your structure for years.',
    shortDesc: 'Advanced protection systems engineered to safeguard structures from moisture, seepage, and more.',
    bullets: [
      'Terrace & roof waterproofing',
      'Bathroom & wet-area sealing',
      'Crack-bridging coatings',
      'Exterior weather-shield systems',
    ],
    icon: '<path d="M12 2s7 6 7 11a7 7 0 01-14 0c0-5 7-11 7-11z"/>',
    href: '/services',
    label: 'Learn protection',
  },
  {
    cat: 'consultancy',
    title: 'Bespoke Design & Consultancy',
    tag: 'Bespoke',
    tiers: ['residential', 'commercial', 'trade'] as AudienceTier[],
    desc: 'From free on-site colour consultation to architect-led R&D — we collaborate on your vision and engineer the finish that brings it to life.',
    shortDesc: 'Expert guidance in selecting textures, finishes, and colour palettes that align with your vision.',
    bullets: [
      'Free on-site colour consultation',
      'Digital palette & mock-up previews',
      'Architect-led collaborations',
      'Bespoke colour & texture formulations',
    ],
    icon: '<circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="11.5" r="2.5"/><circle cx="17" cy="14" r="2.5"/><path d="M12 22a3 3 0 003-3c0-1.5-3-4-3-4"/>',
    href: '/services',
    label: 'Book consultation',
  },
];
