import { createHelia } from "helia";
import { json } from "@helia/json";

const HELIA = await createHelia();

const HELIA_JSON = json(HELIA);

export { HELIA, HELIA_JSON };
