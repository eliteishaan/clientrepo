import { defineField, defineType } from 'sanity';

export const research = defineType({
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'date', type: 'date', title: 'Date' }),
    defineField({ name: 'abstract', type: 'text', title: 'Abstract' }),
    defineField({ name: 'paper', type: 'file', title: 'Research Paper (PDF)', options: { accept: '.pdf' } }),
    defineField({ name: 'coAuthors', type: 'array', of: [{ type: 'string' }], title: 'Co-Authors' }),
    defineField({ name: 'publication', type: 'reference', to: [{ type: 'publication' }], title: 'Publication' }),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }], title: 'Categories' }),
    defineField({ name: 'seo', type: 'seo', title: 'SEO' }),
  ],
});
