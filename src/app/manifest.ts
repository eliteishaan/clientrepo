import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vivaan | Engineering Portfolio',
    short_name: 'Vivaan',
    description: 'Mechanical Engineering & Applied Physics Portfolio',
    start_url: '/',
    display: 'standalone',
    background_color: '#030303',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
