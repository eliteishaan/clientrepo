import { defineField, defineType } from 'sanity';

export const media = defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Media Type',
      options: { list: ['Image', 'Video', 'PDF', 'CAD', 'GLB'] },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true }, hidden: ({ parent }) => parent?.type !== 'Image' }),
    defineField({ name: 'videoUrl', type: 'url', title: 'Video URL', hidden: ({ parent }) => parent?.type !== 'Video' }),
    defineField({ name: 'file', type: 'file', title: 'File (PDF/CAD/GLB)', hidden: ({ parent }) => !['PDF', 'CAD', 'GLB'].includes(parent?.type) }),
    defineField({ name: 'alt', type: 'string', title: 'Alt Text (Accessibility)', validation: Rule => Rule.custom((alt, context: any) => context.parent?.type === 'Image' && !alt ? 'Alt text is required for images' : true) }),
    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
    defineField({ name: 'cadFormat', type: 'string', title: 'CAD Format (e.g., SLDPRT, STEP)', hidden: ({ parent }) => parent?.type !== 'CAD' }),
  ],
});
