// import { createHelia } from "helia";
// import { json } from "@helia/json";

// const initializeHelia = async () => {
//   const HELIA = await createHelia();

//   const HELIA_JSON = json(HELIA);

//   return { HELIA, HELIA_JSON };
// };

// const { HELIA, HELIA_JSON } = await initializeHelia();

// export { HELIA, HELIA_JSON };

import Moralis from "moralis";
import { CONTRACTS } from "./config";
import { communityABI } from "./generated";
import { TUserData } from "./models";

type TIpfsFile = {
  path: string;
  content: any;
};

Moralis.start({
  apiKey: import.meta.env.VITE_STORAGE_API_KEY,
});

const uploadToIpfs = async (files: TIpfsFile[]) => {
  return Moralis.EvmApi.ipfs.uploadFolder({
    abi: files,
  });
};

const uploadUserData = async (
  userData: TUserData,
  contractAddress: string,
  address: string,
) => {
  const filesPath = `${contractAddress}/${address}.json`;
  const data: TIpfsFile[] = [
    {
      path: filesPath,
      content: userData,
    },
  ];
  const response = await uploadToIpfs(data);
  const { path } = response.result[0];
  return path;
};

const fetchAllEvents = (address: string, chaind: number) => {
  return Moralis.EvmApi.events.getContractEvents({
    address,
    topic: CONTRACTS.TOPIC[chaind],
    abi: {
      type: "event",
      anonymous: false,
      inputs: [
        {
          name: "member",
          internalType: "address",
          type: "address",
          indexed: false,
        },
        {
          name: "tokenId",
          internalType: "uint256",
          type: "uint256",
          indexed: false,
        },
      ],
      name: "NewMembership",
    },
  });
};

export type { TIpfsFile };
export { fetchAllEvents, uploadUserData, uploadToIpfs };
