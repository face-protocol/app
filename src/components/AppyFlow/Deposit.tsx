import { Heading } from "../../ui";
import { TFlowProps } from "./types";

function Deposit(props: TFlowProps) {
  const { deposit } = props.community;
  return (
    <>
      <Heading.H1>Final step! Deposit {deposit} ETH</Heading.H1>
      <div className="flex h-full justify-between">
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export { Deposit };
