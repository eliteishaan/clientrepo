import { groq } from 'next-sanity';

export const awardsQuery = groq`
  *[_type == "award"] | order(date desc) {
    _id,
    title,
    issuer,
    date,
    description,
    associatedProject->{ title, "slug": slug.current }
  }
`;
