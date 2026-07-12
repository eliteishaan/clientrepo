import { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = 'https://vivaan.dev';
  
  // Fetch all project slugs
  const projects = await client.fetch<{ slug: string; _updatedAt: string }[]>(
    groq`*[_type == "project" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    }`,
    {},
    { next: { tags: ['project'] } }
  );

  const projectUrls: MetadataRoute.Sitemap = projects.map((project: { slug: string; _updatedAt: string }) => ({
    url: `${domain}/projects/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
