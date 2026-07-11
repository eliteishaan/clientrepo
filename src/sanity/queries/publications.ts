import { groq } from 'next-sanity';

export const publicationsQuery = groq`
  *[_type == "publication"] | order(date desc) {
    _id,
    title,
    date,
    publisher,
    url,
    abstract,
    authors
  }
`;
