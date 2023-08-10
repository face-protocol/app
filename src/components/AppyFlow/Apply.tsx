import { COMMUNITY_MOCK } from "../../mocks";
import { Heading } from "../../ui";

function Apply() {
  const { title, requestToApply } = COMMUNITY_MOCK;

  return (
    <section className="flex flex-col gap-10">
      <Heading.H1>To apply to {title} community, you need:</Heading.H1>
      <div className="flex flex-col gap-3">
        {requestToApply.map((item) => (
          <div key={item} className="flex justify-between">
            <p>{item}</p>
            <div className="text-attention font-medium">
              <button>connect</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export { Apply };
