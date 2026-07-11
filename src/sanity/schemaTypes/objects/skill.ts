import { defineField, defineType } from 'sanity';

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'object',
  fields: [
    defineField({ name: 'technology', type: 'reference', to: [{ type: 'technology' }], title: 'Technology' }),
    defineField({ name: 'proficiency', type: 'string', title: 'Proficiency Level', options: { list: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] } }),
    defineField({ name: 'category', type: 'reference', to: [{ type: 'category' }], title: 'Category Override' }),
  ],
});
