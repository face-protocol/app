type TCommunityVerificationApps = "X" | "WorldID" | "Wallet";

type TCommunity = {
  title: string;
  deposit: number;
  requestToApply: TCommunityVerificationApps[];
};

export type { TCommunity, TCommunityVerificationApps };
