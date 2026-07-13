import { defineField, defineType } from 'sanity';

import { Briefcase } from 'lucide-react';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: Briefcase,
  fields: [
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company / Organization',
      placeholder: 'e.g. PURPL',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role / Title',
      placeholder: 'e.g. Pulsejet Valve Design Responsible Engineer',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'End Date',
      description: 'Leave blank if currently working here.',
      hidden: ({ document }) => document?.isCurrent === true,
    }),
    defineField({
      name: 'isCurrent',
      type: 'boolean',
      title: 'I currently work here',
      initialValue: false,
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      placeholder: 'e.g. West Lafayette, Indiana',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: '3-5 line summary of what you actually did.',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Large Image',
      description: 'Large cinematic 16:9 contextual image (e.g. workshop, rocket, CAD).',
      options: { hotspot: true },
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'technology' }] }],
      title: 'Core Disciplines',
      description: 'e.g. CAD, FEA, Thermal Design, Manufacturing',
    }),
    defineField({
      name: 'relatedProjects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      title: 'Related Projects',
    }),
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'role',
      isCurrent: 'isCurrent',
      startDate: 'startDate',
      endDate: 'endDate'
    },
    prepare({ title, subtitle, isCurrent, startDate, endDate }) {
      const startYear = startDate ? new Date(startDate).getFullYear() : '';
      const endYear = isCurrent ? 'Present' : (endDate ? new Date(endDate).getFullYear() : '');
      const dateRange = startYear ? `${startYear} — ${endYear}` : '';
      
      return {
        title: title || 'Untitled Company',
        subtitle: `${subtitle || 'No role'} | ${dateRange}`,
      };
    },
  },
});
