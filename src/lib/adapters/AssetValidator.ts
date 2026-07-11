import { AdaptedAsset } from '../types/viewer';

export class AssetValidator {
  static validate(asset: AdaptedAsset | null): { isValid: boolean; reason?: string } {
    if (!asset) return { isValid: false, reason: 'Asset payload is null' };
    if (!asset.sourceUrl) return { isValid: false, reason: 'Missing source URL' };
    
    // Check type constraints
    const validTypes = ['GLB', 'SVG', 'PDF', 'Image', 'Video'];
    if (!validTypes.includes(asset.type)) {
      return { isValid: false, reason: `Unsupported asset type: ${asset.type}` };
    }

    // Check capabilities array exists
    if (!Array.isArray(asset.capabilities)) {
      return { isValid: false, reason: 'Capabilities must be an array' };
    }

    // Verify metadata presence
    if (!asset.metadata || !asset.metadata.checksum || !asset.metadata.assetVersion) {
      console.warn(`Asset ${asset.id} is missing strict metadata checksums. Cache invalidation may fail.`);
    }

    return { isValid: true };
  }
}
