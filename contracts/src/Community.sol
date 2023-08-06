// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "./SBT.sol";

contract Community is Governor, GovernorSettings, GovernorCountingSimple, GovernorVotes {
  SBT public sbt;

  constructor(address[] memory _initialOwners)
    Governor("Community")
    GovernorSettings(7200 /* 1 day */, 21600 /* 3 day */, 0)
    GovernorVotes(IVotes(address(sbt)))
  {
    sbt = new SBT();

    for (uint i = 0; i < _initialOwners.length; i++) {
      sbt.safeMint(_initialOwners[i], i);
    }
  }

  function quorum(uint256 blockNumber) public pure override returns (uint256) {
    return 0e18;
  }

  function votingDelay()
    public
    view
    override(IGovernor, GovernorSettings)
    returns (uint256)
  {
    return super.votingDelay();
  }

  function votingPeriod()
    public
    view
    override(IGovernor, GovernorSettings)
    returns (uint256)
  {
    return super.votingPeriod();
  }

  function state(uint256 proposalId)
    public
    view
    override(Governor)
    returns (ProposalState)
  {
    return super.state(proposalId);
  }

  function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory description)
    public
    override(Governor)
    returns (uint256)
  {
    return super.propose(targets, values, calldatas, description);
  }

  function proposalThreshold()
    public
    view
    override(Governor, GovernorSettings)
    returns (uint256)
  {
    return super.proposalThreshold();
  }

  function _execute(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
    internal
    override(Governor)
  {
    super._execute(proposalId, targets, values, calldatas, descriptionHash);
  }

  function _cancel(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
    internal
    override(Governor)
    returns (uint256)
  {
    return super._cancel(targets, values, calldatas, descriptionHash);
  }

  function _executor()
    internal
    view
    override(Governor)
    returns (address)
  {
    return super._executor();
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(Governor)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
