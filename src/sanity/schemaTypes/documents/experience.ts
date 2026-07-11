import { defineField, defineType } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'role', type: 'string', title: 'Role', validation: Rule => Rule.required() }),
    defineField({ name: 'company', type: 'string', title: 'Company/Organization', validation: Rule => Rule.required() }),
    defineField({ name: 'employmentType', type: 'string', title: 'Employment Type', options: { list: ['Full-time', 'Part-time', 'Contract', 'Internship'] } }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'startDate', type: 'date', title: 'Start Date', validation: Rule => Rule.required() }),
    defineField({ name: 'endDate', type: 'date', title: 'End Date' }),
    defineField({ name: 'isCurrent', type: 'boolean', title: 'I currently work here', initialValue: false }),
    defineField({ name: 'description', type: 'richText', title: 'Description' }),
    defineField({ name: 'achievements', type: 'array', of: [{ type: 'string' }], title: 'Key Achievements' }),
    defineField({ name: 'technologies', type: 'array', of: [{ type: 'reference', to: [{ type: 'technology' }] }], title: 'Technologies Used' }),
    defineField({ name: 'relatedProjects', type: 'array', of: [{ type: 'reference', to: [{ type: 'project' }] }], title: 'Related Projects' }),
  ],
});
