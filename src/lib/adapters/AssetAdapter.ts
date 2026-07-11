import { AdaptedAsset, ViewerMode } from '../types/viewer';

export function adaptEngineeringAsset(cmsAsset: any): AdaptedAsset | null {
  if (!cmsAsset || !cmsAsset.file?.asset?.url) return null;

  return {
    id: cmsAsset._key || Math.random().toString(36).substr(2, 9),
    type: cmsAsset.type as any,
    title: cmsAsset.title || 'Untitled Asset',
    sourceUrl: cmsAsset.file.asset.url,
    capabilities: (cmsAsset.capabilities || []) as ViewerMode[],
    metadata: {
      revision: cmsAsset.metadata?.revision || 'Rev A',
      scale: cmsAsset.metadata?.scale || '1:1',
      material: cmsAsset.metadata?.material || 'N/A',
      status: cmsAsset.metadata?.status || 'Active',
      assetVersion: cmsAsset.metadata?.assetVersion || 'v1',
      checksum: cmsAsset.metadata?.checksum || 'unknown-hash',
    }
  };
}
