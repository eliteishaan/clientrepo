import { defineField, defineType } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: Rule => Rule.required() }),
    defineField({ name: 'role', type: 'string', title: 'Primary Role' }),
    defineField({ name: 'institution', type: 'string', title: 'Institution' }),
    defineField({ name: 'availability', type: 'string', title: 'Availability Status' }),
    defineField({ name: 'bio', type: 'richText', title: 'Bio' }),
    defineField({ name: 'image', type: 'image', title: 'Profile Image', options: { hotspot: true } }),
    defineField({ name: 'metrics', type: 'array', of: [{ type: 'metric' }], title: 'Quick Metrics' }),
    defineField({ 
      name: 'primaryCta', 
      type: 'object', 
      title: 'Primary CTA',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Label' }),
        defineField({ name: 'link', type: 'string', title: 'Link (URL or Path)' })
      ]
    }),
    defineField({ 
      name: 'secondaryCta', 
      type: 'object', 
      title: 'Secondary CTA',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Label' }),
        defineField({ name: 'link', type: 'string', title: 'Link (URL or Path)' })
      ]
    }),
    defineField({ name: 'skills', type: 'array', of: [{ type: 'skill' }], title: 'Listed Skills' }),
  ],
});
