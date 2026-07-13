import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { projectId, dataset } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

import { structure } from './src/sanity/structure'

const singletonActions = new Set(["publish", "discardChanges", "restore"])
const singletonTypes = new Set(["siteSettings", "author", "resume"])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Vivaan Portfolio',
  schema,
  plugins: [
    structureTool({ structure }),
  ],
  document: {
    // Prevent deletion or duplication of singletons
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})

