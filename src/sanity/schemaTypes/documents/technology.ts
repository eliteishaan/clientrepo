import { defineField, defineType } from 'sanity';

export const technology = defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: Rule => Rule.required() }),
    defineField({ name: 'url', type: 'url', title: 'Official URL' }),
    defineField({ name: 'icon', type: 'image', title: 'Icon (SVG/PNG)' }),
  ],
});
