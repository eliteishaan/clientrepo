import { defineType } from 'sanity';

export const richText = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    { type: 'block' },
    { type: 'media' },
  ],
});
