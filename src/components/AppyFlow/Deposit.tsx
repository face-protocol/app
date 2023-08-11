import { useAccount, useBalance } from "wagmi";
import { Heading, Select } from "../../ui";
import { TFlowProps } from "./types";

function Deposit(props: TFlowProps) {
  const { deposit } = props.community;

  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });

  return (
    <>
      <Heading.H1>Final step! Deposit {deposit} ETH</Heading.H1>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div>
            The deposit will be used to give reputation to another community
            member.
          </div>
          {/* Will support in the future */}
          <div className="flex items-center gap-[14px]">
            <Select>Ethereum</Select>
            <Select>ETH</Select>
          </div>
        </div>
        {data && (
          <div>
            Balance {Number(data.formatted).toFixed(4)} {data.symbol}
          </div>
        )}
      </div>
    </>
  );
}

export { Deposit };
