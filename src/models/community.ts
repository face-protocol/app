type TCommunityVerificationApps = "X" | "WorldID" | "Wallet";

type TCommunity = {
  title: string;
  requestToApply: TCommunityVerificationApps[];
};

export type { TCommunity, TCommunityVerificationApps };
