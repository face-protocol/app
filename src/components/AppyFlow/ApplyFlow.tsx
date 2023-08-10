import { useApplicationState } from "../../store";
import { Button } from "../../ui";
import { Apply } from "./Apply";

function ApplyFlow() {
  const {} = useApplicationState();

  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex h-full w-full flex-col gap-10 md:max-h-[400px]">
        <Apply />
      </div>

      <div>
        <Button>Continue</Button>
      </div>
    </section>
  );
}

export { ApplyFlow };
