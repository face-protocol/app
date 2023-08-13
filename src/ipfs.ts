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
import { TUserData } from "./models";

type TIpfsFile = {
  path: string;
  content: any;
};

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

export type { TIpfsFile };
export { uploadUserData, uploadToIpfs };
