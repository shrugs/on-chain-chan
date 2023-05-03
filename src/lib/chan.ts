import { ethers } from "ethers";
import { OnChainChanABI } from "./OnChainChan.sol";
import { getProvider } from "@wagmi/core";
import { CHAN_ADDRESS, CHAN_CHAIN_ID } from "./constants";

export const getChan = () =>
  new ethers.Contract(
    CHAN_ADDRESS[CHAN_CHAIN_ID],
    OnChainChanABI,
    getProvider({ chainId: CHAN_CHAIN_ID })
  );
