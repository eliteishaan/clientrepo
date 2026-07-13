import { defineField, defineType } from 'sanity';

export const expertiseCategory = defineType({
  name: 'expertiseCategory',
  title: 'Expertise Category',
  type: 'object',
  fields: [
    defineField({ 
      name: 'title', 
      type: 'string', 
      title: 'Category Title',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'skills',
      type: 'array',
      title: 'Skills',
      of: [{ type: 'expertiseSkill' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      skills: 'skills',
    },
    prepare({ title, skills }) {
      return {
        title: title || 'Untitled Category',
        subtitle: skills ? `${skills.length} skills` : '0 skills',
      };
    },
  },
});
