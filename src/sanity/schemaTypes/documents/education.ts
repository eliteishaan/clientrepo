import { defineField, defineType } from 'sanity';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({ name: 'institution', type: 'string', title: 'Institution', validation: Rule => Rule.required() }),
    defineField({ name: 'logo', type: 'image', title: 'Institution Logo' }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'degree', type: 'string', title: 'Degree', validation: Rule => Rule.required() }),
    defineField({ name: 'major', type: 'string', title: 'Major' }),
    defineField({ name: 'minor', type: 'string', title: 'Minor' }),
    defineField({ name: 'startDate', type: 'date', title: 'Start Date' }),
    defineField({ name: 'endDate', type: 'date', title: 'End Date' }),
    defineField({ name: 'gpa', type: 'string', title: 'GPA' }),
    defineField({ name: 'coursework', type: 'array', of: [{ type: 'string' }], title: 'Relevant Coursework' }),
    defineField({ name: 'honors', type: 'array', of: [{ type: 'string' }], title: 'Honors & Awards' }),
  ],
});
