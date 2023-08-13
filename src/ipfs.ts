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

type TIpfsFile = {
  path: string;
  content: any;
};

const uploadToIpfs = async (files: TIpfsFile[]) => {
  return Moralis.EvmApi.ipfs.uploadFolder({
    abi: files,
  });
};

export type { TIpfsFile };
export { uploadToIpfs };
