import { defineField, defineType } from 'sanity';

export const requirement = defineType({
  name: 'requirement',
  title: 'Requirement',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Requirement Title', validation: Rule => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'isMet', type: 'boolean', title: 'Was it met?', initialValue: false }),
  ],
});
