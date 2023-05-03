import type { Address } from "@wagmi/core";
import { goerli, optimism } from "@wagmi/core/chains";

export const WALLET_CONNECT_PROJECT_ID = "4336afa13407587d1063f9be259e37c0";

export const CHAN_CHAIN_ID =
  process.env.NODE_ENV === "development" ? goerli.id : optimism.id;

export const CHAN_ADDRESS: Record<number, Address> = {
  [goerli.id]: "0x1fc509d7637773e7039c0606e02f7fa137449272",
};
