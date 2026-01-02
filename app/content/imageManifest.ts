/**
 * Global Image Manifest - Single Source of Truth
 *
 * RULE: NO image src may appear more than once across all sections
 * (except logos in Partners/Timeline which are exempt)
 */

export interface ImageAsset {
  id: string;
  src: string;
  alt: string;
  category: 'work' | 'personal' | 'process' | 'atmosphere' | 'project' | 'album' | 'logo';
}

// ABOUT: Single editorial image (1 image)
export const aboutImages: ImageAsset[] = [
  { id: 'about-main', src: '/images/about/about-main.jpg', alt: 'Patrick Jørgensen', category: 'personal' },
];

// ATMOSPHERE BREAK: Pure silence - NO images, NO UI, NO content
// Empty section for editorial pause before Philosophy
export const atmosphereBreakImages: ImageAsset[] = [];

// WORKS: Project visuals (3 images) - unique to Works only
export const worksImages: ImageAsset[] = [
  { id: 'work-election', src: '/images/projects/election-tv2.jpg', alt: 'TV2 Election Coverage', category: 'project' },
  { id: 'work-music', src: '/images/projects/album-cover.png', alt: 'Music Career', category: 'project' },
  { id: 'work-ai', src: '/images/projects/hoodie.png', alt: 'AI-Powered Workflows', category: 'project' },
];

// MUSIC: Album covers (3 images) - unique to Music only
export const musicImages: ImageAsset[] = [
  { id: 'music-lifeline', src: '/images/albums/lifeline.png', alt: 'Lifeline Album', category: 'album' },
  { id: 'music-set-free', src: '/images/albums/set-you-free.png', alt: 'Set You Free Album', category: 'album' },
  { id: 'music-brother', src: '/images/albums/brother.png', alt: 'Brother Album', category: 'album' },
];

// PARTNERS: Logos (exempt from uniqueness rule)
export const partnerLogos: ImageAsset[] = [
  { id: 'partner-tv2', src: '/images/clients/tv2.png', alt: 'TV2', category: 'logo' },
  { id: 'partner-sony', src: '/images/clients/sony-music.png', alt: 'Sony Music', category: 'logo' },
  { id: 'partner-bi', src: '/images/clients/bi.png', alt: 'BI Norwegian Business School', category: 'logo' },
  { id: 'partner-nobel', src: '/images/clients/nobel.png', alt: 'Nobel Peace Center', category: 'logo' },
];

// DEV-ONLY: Duplicate check
if (process.env.NODE_ENV === 'development') {
  const allImages = [
    ...aboutImages,
    ...atmosphereBreakImages,
    ...worksImages,
    ...musicImages,
  ];

  const srcSet = new Set<string>();
  const duplicates: string[] = [];

  allImages.forEach(img => {
    if (srcSet.has(img.src)) {
      duplicates.push(img.src);
    }
    srcSet.add(img.src);
  });

  if (duplicates.length > 0) {
    console.warn('⚠️ DUPLICATE IMAGES DETECTED:');
    duplicates.forEach(src => {
      console.warn(`  - ${src}`);
    });
    console.warn('Fix: Each image src must be unique across About/AtmosphereBreak/Works/Music');
  } else {
    console.log('✅ Image manifest: No duplicates detected');
  }
}
