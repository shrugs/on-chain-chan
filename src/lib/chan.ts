import { ethers } from "ethers";
import { OnChainChanABI } from "./OnChainChan.sol";
import { getProvider } from "@wagmi/core";
import { CHAN_ADDRESS, CHAN_CHAIN } from "./constants";

export const getChanProvider = () => getProvider({ chainId: CHAN_CHAIN.id });

export const getChan = () =>
  new ethers.Contract(CHAN_ADDRESS, OnChainChanABI, getChanProvider());
