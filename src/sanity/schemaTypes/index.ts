import { siteSettings } from './singletons/siteSettings';
import { resume } from './singletons/resume';

import { author } from './documents/author';
import { award } from './documents/award';
import { category } from './documents/category';
import { education } from './documents/education';
import { experience } from './documents/experience';
import { project } from './documents/project';
import { publication } from './documents/publication';
import { research } from './documents/research';
import { technology } from './documents/technology';

import { constraint } from './objects/constraint';
import { download } from './objects/download';
import { engineeringStage } from './objects/engineeringStage';
import { media } from './objects/media';
import { metric } from './objects/metric';
import { requirement } from './objects/requirement';
import { richText } from './objects/richText';
import { seo } from './objects/seo';
import { skill } from './objects/skill';
import { heroSequence } from './objects/heroSequence';
import { expertiseCategory } from './objects/expertiseCategory';
import { expertiseSkill } from './objects/expertiseSkill';


export const schema = {
  types: [
    siteSettings,
    resume,
    author,
    award,
    category,
    education,
    experience,
    project,
    publication,
    research,
    technology,
    constraint,
    download,
    engineeringStage,
    media,
    metric,
    requirement,
    richText,
    seo,
    skill,
    heroSequence,
    expertiseCategory,
    expertiseSkill,
  ]
};
