import { TCommunity } from "../models";
import { TProfile } from "../models/profile";

import avatarGuy from "./assets/avatar_guy.png";
import avatarAvichal from "./assets/avatar_avichal.png";
import avatarMax from "./assets/avatar_max.jpeg";
import avatarSerafim from "./assets/avatar_serafim.jpeg";

const COMMUNITY_MOCK: TCommunity = {
  title: "Stanford",
  requestToApply: ["WorldID", "Wallet"],
  deposit: 0.05,
};

const USER_MOCK_1: TProfile = {
  avatarSrc: avatarGuy,
  name: "Guy",
  reputation: 0.014,
};

const USER_MOCK_2: TProfile = {
  avatarSrc: avatarAvichal,
  name: "Avichal",
  reputation: 1,
};

const MAX: TProfile = {
  avatarSrc: avatarMax,
  name: "Max",
  reputation: 0.5,
};

const SERAFIM: TProfile = {
  avatarSrc: avatarSerafim,
  name: "Serafim",
  reputation: 0.5,
};

const REQUEST_TO_JOIN = [SERAFIM];

const FULL_LIST = [MAX, SERAFIM];

const USERS_MOCK: TProfile[] = [MAX];

export { USERS_MOCK, COMMUNITY_MOCK, REQUEST_TO_JOIN, FULL_LIST };
