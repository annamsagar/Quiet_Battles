/**
 * QUIET BATTLES™ – Initial Product Catalog
 */

export const initialProductData = [
  {
    id: 'prod-gentle-armor',
    name: 'THE GENTLE ARMOR OVERSIZED TEE',
    shortName: 'THE GENTLE ARMOR TEE',
    slug: 'gentle-armor',
    category: 'Oversized T-shirt',
    collection: 'SERIES 01 – THE GENTLE ARMOR™',
    seriesSlug: 'series-01',
    price: 1499,
    originalPrice: 1999,
    currency: 'INR',
    description: 'An expression of quiet strength. The Gentle Armor Oversized Tee represents the balance between vulnerability and resilience.',
    editorialNote: 'Designed with sculptural drape and heavyweight organic cotton, this silhouette envelops you in understated protection. A quiet statement for those who lead with silent resolve.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockQuantity: 48,
    status: 'published',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop'
    ],
    fabricDetails: [
      '280 GSM Heavyweight French Terry Loopback Cotton',
      '100% Combed Compact Ring-Spun Organic Yarn',
      'Bio-softened silicone wash for velvety matte touch',
      'Drop-shoulder boxy silhouette with reinforced rib collar'
    ],
    careInstructions: [
      'Machine wash cold (30°C) with similar dark tones',
      'Turn garment inside out before washing and ironing',
      'Do not bleach or tumble dry; dry flat in natural shade',
      'Iron on low heat; avoid direct contact with branding prints'
    ],
    specs: {
      fit: 'Relaxed / Drop Shoulder Oversized',
      weight: '280 GSM Heavyweight',
      origin: 'Consciously handcrafted in India',
      composition: '100% Sustainable Cotton'
    },
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z'
  },
  {
    id: 'prod-silence-hoodie',
    name: 'THE SILENT VIGIL HEAVY HOODIE',
    shortName: 'SILENT VIGIL HOODIE',
    slug: 'silent-vigil-hoodie',
    category: 'Heavyweight Hoodie',
    collection: 'SERIES 01 – THE GENTLE ARMOR™',
    seriesSlug: 'series-01',
    price: 3499,
    originalPrice: 4299,
    currency: 'INR',
    description: 'A sanctuary in fabric. 450 GSM double-fleece structured hoodie built to shield you from external turbulence.',
    editorialNote: 'Featuring seamless hood construction with no drawstrings, preserving the immaculate minimalism of the garment.',
    sizes: ['S', 'M', 'L', 'XL'],
    stockQuantity: 24,
    status: 'published',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop'
    ],
    fabricDetails: [
      '450 GSM Custom Heavyweight Brushed Fleece',
      '100% GOTS-Certified Organic Cotton',
      'Seamless crossover structured hood',
      'Kangaroo pocket with concealed interior card pocket'
    ],
    careInstructions: [
      'Cold gentle cycle inside-out',
      'Flat dry only to preserve shape',
      'Do not iron directly on fleece'
    ],
    specs: {
      fit: 'Structural Boxy Silhouette',
      weight: '450 GSM Extreme Heavyweight',
      origin: 'Consciously handcrafted in India',
      composition: '100% GOTS Organic Cotton'
    },
    createdAt: '2026-01-20T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z'
  },
  {
    id: 'prod-resilience-cargo',
    name: 'THE ANCHOR STRUCTURED CARGO',
    shortName: 'ANCHOR CARGO TROUSERS',
    slug: 'anchor-cargo-trousers',
    category: 'Tailored Bottoms',
    collection: 'SERIES 01 – THE GENTLE ARMOR™',
    seriesSlug: 'series-01',
    price: 2999,
    originalPrice: 3799,
    currency: 'INR',
    description: 'Engineered utility pants balancing tactical resilience with clean editorial architectural lines.',
    editorialNote: 'Pleated knees and concealed magnetic cargo flaps ensure a streamlined silhouette during motion.',
    sizes: ['S', 'M', 'L', 'XL'],
    stockQuantity: 19,
    status: 'published',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop'
    ],
    fabricDetails: [
      '310 GSM Japanese Cotton Twill with subtle stretch',
      'DWR water-resistant micro-coating',
      'YKK gunmetal zippers with engraved pullers',
      'Articulated knee darts for unrestricted stride'
    ],
    careInstructions: [
      'Wash cold with mild detergent',
      'Hang dry away from sunlight'
    ],
    specs: {
      fit: 'Relaxed Tapered Fit with bungee hem',
      weight: '310 GSM Technical Twill',
      origin: 'Consciously handcrafted in India',
      composition: '98% Cotton, 2% Elastane'
    },
    createdAt: '2026-01-22T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z'
  }
];
