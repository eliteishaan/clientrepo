import { defineField, defineType } from 'sanity';

export const download = defineType({
  name: 'download',
  title: 'Download',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'file', type: 'file', title: 'File', validation: Rule => Rule.required() }),
    defineField({ name: 'description', type: 'string', title: 'Description' }),
  ],
});
