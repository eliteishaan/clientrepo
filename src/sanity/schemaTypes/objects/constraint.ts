import { defineField, defineType } from 'sanity';

export const constraint = defineType({
  name: 'constraint',
  title: 'Constraint',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Constraint Type (e.g., Budget, Material)', validation: Rule => Rule.required() }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
  ],
});
