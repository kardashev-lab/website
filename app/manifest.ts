import { MetadataRoute } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'KardashevLabs',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#030712',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
    categories: ['utilities', 'energy', 'productivity'],
    lang: 'en-US',
    dir: 'ltr',
    orientation: 'portrait-primary',
    scope: SITE_URL,
  };
}
