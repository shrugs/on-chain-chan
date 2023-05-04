import { AssetId, AssetType } from "caip";

export function getAssetTypeFromParams(params: Record<string, string>) {
  return new AssetType({
    chainId: params.chainId,
    assetName: params.assetNamespace,
  });
}

export function getAssetIdFromParams(params: Record<string, string>) {
  return new AssetId({
    chainId: params.chainId,
    assetName: params.assetNamespace,
    tokenId: params.tokenId,
  });
}
