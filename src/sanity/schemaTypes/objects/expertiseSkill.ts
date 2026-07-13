import { defineField, defineType } from 'sanity';

export const expertiseSkill = defineType({
  name: 'expertiseSkill',
  title: 'Skill',
  type: 'object',
  fields: [
    defineField({ 
      name: 'name', 
      type: 'string', 
      title: 'Skill Name',
      validation: Rule => Rule.required(),
    }),
    defineField({ 
      name: 'featured', 
      type: 'boolean', 
      title: 'Featured', 
      description: 'Highlight this skill (future-proofing)',
      initialValue: false,
    }),
    defineField({ 
      name: 'icon', 
      type: 'image', 
      title: 'Icon (Optional)', 
      description: 'Optional icon for future UI updates',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'featured',
      media: 'icon',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? 'Featured' : '',
        media,
      };
    },
  },
});
