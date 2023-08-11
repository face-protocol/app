// SPDX-License-Identifier: MIT

pragma solidity 0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./interfaces/ICommunity.sol";
import "./interfaces/ICommunityFactory.sol";

contract CommunityFactory is Ownable, ICommunityFactory {
    using Clones for address;

    // STORAGE

    /// @notice Address of the Community implementation
    address public communityImplementation;

    /// @notice Address of the protocol treasurty
    address public treasury;

    // EVENTS

    /// @notice Event emitted on creation of new community
    event NewCommunity(address community);

    /// @notice Event emitted on treasury update
    event TreasuryUpdate(address newTreasury);

    // CONSTRUCTOR

    /// @notice Contract constructor
    constructor(address _communityImplementation, address _treasury) {
        communityImplementation = _communityImplementation;
        treasury = _treasury;
    }

    // PUBLIC FUNCTIONS

    /// @notice Function used to set up a new community
    function createCommunity(
        ICommunity.CommunityInfo calldata info
    ) external payable {
        // Instantiate and initialize community
        address community = communityImplementation.clone();
        ICommunity(community).initialize(info);

        // Emit event
        emit NewCommunity(community);
    }

    function setTreasury(address newTreasury) external onlyOwner {
        // Update treasury
        treasury = newTreasury;

        // Emit event
        emit TreasuryUpdate(newTreasury);
    }
}
