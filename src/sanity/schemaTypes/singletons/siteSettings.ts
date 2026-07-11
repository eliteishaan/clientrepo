import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Site Title', validation: Rule => Rule.required() }),
    defineField({ name: 'defaultSeo', type: 'seo', title: 'Default SEO' }),
    defineField({ name: 'resumeReference', type: 'reference', to: [{ type: 'resume' }], title: 'Active Resume' }),
    defineField({ name: 'email', type: 'string', title: 'Contact Email' }),
    defineField({ name: 'github', type: 'url', title: 'GitHub URL' }),
    defineField({ name: 'linkedin', type: 'url', title: 'LinkedIn URL' }),
    defineField({ 
      name: 'navigation', 
      type: 'array', 
      title: 'Main Navigation',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] }] 
    }),
    defineField({ 
      name: 'footer', 
      type: 'array', 
      title: 'Footer Links',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] }] 
    }),
    defineField({
      name: 'homepageHero',
      title: 'Homepage Hero Sequence',
      type: 'heroSequence',
    }),
  ],
});
