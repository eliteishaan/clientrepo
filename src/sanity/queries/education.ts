import { groq } from 'next-sanity';

export const educationQuery = groq`
  *[_type == "education"] | order(startDate desc) {
    _id,
    institution,
    "logoUrl": logo.asset->url,
    location,
    degree,
    major,
    minor,
    startDate,
    endDate,
    gpa,
    coursework,
    honors
  }
`;
