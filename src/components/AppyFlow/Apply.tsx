import { COMMUNITY_MOCK } from "../../mocks";
import { Button, Heading } from "../../ui";

function Apply() {
  const { title, requestToApply } = COMMUNITY_MOCK;

  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex h-full w-full flex-col gap-10 md:max-h-[400px]">
        <Heading.H1>To apply to {title} community, you need:</Heading.H1>
        <div className="flex flex-col gap-3">
          {requestToApply.map((item) => (
            <div key={item} className="flex justify-between">
              <p className="flex gap-2">
                <div></div>
                <div className="font-medium">{item}</div>
              </p>
              <div className="font-medium text-attention">
                <button>connect</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button>Continue</Button>
      </div>
    </section>
  );
}

export { Apply };
