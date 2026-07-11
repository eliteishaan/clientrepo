import { defineType, defineField } from 'sanity';

export const engineeringAsset = defineType({
  name: 'engineeringAsset',
  title: 'Engineering Asset',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Asset Title',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Asset Type',
      type: 'string',
      options: {
        list: [
          { title: '3D Model (GLB/GLTF)', value: 'GLB' },
          { title: 'Vector Drawing (SVG)', value: 'SVG' },
          { title: 'Document (PDF)', value: 'PDF' },
          { title: 'Image', value: 'Image' },
          { title: 'Video', value: 'Video' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Asset File',
      type: 'file',
      options: { accept: '.glb,.gltf,.svg,.pdf,image/*,video/*' },
    }),
    defineField({
      name: 'metadata',
      title: 'Engineering Metadata (HUD)',
      type: 'object',
      fields: [
        defineField({ name: 'revision', type: 'string', title: 'Revision' }),
        defineField({ name: 'scale', type: 'string', title: 'Scale' }),
        defineField({ name: 'material', type: 'string', title: 'Material' }),
        defineField({ name: 'status', type: 'string', title: 'Status' }),
        defineField({ name: 'assetVersion', type: 'string', title: 'Asset Version', description: 'For cache invalidation' }),
        defineField({ name: 'checksum', type: 'string', title: 'Checksum', description: 'For integrity and caching' }),
      ]
    }),
    defineField({
      name: 'capabilities',
      title: 'Supported Viewer Modes & Tools',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Solid', value: 'Solid' },
          { title: 'Wireframe', value: 'Wireframe' },
          { title: 'Exploded', value: 'Exploded' },
          { title: 'Section Cut', value: 'Section' },
          { title: 'Layers (SVG)', value: 'Layers' },
          { title: 'Measurements', value: 'Measurements' },
          { title: 'Annotations', value: 'Annotations' },
        ]
      }
    }),
  ],
});
