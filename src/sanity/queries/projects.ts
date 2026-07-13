import { groq } from 'next-sanity';

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(featuredOrder asc) {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    client,
    date,
    location,
    year,
    team,
    role,
    challenge,
    outcome,
    results,
    "coverImageUrl": coverImage.asset->url,
    "categories": coalesce(categories[]->{ title, "slug": slug.current }, []),
    "technologies": coalesce(technologies[]->{ name, "iconUrl": icon.asset->url }, [])
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
    "categories": coalesce(categories[]->{ title, "slug": slug.current }, []),
    "technologies": coalesce(technologies[]->{ name, "iconUrl": icon.asset->url }, []),
    overview,
    problemStatement,
    "objectives": coalesce(objectives, []),
    "constraints": coalesce(constraints, []),
    "requirements": coalesce(requirements, []),
    research { title, content, "media": coalesce(media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption }, []) },
    designDecisions { title, content, "media": coalesce(media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption }, []) },
    "cad": coalesce(cad[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption, cadFormat }, []),
    simulation { title, content, "media": coalesce(media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption }, []) },
    fabrication { title, content, "media": coalesce(media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption }, []) },
    testing { title, content, "media": coalesce(media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption }, []) },
    validation { title, content, "media": coalesce(media[]{ type, "url": file.asset->url, "imageUrl": image.asset->url, alt, caption }, []) },
    "results": coalesce(results, []),
    "lessonsLearned": coalesce(lessonsLearned, []),
    "downloads": coalesce(downloads[]{ title, description, "url": file.asset->url }, []),
    "relatedProjects": coalesce(relatedProjects[]->{ _id, title, "slug": slug.current, subtitle, "coverImageUrl": coverImage.asset->url }, []),
    seo
  }
`;
