import { Heading } from "../../ui";
import { ActionButton } from "../../ui/ActionButton";

import aaveSrc from "../assets/aave.svg";
import curveSrc from "../assets/curve.png";

function LendingView() {
  return (
    <section className="flex h-full flex-col gap-3">
      <div className="flex h-full w-full flex-col gap-2 md:max-h-[400px]">
        <Heading.H1>Face Protocol Lending</Heading.H1>
        <div className="mt-10 flex flex-col gap-1">
          <div className="flex gap-1 font-medium text-white">
            <div>Your reputation:</div>
            <div className="text-attention">1.0 ETH</div>
          </div>

          <div className="flex gap-1 font-medium text-white">
            <div>Leverage:</div>
            <div className="text-attention">x4</div>
          </div>

          <div className="flex gap-1 font-medium text-white">
            <div>Balance:</div>
            <div className="text-attention">7000 USDC</div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <img
                  width={40}
                  height={40}
                  className="rounded-[20px]"
                  src={aaveSrc}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <div className="text-white">aave usdc</div>
                  <div className="text-gray-600">apy: 3,65%</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[12px] text-[#F5F5F5]">
                    0 usdc deposited
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ActionButton>deposit</ActionButton>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <img
                  width={40}
                  height={40}
                  className="rounded-[20px]"
                  src={curveSrc}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <div className="text-white">curve 3pool</div>
                  <div className="text-gray-600">apy: 2,35%</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-[12px] text-[#F5F5F5]">
                    1000 usdc deposited
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="font-medium text-red-700 hover:opacity-80">
                withdraw
              </button>
              <ActionButton>deposit</ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LendingView };
