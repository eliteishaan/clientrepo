import { defineField, defineType } from 'sanity';

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'date', type: 'date', title: 'Date Published' }),
    defineField({ name: 'publisher', type: 'string', title: 'Publisher / Journal' }),
    defineField({ name: 'url', type: 'url', title: 'External URL' }),
    defineField({ name: 'abstract', type: 'text', title: 'Abstract' }),
    defineField({ name: 'authors', type: 'array', of: [{ type: 'string' }], title: 'Authors' }),
  ],
});
