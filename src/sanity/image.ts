import createImageUrlBuilder from '@sanity/image-url'
type SanityImageSource = any;
import { dataset, projectId } from './env'

// Configures the Sanity image builder for optimized image delivery
const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
