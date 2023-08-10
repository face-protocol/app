import { TCommunity } from "../models";
import { TProfile } from "../models/profile";

import avatarGuy from "./assets/avatar_guy.png";
import avatarAvichal from "./assets/avatar_avichal.png";

const COMMUNITY_MOCK: TCommunity = {
  title: "Stanford",
  requestToApply: ["X", "WorldID", "Wallet"],
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

const USERS_MOCK: TProfile[] = [USER_MOCK_1, USER_MOCK_2];

export { USERS_MOCK, COMMUNITY_MOCK };
