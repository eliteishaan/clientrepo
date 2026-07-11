import { defineField, defineType } from 'sanity';

export const engineeringStage = defineType({
  name: 'engineeringStage',
  title: 'Engineering Stage',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Stage Title' }),
    defineField({ name: 'content', type: 'richText', title: 'Content' }),
    defineField({ name: 'media', type: 'array', of: [{ type: 'media' }], title: 'Supporting Media' }),
  ],
});
