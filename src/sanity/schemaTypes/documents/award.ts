import { defineField, defineType } from 'sanity';

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'issuer', type: 'string', title: 'Issuer' }),
    defineField({ name: 'date', type: 'date', title: 'Date Received' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'associatedProject', type: 'reference', to: [{ type: 'project' }], title: 'Associated Project' }),
  ],
});
