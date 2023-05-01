import { ethers } from "ethers";
import { OnChainChanABI } from "./OnChainChan.sol";
import { getProvider } from "@wagmi/core";
import { optimism } from "@wagmi/core/chains";

export const getChan = () =>
  new ethers.Contract(
    process.env.NODE_ENV === "development"
      ? "0x5fbdb2315678afecb367f032d93f642f64180aa3"
      : null,
    OnChainChanABI,
    process.env.NODE_ENV === "development"
      ? new ethers.providers.JsonRpcProvider()
      : getProvider({ chainId: optimism.id })
  );
