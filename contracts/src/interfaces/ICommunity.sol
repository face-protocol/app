// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";

interface ICommunity is IERC721Upgradeable {
    // INITIALIZER

    struct CommunityInfo {
        string name;
        string symbol;
        string rulesURI;
        uint256 membershipDeposit;
        uint256 membershipVotesThreshold;
    }

    function initialize(CommunityInfo calldata info) external payable;

    // PUBLIC FUNCTIONS
    /// @notice Function used to apply to community
    function applyForMembership(string calldata dataURI) external payable;

    /// @notice Function for community members to approve acceptance of new member to community
    function approve(address applicant) external;

    /// @notice Function to delegate reputation to other member
    function delegateReputation(address member, uint256 amount) external;

    /// @notice Function to revoke reputation delegation from member
    function revokeReputation(address member) external;

    // PUBLIC VIEW FUNCTIONS

    function rulesURI() external view returns (string memory);

    function membershipDeposit() external view returns (uint256);

    function membershipVotesThreshold() external view returns (uint256);

    function reputationOf(address member) external view returns (uint256);

    struct Application {
        string dataURI;
        uint256 blockNumber;
        uint256 votesFor;
        address[] initialMembers;
    }
}
