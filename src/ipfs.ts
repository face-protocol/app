import { createHelia } from "helia";
import { json } from "@helia/json";

const initializeHelia = async () => {
  console.log("test");
  const HELIA = await createHelia();

  const HELIA_JSON = json(HELIA);

  return { HELIA, HELIA_JSON };
};

const { HELIA, HELIA_JSON } = await initializeHelia();

export { HELIA, HELIA_JSON };
