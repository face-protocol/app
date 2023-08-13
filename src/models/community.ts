const COMMUNITY_VERIFICATION_APPS = ["X", "WorldID", "Wallet"] as const;
type TCommunityVerificationApps = (typeof COMMUNITY_VERIFICATION_APPS)[number];

type TCommunity = {
  title: string;
  deposit: number;
  requestToApply: TCommunityVerificationApps[];
};

type TCommunityRules = {
  communityAvatarURL: string;
};

export { COMMUNITY_VERIFICATION_APPS };
export type { TCommunityRules, TCommunity, TCommunityVerificationApps };
