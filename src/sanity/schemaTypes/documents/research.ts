import { defineField, defineType } from 'sanity';


import { FlaskConical } from 'lucide-react';

export const research = defineType({
  name: 'research',
  title: 'Research',
  type: 'document',
  icon: FlaskConical,
  groups: [
    { name: 'general', title: 'General Info', default: true },
    { name: 'content', title: 'Content & Media' },
    { name: 'meta', title: 'SEO & Meta' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      group: 'general',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      group: 'general',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
      group: 'general',
    }),
    defineField({
      name: 'abstract',
      type: 'text',
      title: 'Abstract',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'paper',
      type: 'file',
      title: 'Research Paper (PDF)',
      group: 'content',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'coAuthors',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Co-Authors',
      group: 'general',
    }),
    defineField({
      name: 'publication',
      type: 'reference',
      to: [{ type: 'publication' }],
      title: 'Associated Publication',
      group: 'general',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      title: 'Categories',
      group: 'meta',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      group: 'meta',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
    prepare({ title, subtitle }) {
      const year = subtitle ? new Date(subtitle).getFullYear() : '';
      return {
        title: title || 'Untitled Research',
        subtitle: year.toString(),
      };
    },
  },
});
