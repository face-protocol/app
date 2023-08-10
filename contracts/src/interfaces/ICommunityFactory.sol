// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./ICommunity.sol";

interface ICommunityFactory {
    function createCommunity(
        ICommunity.CommunityInfo calldata info
    ) external payable;
}
