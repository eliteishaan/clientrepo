import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
    defineField({ name: 'client', type: 'string', title: 'Client / Class' }),
    defineField({ name: 'date', type: 'date', title: 'Project Date' }),
    defineField({ name: 'version', type: 'string', title: 'Version' }),
    defineField({ name: 'status', type: 'string', title: 'Status', options: { list: ['In Progress', 'Completed', 'Archived'] } }),
    defineField({ name: 'lastUpdated', type: 'date', title: 'Last Updated' }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured Project', initialValue: false }),
    defineField({ name: 'featuredOrder', type: 'number', title: 'Featured Order', hidden: ({ document }) => !document?.featured }),
    defineField({ name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true }, validation: Rule => Rule.required() }),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }], title: 'Categories' }),
    defineField({ name: 'technologies', type: 'array', of: [{ type: 'reference', to: [{ type: 'technology' }] }], title: 'Technologies' }),
    
    defineField({ name: 'overview', type: 'text', title: 'Overview' }),
    defineField({ name: 'problemStatement', type: 'text', title: 'Problem Statement' }),
    defineField({ name: 'objectives', type: 'array', of: [{ type: 'string' }], title: 'Objectives' }),
    defineField({ name: 'constraints', type: 'array', of: [{ type: 'constraint' }], title: 'Constraints' }),
    defineField({ name: 'requirements', type: 'array', of: [{ type: 'requirement' }], title: 'Requirements' }),
    
    defineField({ name: 'research', type: 'engineeringStage', title: 'Research Phase' }),
    defineField({ name: 'designDecisions', type: 'engineeringStage', title: 'Design Decisions' }),
    defineField({ name: 'cad', type: 'array', of: [{ type: 'media' }], title: 'CAD Models & Drawings' }),
    defineField({ name: 'simulation', type: 'engineeringStage', title: 'Simulation Phase' }),
    defineField({ name: 'fabrication', type: 'engineeringStage', title: 'Fabrication Phase' }),
    defineField({ name: 'testing', type: 'engineeringStage', title: 'Testing Phase' }),
    defineField({ name: 'validation', type: 'engineeringStage', title: 'Validation' }),
    
    defineField({ name: 'results', type: 'array', of: [{ type: 'metric' }], title: 'Results & Metrics' }),
    defineField({ name: 'lessonsLearned', type: 'array', of: [{ type: 'string' }], title: 'Lessons Learned' }),
    
    defineField({ name: 'downloads', type: 'array', of: [{ type: 'download' }], title: 'Downloads (PDFs, CAD files)' }),
    defineField({ name: 'relatedProjects', type: 'array', of: [{ type: 'reference', to: [{ type: 'project' }] }], title: 'Related Projects' }),
    defineField({ name: 'mediaGallery', type: 'array', of: [{ type: 'media' }], title: 'Media Gallery' }),
    defineField({ name: 'seo', type: 'seo', title: 'SEO Override' }),
  ],
});
