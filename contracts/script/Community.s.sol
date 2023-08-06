// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "../src/Community.sol";
import "../src/SBT.sol";

contract CommunityScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address mainAddress = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
        address[] memory proposersAndExecutor;
        proposersAndExecutor[0] = mainAddress;

        address[] memory initialOwners;
        initialOwners[0] = mainAddress;

        TimelockController timelockController = new TimelockController(0 days, proposersAndExecutor, proposersAndExecutor);

        Community community = new Community(timelockController, initialOwners);

        vm.stopBroadcast();
    }
}
