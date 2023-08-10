import { TCommunity } from "./models";
import { TProfile } from "./models/profile";

const COMMUNITY_MOCK: TCommunity = {
  title: "Stanford",
  requestToApply: ["X", "WorldID", "Wallet"],
  deposit: 0.05,
};

const USER_MOCK_1: TProfile = {
  avatarSrc:
    "https://www.figma.com/file/fRMbvf8LOjJl04ouEJb3ZE/Untitled?type=design&node-id=1-4822&mode=dev",
  name: "Guy",
  reputation: 0.014,
};

const USER_MOCK_2: TProfile = {
  avatarSrc:
    "https://www.figma.com/file/fRMbvf8LOjJl04ouEJb3ZE/Untitled?type=design&node-id=1-4828&mode=dev",
  name: "Avichal",
  reputation: 1,
};

const USERS_MOCK: TProfile[] = [USER_MOCK_1, USER_MOCK_2];

export { USERS_MOCK, COMMUNITY_MOCK };
