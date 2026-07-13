import { groq } from 'next-sanity';

export const experienceQuery = groq`
  *[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    role,
    startDate,
    endDate,
    isCurrent,
    location,
    description,
    "coverImageUrl": coverImage.asset->url,
    "technologies": coalesce(technologies[]->{ name }, []),
    "relatedProjects": coalesce(relatedProjects[]->{ _id, title, "slug": slug.current }, [])
  }
`;
