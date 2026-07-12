import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'homepage', title: 'Homepage Hero' },
    { name: 'seo', title: 'Default SEO' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Site Title', group: 'general', validation: Rule => Rule.required() }),
    defineField({ name: 'email', type: 'string', title: 'Contact Email', group: 'general' }),
    defineField({ name: 'github', type: 'url', title: 'GitHub URL', group: 'general' }),
    defineField({ name: 'linkedin', type: 'url', title: 'LinkedIn URL', group: 'general' }),
    defineField({ name: 'resumeReference', type: 'reference', to: [{ type: 'resume' }], title: 'Active Resume', group: 'general' }),
    
    defineField({ 
      name: 'navigation', 
      type: 'array', 
      title: 'Main Navigation',
      group: 'navigation',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] }] 
    }),
    defineField({ 
      name: 'footer', 
      type: 'array', 
      title: 'Footer Links',
      group: 'navigation',
      of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] }] 
    }),
    
    defineField({
      name: 'homepageHero',
      title: 'Homepage Hero Sequence',
      type: 'heroSequence',
      group: 'homepage'
    }),
    
    defineField({ name: 'defaultSeo', type: 'seo', title: 'Default SEO', group: 'seo' }),
  ],
});
