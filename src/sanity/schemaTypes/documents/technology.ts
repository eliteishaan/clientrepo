import { defineField, defineType } from 'sanity';


import { Terminal } from 'lucide-react';

export const technology = defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  icon: Terminal,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
      placeholder: 'e.g. SolidWorks',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'Official URL',
      placeholder: 'https://...',
    }),
    defineField({
      name: 'icon',
      type: 'image',
      title: 'Icon (SVG/PNG)',
      description: 'Prefer SVG for vector scaling, or high-res PNG with transparent background.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'icon',
    },
  },
});
