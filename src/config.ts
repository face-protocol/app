import {
  baseGoerli,
  optimismGoerli,
  zoraTestnet,
  modeTestnet,
} from "wagmi/chains";

const DEFAULT_CHAIN_ID = optimismGoerli.id;

type TContracts = {
  [key in string]: {
    [key in number]: `0x${string}`;
  };
};
const CONTRACTS: TContracts = {
  TOPIC: {
    [optimismGoerli.id]:
      "0x0875d6307b468f8deacd6a2e7c7a161f8ad13d9379838fa5c87b1df86b8fd9e9",
    [zoraTestnet.id]:
      "0x0875d6307b468f8deacd6a2e7c7a161f8ad13d9379838fa5c87b1df86b8fd9e9",
    [baseGoerli.id]:
      "0x0875d6307b468f8deacd6a2e7c7a161f8ad13d9379838fa5c87b1df86b8fd9e9",
    [modeTestnet.id]:
      "0x0875d6307b468f8deacd6a2e7c7a161f8ad13d9379838fa5c87b1df86b8fd9e9",
  },
  COMMUNITY: {
    [optimismGoerli.id]: "0x1f6fe24d1ae85d66cfc9391176163fd2bf495d73",
    [zoraTestnet.id]: "0x8176E84744FaFD7f3a9b497339563D8F55829ffb",
    [baseGoerli.id]: "0x8176E84744FaFD7f3a9b497339563D8F55829ffb",
    [modeTestnet.id]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
  FACTORY: {
    [optimismGoerli.id]: "0x7E51bd255C405CB65855aC25dd578EC922501211",
    [zoraTestnet.id]: "0x963a68D8a57E8E863Cd4E6411B7321988280465f",
    [baseGoerli.id]: "0x963a68D8a57E8E863Cd4E6411B7321988280465f",
    [modeTestnet.id]: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  },
} as const;

export { DEFAULT_CHAIN_ID, CONTRACTS, optimismGoerli };
