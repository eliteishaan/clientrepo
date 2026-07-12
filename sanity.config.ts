import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { projectId, dataset } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Vivaan Portfolio',
  schema,
  plugins: [
    structureTool(),
  ],
})

