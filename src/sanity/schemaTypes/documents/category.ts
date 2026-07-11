import { defineField, defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: Rule => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'type', type: 'string', title: 'Category Type', options: { list: ['Project', 'Skill', 'Research'] } }),
  ],
});
