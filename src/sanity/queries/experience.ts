import { groq } from 'next-sanity';

export const experienceQuery = groq`
  *[_type == "experience"] | order(startDate desc) {
    _id,
    role,
    company,
    employmentType,
    location,
    startDate,
    endDate,
    isCurrent,
    description,
    achievements,
    technologies[]->{ name }
  }
`;
