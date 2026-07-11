import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { projectId, dataset } from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Vivaan Portfolio',
  schema: {
    types: [],
  },
  plugins: [
    structureTool(),
  ],
})
