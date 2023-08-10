// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./interfaces/ICommunity.sol";
import "./interfaces/ICommunityFactory.sol";

contract CommunityFactory is ICommunityFactory {
    // PUBLIC FUNCTIONS

    function createCommunity(
        ICommunity.CommunityInfo calldata info
    ) external payable {}
}
