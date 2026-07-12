import { defineField, defineType } from 'sanity';


import { Briefcase } from 'lucide-react';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: Briefcase,
  fields: [
    defineField({
      name: 'role',
      type: 'string',
      title: 'Role / Title',
      placeholder: 'e.g. Hardware Engineering Intern',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'company',
      type: 'string',
      title: 'Company / Organization',
      placeholder: 'e.g. Apple',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      type: 'string',
      title: 'Employment Type',
      options: { list: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'] },
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      placeholder: 'e.g. Cupertino, CA',
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
      name: 'description',
      type: 'richText',
      title: 'Description',
      description: 'Overview of your responsibilities and team.',
    }),
    defineField({
      name: 'achievements',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Key Achievements',
      description: 'Bullet points highlighting impact. Use numbers where possible.',
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'technology' }] }],
      title: 'Technologies Used',
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
      title: 'role',
      subtitle: 'company',
      isCurrent: 'isCurrent',
      startDate: 'startDate',
      endDate: 'endDate'
    },
    prepare({ title, subtitle, isCurrent, startDate, endDate }) {
      const startYear = startDate ? new Date(startDate).getFullYear() : '';
      const endYear = isCurrent ? 'Present' : (endDate ? new Date(endDate).getFullYear() : '');
      const dateRange = startYear ? `${startYear} — ${endYear}` : '';
      
      return {
        title: title || 'Untitled Role',
        subtitle: `${subtitle || 'No company'} | ${dateRange}`,
      };
    },
  },
});
