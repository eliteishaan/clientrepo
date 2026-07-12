import { defineField, defineType } from 'sanity';


import { Star } from 'lucide-react';

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Award Title',
      description: 'Full name of the award. Example: "Best Hardware Project — MIT MakerLab"',
      placeholder: 'e.g. Dean\'s List Award',
      validation: Rule => Rule.required().min(2),
    }),
    defineField({
      name: 'issuer',
      type: 'string',
      title: 'Issued By',
      description: 'Organization, institution, or competition that granted this award.',
      placeholder: 'e.g. Massachusetts Institute of Technology',
    }),
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date Received',
      description: 'When you received this award.',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Brief description of what you did to earn this award. 1–3 sentences.',
      rows: 3,
    }),
    defineField({
      name: 'associatedProject',
      type: 'reference',
      to: [{ type: 'project' }],
      title: 'Associated Project',
      description: 'Optional. Link to the project this award was given for.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
      date: 'date',
    },
    prepare({ title, subtitle, date }) {
      const year = date ? new Date(date).getFullYear() : '';
      return {
        title: title || 'Untitled Award',
        subtitle: [subtitle, year].filter(Boolean).join(' · '),
      };
    },
  },
});
