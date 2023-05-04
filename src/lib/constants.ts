import type { Address } from "@wagmi/core";
import { goerli, optimism, type Chain } from "@wagmi/core/chains";

export const WALLET_CONNECT_PROJECT_ID = "4336afa13407587d1063f9be259e37c0";

export const CHAN_CHAIN: Chain =
  process.env.NODE_ENV === "development" ? goerli : optimism;

const CHAN_ADDRESSES: Record<number, Address> = {
  [optimism.id]: "0x7AB2947592C280542e680Ba8f08A589009da8644",
  [goerli.id]: "0x1fc509d7637773e7039c0606e02f7fa137449272",
};

export const CHAN_ADDRESS = CHAN_ADDRESSES[CHAN_CHAIN.id];
