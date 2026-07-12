import { defineField, defineType } from 'sanity';


import { Tag } from 'lucide-react';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      placeholder: 'e.g. Robotics',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Used in URLs. Generate from title.',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Brief overview of this category.',
      rows: 3,
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Category Type',
      description: 'What does this category apply to?',
      options: { list: ['Project', 'Skill', 'Research'] },
      initialValue: 'Project',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
});
