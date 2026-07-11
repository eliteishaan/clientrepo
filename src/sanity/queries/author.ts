import { groq } from 'next-sanity';

export const authorQuery = groq`
  *[_type == "author"][0] {
    name,
    role,
    institution,
    availability,
    bio,
    "imageUrl": image.asset->url,
    metrics[]{
      label,
      value,
      unit
    },
    primaryCta,
    secondaryCta,
    skills[]{
      proficiency,
      category->{ title },
      technology->{ name, "iconUrl": icon.asset->url }
    }
  }
`;
