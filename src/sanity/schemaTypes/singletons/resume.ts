import { defineField, defineType } from 'sanity';

export const resume = defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({ name: 'versionString', type: 'string', title: 'Version String (e.g. Fall 2026)', validation: Rule => Rule.required() }),
    defineField({ name: 'file', type: 'file', title: 'PDF File', options: { accept: '.pdf' }, validation: Rule => Rule.required() }),
    defineField({ name: 'lastUpdated', type: 'datetime', title: 'Last Updated', initialValue: () => new Date().toISOString() }),
  ],
});
