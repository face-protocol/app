import { optimismGoerli } from "wagmi/dist/chains";

const DEFAULT_CHAIN_ID = optimismGoerli.id;

type TContracts = {
  [key in string]: {
    [key in number]: `0x${string}`;
  };
};
const CONTRACTS: TContracts = {
  COMMUNITY: {
    [optimismGoerli.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
};

export { DEFAULT_CHAIN_ID, CONTRACTS, optimismGoerli };
