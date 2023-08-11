import { optimismGoerli } from "wagmi/chains";

const DEFAULT_CHAIN_ID = optimismGoerli.id;

type TContracts = {
  [key in string]: {
    [key in number]: `0x${string}`;
  };
};
const CONTRACTS: TContracts = {
  COMMUNITY: {
    // 0x963a68d8a57e8e863cd4e6411b7321988280465f
    // 0x8176e84744fafd7f3a9b497339563d8f55829ffb
    [optimismGoerli.id]: "0x8176e84744fafd7f3a9b497339563d8f55829ffb",
  },
};

export { DEFAULT_CHAIN_ID, CONTRACTS, optimismGoerli };
