import { defineField, defineType } from 'sanity';

export const metric = defineType({
  name: 'metric',
  title: 'Metric',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', title: 'Label', validation: Rule => Rule.required() }),
    defineField({ name: 'value', type: 'string', title: 'Value', validation: Rule => Rule.required() }),
    defineField({ name: 'unit', type: 'string', title: 'Unit' }),
  ],
});
