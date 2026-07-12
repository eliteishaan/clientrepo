import { defineField, defineType } from 'sanity';


import { Book } from 'lucide-react';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  icon: Book,
  fields: [
    defineField({
      name: 'institution',
      type: 'string',
      title: 'Institution Name',
      description: 'Full official name of the university or school.',
      placeholder: 'e.g. Massachusetts Institute of Technology',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Institution Logo',
      description: 'Institutional logo. Preferably a square PNG or SVG with transparent background.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      description: 'City and state/country.',
      placeholder: 'e.g. Cambridge, MA, USA',
    }),
    defineField({
      name: 'degree',
      type: 'string',
      title: 'Degree',
      description: 'Degree type. Examples: B.S., M.S., Ph.D., B.E.',
      placeholder: 'e.g. Bachelor of Science',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'major',
      type: 'string',
      title: 'Major / Field of Study',
      placeholder: 'e.g. Mechanical Engineering',
    }),
    defineField({
      name: 'minor',
      type: 'string',
      title: 'Minor / Secondary Field',
      placeholder: 'e.g. Applied Physics',
    }),
    defineField({
      name: 'startDate',
      type: 'date',
      title: 'Start Date',
    }),
    defineField({
      name: 'endDate',
      type: 'date',
      title: 'End Date (Expected)',
      description: 'Leave empty if currently enrolled.',
    }),
    defineField({
      name: 'gpa',
      type: 'string',
      title: 'GPA',
      description: 'Format: "3.9 / 4.0". Leave empty if you prefer not to display it.',
      placeholder: 'e.g. 3.92 / 4.00',
    }),
    defineField({
      name: 'coursework',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Relevant Coursework',
      description: 'List key courses relevant to your target role. 4–8 is optimal.',
    }),
    defineField({
      name: 'honors',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Honors & Awards',
      description: 'Academic honors, dean\'s list, scholarships, etc.',
    }),
  ],
  preview: {
    select: {
      title: 'institution',
      subtitle: 'degree',
      media: 'logo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Unnamed Institution',
        subtitle: subtitle || 'No degree set',
        media,
      };
    },
  },
});
