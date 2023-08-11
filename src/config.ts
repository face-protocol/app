import { optimismGoerli } from "wagmi/chains";

const DEFAULT_CHAIN_ID = optimismGoerli.id;

type TContracts = {
  [key in string]: {
    [key in number]: `0x${string}`;
  };
};
const CONTRACTS: TContracts = {
  COMMUNITY: {
    [optimismGoerli.id]: "0x5D44FbBb92C7916E00d61D4Cf862B4adBc645168",
  },
};

export { DEFAULT_CHAIN_ID, CONTRACTS, optimismGoerli };
