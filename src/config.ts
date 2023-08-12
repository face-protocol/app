import { optimismGoerli } from "wagmi/chains";

const DEFAULT_CHAIN_ID = optimismGoerli.id;

type TContracts = {
  [key in string]: {
    [key in number]: `0x${string}`;
  };
};
const CONTRACTS: TContracts = {
  COMMUNITY: {
    [optimismGoerli.id]: "0x1f6fe24d1ae85d66cfc9391176163fd2bf495d73",
  },
  FACTORY: {
    [optimismGoerli.id]: "0x963a68D8a57E8E863Cd4E6411B7321988280465f",
  },
} as const;

export { DEFAULT_CHAIN_ID, CONTRACTS, optimismGoerli };
