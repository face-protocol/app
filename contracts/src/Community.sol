// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "./interfaces/ICommunity.sol";

contract Community is ERC721Upgradeable, ICommunity {
    // STORAGE

    string public rulesURI;

    uint256 public membershipDeposit;

    uint256 public membershipVotesThreshold;

    mapping(address => Application) public applications;

    // CONSTRUCTOR AND INITIALIZER

    constructor() {
        _disableInitializers();
    }

    function initialize(
        CommunityInfo calldata info
    ) external payable initializer {
        __ERC721_init(info.name, info.symbol);
        rulesURI = info.rulesURI;
        membershipDeposit = info.membershipDeposit;
        membershipVotesThreshold = info.membershipVotesThreshold;
    }

    // PUBLIC FUNCTIONS

    /// @notice Function used to apply to community
    function applyForMembership(string calldata dataURI) external payable {}

    /// @notice Function for community members to approve acceptance of new member to community
    function approve(address applicant) external {}

    /// @notice Function to delegate reputation to other member
    function delegateReputation(address member, uint256 amount) external {}

    /// @notice Function to revoke reputation delegation from member
    function revokeReputation(address member) external {}

    // PUBLIC VIEW FUNCTIONS

    function reputationOf(address member) external view returns (uint256) {}
}
