import { defineField, defineType } from 'sanity';


import { User } from 'lucide-react';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: User,
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'content', title: 'Content & Bio' },
    { name: 'ctas', title: 'Calls to Action' },
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Full Name',
      group: 'identity',
      description: 'Your full name as you want it displayed on the portfolio.',
      placeholder: 'e.g. Vivaan Sharma',
      validation: Rule => Rule.required().min(2).max(80).error('Please enter the author name.'),
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Primary Role',
      group: 'identity',
      description: 'Your current title or role. Displayed prominently on the homepage.',
      placeholder: 'e.g. Mechanical Engineer & Applied Physicist',
    }),
    defineField({
      name: 'institution',
      type: 'string',
      title: 'Institution / Company',
      group: 'identity',
      description: 'Your current institution, university, or employer.',
      placeholder: 'e.g. MIT · Department of Mechanical Engineering',
    }),
    defineField({
      name: 'availability',
      type: 'string',
      title: 'Availability Status',
      group: 'identity',
      description: 'Shown as a live badge on the hero section. Keep it short.',
      placeholder: 'e.g. Available for internships from May 2025',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Profile Image',
      group: 'identity',
      description: 'A high-resolution headshot. Recommended: 1:1 ratio, 800×800px minimum.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      type: 'richText',
      title: 'Biography',
      group: 'content',
      description: 'Your full bio. Supports rich text formatting with headings and lists.',
    }),
    defineField({
      name: 'metrics',
      type: 'array',
      of: [{ type: 'metric' }],
      title: 'Key Metrics',
      group: 'content',
      description: 'Headline numbers shown in the hero section. Max 4 recommended. Example: "3 — Years of Experience".',
      validation: Rule => Rule.max(4).warning('Adding more than 4 metrics may break the Hero layout.'),
    }),
    defineField({
      name: 'capabilities',
      type: 'array',
      of: [{ type: 'expertiseCategory' }],
      title: 'Technical Capabilities',
      group: 'content',
      description: 'Engineering tools, methodologies, and disciplines. Grouped by category.',
    }),
    defineField({
      name: 'primaryCta',
      type: 'object',
      title: 'Primary Call to Action',
      group: 'ctas',
      description: 'The main button on the homepage hero — typically "View Projects" or "Download Resume".',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Button Label', placeholder: 'e.g. View My Work' }),
        defineField({ name: 'link', type: 'string', title: 'Link (URL or Path)', placeholder: 'e.g. /projects or https://...' }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      type: 'object',
      title: 'Secondary Call to Action',
      group: 'ctas',
      description: 'The secondary button — typically "Get In Touch" or "Download CV".',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Button Label', placeholder: 'e.g. Get In Touch' }),
        defineField({ name: 'link', type: 'string', title: 'Link (URL or Path)', placeholder: 'e.g. mailto:hello@vivaan.dev' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unnamed Author',
        subtitle: subtitle || 'No role set',
        media,
      };
    },
  },
});
