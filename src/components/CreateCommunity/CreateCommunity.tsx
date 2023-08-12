import { COMMUNITY_VERIFICATION_APPS } from "../../models";
import { Heading } from "../../ui";

function CreateCommunity() {
  return (
    <>
      <Heading.H1>Create a community</Heading.H1>
      <div className="mt-10">
        <div>Community name</div>
        <div className="mt-2">
          <input
            className="rounded-md bg-white/25 p-1 text-white placeholder:text-white/40"
            placeholder="YC Alumni"
          />
        </div>

        <div className="mt-6 font-semibold">Community rules</div>

        <div className="mt-3">
          <div>Deposit amount</div>
          <div className="mt-2">
            <input
              className="rounded-md bg-white/25 p-1 text-white placeholder:text-white/40"
              placeholder="0.01 ETH"
            />
          </div>
        </div>

        <div className="mt-6">
          <div>How many people should accept a new member?</div>
          <div className="mt-2">
            <input
              className="rounded-md bg-white/25 p-1 text-white placeholder:text-white/40"
              placeholder="3"
              defaultValue={3}
              type="number"
            />
          </div>
        </div>

        <div className="mt-6">
          <div>Link to community logo</div>
          <div className="mt-2">
            <input
              className="rounded-md bg-white/25 p-1 text-white placeholder:text-white/40"
              placeholder="https://"
            />
          </div>
        </div>

        <div className="mt-6">
          <div>
            What data should an application to join a community include? <br />
            (Choose at least two)
          </div>
          <div className="mt-2">
            {COMMUNITY_VERIFICATION_APPS.map((id) => (
              <div key={id} className="flex justify-between">
                <p className="flex gap-2">
                  <div></div>
                  <div className="font-medium">{id}</div>
                </p>
                <div className="font-medium text-attention">
                  <button className="hover:opacity-80">add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export { CreateCommunity };
