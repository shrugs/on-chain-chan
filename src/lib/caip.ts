import { AssetId } from "caip";

export function getAssetIdFromLocation(location: string) {
  return new AssetId(location.slice(1));
}

export function getAssetIdFromParams(params: Record<string, string>) {
  return new AssetId({
    chainId: params.chainId,
    assetName: params.assetNamespace,
    tokenId: params.tokenId,
  });
}
