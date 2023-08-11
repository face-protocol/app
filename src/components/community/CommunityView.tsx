import { USERS_MOCK } from "../../mocks/mocks";
import { Heading, Profile } from "../../ui";
import { ActionButton } from "../../ui/ActionButton";

import baseSrc from "../assets/base.png";

const CommunityView = () => {
  const communityMembers = USERS_MOCK;

  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex h-full w-full flex-col gap-2 md:max-h-[400px]">
        <Heading.H1>Stanford community</Heading.H1>

        <div className="mt-10 flex flex-col gap-1">
          <div className="flex gap-1 font-medium text-white">
            <div>Your reputation:</div>
            <div className="text-attention">1.00 ETH</div>
          </div>

          <div className="flex gap-1 font-medium text-white">
            <div>Health rate:</div>
            <div className="text-attention">1.2</div>
            <button className="text-gray-500">manage it</button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <div className="text-[#F5F5F5] ">FAQ</div>
          <div className="flex w-full items-center justify-between">
            <div>How can I improve my reputation?</div>
            <div>
              <ActionButton>read</ActionButton>
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div>How can I leverage my reputation?</div>
            <div>
              <ActionButton>read</ActionButton>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <header className="flex items-center justify-between ">
            <div className="font-semibold">Community members</div>
            <div className="text-gray-500 ">Boosts: 3/5</div>
          </header>
          <main className="flex flex-col gap-3">
            {communityMembers.map((member) => (
              <Profile
                type="member"
                profile={member}
                action={<ActionButton>Boost reputation</ActionButton>}
                community={{ title: "Base", src: baseSrc }}
              />
            ))}
          </main>
        </section>
      </div>
    </section>
  );
};

export { CommunityView };
