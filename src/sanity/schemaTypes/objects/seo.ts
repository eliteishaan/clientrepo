import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title' }),
    defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description', validation: Rule => Rule.max(160).warning('Longer descriptions may be truncated by search engines') }),
    defineField({ name: 'openGraphImage', type: 'image', title: 'OpenGraph Image', options: { hotspot: true } }),
  ],
});
