import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Krish Home Appliances',
    short_name: 'Krish Appliances',
    description: 'Genuine spare parts shop & multi-brand home appliance repair in Nalasopara East, Maharashtra',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f6f2',
    theme_color: '#1a5fb4',
    orientation: 'portrait',
    categories: ['business', 'shopping'],
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
