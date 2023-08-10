import { TProfile } from "../models/profile";

type TProfileType = "friend" | "member";

type TProfileProps = {
  profile: TProfile;
  action: React.ReactNode;
  type: TProfileType;
  community: {
    title: string;
    src?: string;
  };
};

function Profile(props: TProfileProps) {
  const { profile, action } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div>
          <img
            width={40}
            height={40}
            className="rounded-[20px]"
            src={profile.avatarSrc}
          />
        </div>
        <div className="flex flex-col">
          <div>
            <div className="text-white">{profile.name}</div>
            <div className="text-gray-600">
              Reputation {profile.reputation} ETH
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div>{action}</div>
    </div>
  );
}

export { Profile };
