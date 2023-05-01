export const OnChainChanABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "topic",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string",
      },
    ],
    name: "Post",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "topic",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
    ],
    name: "post",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
