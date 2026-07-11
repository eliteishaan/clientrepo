import { groq } from 'next-sanity';

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(featuredOrder asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    client,
    date,
    "coverImageUrl": coverImage.asset->url,
    categories[]->{ title, "slug": slug.current },
    technologies[]->{ name, "iconUrl": icon.asset->url }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    client,
    date,
    "coverImageUrl": coverImage.asset->url,
    categories[]->{ title, "slug": slug.current },
    technologies[]->{ name, "iconUrl": icon.asset->url },
    overview,
    problemStatement,
    objectives,
    constraints,
    requirements,
    research { title, content, "media": media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption } },
    designDecisions { title, content, "media": media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption } },
    cad[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption, cadFormat },
    simulation { title, content, "media": media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption } },
    fabrication { title, content, "media": media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption } },
    testing { title, content, "media": media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption } },
    validation { title, content, "media": media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption } },
    results,
    lessonsLearned,
    downloads[]{ title, description, "url": file.asset->url },
    relatedProjects[]->{ _id, title, "slug": slug.current, subtitle, "coverImageUrl": coverImage.asset->url },
    seo
  }
`;
