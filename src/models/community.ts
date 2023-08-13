const COMMUNITY_VERIFICATION_APPS = ["X", "WorldID", "Wallet"] as const;
type TCommunityVerificationApps = (typeof COMMUNITY_VERIFICATION_APPS)[number];

type TCommunity = {
  title: string;
  deposit: number;
  requestToApply: TCommunityVerificationApps[];
};

type TCommunityRules = {
  communityAvatarURL: string;
  countOfApprovals: number;
};

type TUserData = {
  avatarSrc: string;
  name: string;
  address: string;
};

export { COMMUNITY_VERIFICATION_APPS };
export type {
  TUserData,
  TCommunityRules,
  TCommunity,
  TCommunityVerificationApps,
};
