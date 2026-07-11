import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn, token } from './env'

// Caching & Revalidation Strategy
// We define explicit cache tags to allow precise ISR invalidation via webhooks
// without flushing the entire data cache.
export const SANITY_TAGS = {
  project: 'project',
  page: 'page',
  settings: 'settings',
}

// Client configuration
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published', // Default to published content for production
  stega: {
    // Draft mode / visual editing enabled only in preview deployments
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview', 
    studioUrl: '/studio',
  },
  token,
})
