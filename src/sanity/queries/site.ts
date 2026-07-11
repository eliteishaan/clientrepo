import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    email,
    github,
    linkedin,
    navigation,
    footer,
    defaultSeo,
    resumeReference->{
      versionString,
      "url": file.asset->url
    },
    homepageHero {
      terminalOutput,
      sketchSvg,
      blueprintSvg,
      analysisType,
      modelFile {
        asset->{
          url
        }
      }
    }
  }
`;
