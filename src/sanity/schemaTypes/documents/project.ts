import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'general', title: 'General Info', default: true },
    { name: 'content', title: 'Engineering Content' },
    { name: 'media', title: 'Assets & Media' },
    { name: 'meta', title: 'SEO & Meta' },
  ],
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', group: 'general', validation: Rule => Rule.required().max(100).error('Please enter a project title.') }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', group: 'general', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required().error('A unique slug is required for routing.') }),
    defineField({ name: 'subtitle', type: 'string', title: 'Subtitle', group: 'general', description: 'One sentence overview' }),
    defineField({ name: 'client', type: 'string', title: 'Client / Class', group: 'general' }),
    defineField({ name: 'date', type: 'date', title: 'Project Date', group: 'general' }),
    defineField({ name: 'version', type: 'string', title: 'Version (e.g. v2.1.0)', group: 'general', initialValue: 'v1.0.0' }),
    defineField({ name: 'status', type: 'string', title: 'Status', group: 'general', options: { list: ['In Progress', 'Completed', 'Archived'] }, initialValue: 'Completed' }),
    defineField({ name: 'lastUpdated', type: 'date', title: 'Last Updated', group: 'general' }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured Project', group: 'general', initialValue: false }),
    defineField({ name: 'featuredOrder', type: 'number', title: 'Featured Order', group: 'general', hidden: ({ document }) => !document?.featured }),
    
    defineField({ name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }], title: 'Categories', group: 'general' }),
    defineField({ name: 'technologies', type: 'array', of: [{ type: 'reference', to: [{ type: 'technology' }] }], title: 'Technologies', group: 'general' }),
    
    // Meta Data / Future Proofing
    defineField({ name: 'location', type: 'string', title: 'Location', group: 'general' }),
    defineField({ name: 'year', type: 'string', title: 'Year', group: 'general' }),
    defineField({ name: 'team', type: 'string', title: 'Team / Organization', group: 'general' }),
    defineField({ name: 'role', type: 'string', title: 'Specific Role', group: 'general' }),
    
    // Engineering Content
    defineField({ name: 'overview', type: 'text', title: 'Overview', group: 'content', rows: 4 }),
    defineField({ name: 'challenge', type: 'text', title: 'Challenge', group: 'content', rows: 2 }),
    defineField({ name: 'outcome', type: 'text', title: 'Outcome', group: 'content', rows: 2 }),
    defineField({ name: 'problemStatement', type: 'text', title: 'Problem Statement', group: 'content', rows: 3 }),
    defineField({ name: 'objectives', type: 'array', of: [{ type: 'string' }], title: 'Objectives', group: 'content' }),
    defineField({ name: 'constraints', type: 'array', of: [{ type: 'constraint' }], title: 'Constraints', group: 'content' }),
    defineField({ name: 'requirements', type: 'array', of: [{ type: 'requirement' }], title: 'Requirements', group: 'content' }),
    
    defineField({ name: 'research', type: 'engineeringStage', title: 'Research Phase', group: 'content' }),
    defineField({ name: 'designDecisions', type: 'engineeringStage', title: 'Design Decisions', group: 'content' }),
    defineField({ name: 'simulation', type: 'engineeringStage', title: 'Simulation Phase', group: 'content' }),
    defineField({ name: 'fabrication', type: 'engineeringStage', title: 'Fabrication Phase', group: 'content' }),
    defineField({ name: 'testing', type: 'engineeringStage', title: 'Testing Phase', group: 'content' }),
    defineField({ name: 'validation', type: 'engineeringStage', title: 'Validation', group: 'content' }),
    
    defineField({ name: 'results', type: 'array', of: [{ type: 'metric' }], title: 'Results & Metrics', group: 'content' }),
    defineField({ name: 'lessonsLearned', type: 'array', of: [{ type: 'string' }], title: 'Lessons Learned', group: 'content' }),
    
    // Media
    defineField({ name: 'coverImage', type: 'image', title: 'Cover Image', group: 'media', options: { hotspot: true }, validation: Rule => Rule.required().error('Please upload a project cover image. It is required for the layout.') }),
    defineField({ name: 'cad', type: 'array', of: [{ type: 'media' }], title: 'CAD Models & Drawings', group: 'media' }),
    defineField({ name: 'mediaGallery', type: 'array', of: [{ type: 'media' }], title: 'Media Gallery', group: 'media' }),
    defineField({ name: 'downloads', type: 'array', of: [{ type: 'download' }], title: 'Downloads', group: 'media' }),
    
    // Meta
    defineField({ name: 'relatedProjects', type: 'array', of: [{ type: 'reference', to: [{ type: 'project' }] }], title: 'Related Projects', group: 'meta' }),
    defineField({ name: 'seo', type: 'seo', title: 'SEO Override', group: 'meta' }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'coverImage',
      featured: 'featured'
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: title || 'Untitled Project',
        subtitle: `${featured ? '⭐ ' : ''}${subtitle || 'No subtitle'}`,
        media,
      };
    }
  }
});
