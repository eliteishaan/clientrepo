import { defineField, defineType } from 'sanity';


import { FileText } from 'lucide-react';

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      placeholder: 'e.g. A novel approach to robotic actuation',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date Published',
    }),
    defineField({
      name: 'publisher',
      type: 'string',
      title: 'Publisher / Journal',
      placeholder: 'e.g. IEEE Transactions on Robotics',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'External URL (DOI or Link)',
      placeholder: 'https://doi.org/...',
    }),
    defineField({
      name: 'abstract',
      type: 'text',
      title: 'Abstract',
      rows: 4,
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Authors',
      description: 'List of authors as they appear on the paper.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publisher',
      date: 'date',
    },
    prepare({ title, subtitle, date }) {
      const year = date ? new Date(date).getFullYear() : '';
      return {
        title: title || 'Untitled Publication',
        subtitle: [subtitle, year].filter(Boolean).join(' · '),
      };
    },
  },
});
