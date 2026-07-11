import { defineType, defineField } from 'sanity';

export const heroSequence = defineType({
  name: 'heroSequence',
  title: 'Hero Sequence',
  type: 'object',
  fields: [
    defineField({
      name: 'terminalOutput',
      title: 'Terminal Output',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'The strings that parse rapidly in Stage 1.',
    }),
    defineField({
      name: 'sketchSvg',
      title: 'Sketch SVG',
      type: 'text',
      description: 'Raw SVG code for the initial trace (Stage 2).',
    }),
    defineField({
      name: 'blueprintSvg',
      title: 'Blueprint SVG',
      type: 'text',
      description: 'Raw SVG code for the precise schematic (Stage 3).',
    }),
    defineField({
      name: 'analysisType',
      title: 'Analysis Type',
      type: 'string',
      options: {
        list: [
          { title: 'Mechanical (Stress Heatmap)', value: 'stress' },
          { title: 'Fluid (Particle Flow)', value: 'flow' },
          { title: 'Electronics (Signal Pulses)', value: 'signals' },
          { title: 'Manufacturing (Tolerances)', value: 'tolerances' },
          { title: 'Software (Execution Graph)', value: 'execution' },
        ],
      },
    }),
    defineField({
      name: 'modelFile',
      title: '3D Model File',
      type: 'file',
      options: {
        accept: '.glb,.gltf',
      },
      description: 'The 3D model for the wireframe and solid render (Stages 5-6).',
    }),
  ],
});
