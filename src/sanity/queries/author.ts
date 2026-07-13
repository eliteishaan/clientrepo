import { groq } from 'next-sanity';

export const authorQuery = groq`
  *[_type == "author"][0] {
    name,
    role,
    institution,
    availability,
    bio,
    "imageUrl": image.asset->url,
    "metrics": coalesce(metrics[]{
      label,
      value,
      unit
    }, []),
    primaryCta,
    secondaryCta,
    "capabilities": coalesce(capabilities[]{
      title,
      "skills": coalesce(skills[]{
        name,
        featured,
        "iconUrl": icon.asset->url
      }, [])
    }, [])
  }
`;
