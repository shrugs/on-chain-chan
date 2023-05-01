import { AssetId } from "caip";

export function getAssetIdFromLocation(location: string) {
  return new AssetId(location.slice(1));
}
