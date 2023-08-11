// SPDX-License-Identifier: MIT

pragma solidity 0.8.21;

import "./ICommunity.sol";

interface ICommunityFactory {
    /// @notice Function used to set up a new community
    function createCommunity(
        ICommunity.CommunityInfo calldata info
    ) external payable;

    /// @notice Address of the protocol treasurty
    function treasury() external view returns (address);
}
