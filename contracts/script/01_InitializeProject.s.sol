// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "forge-std/Script.sol";
import "../src/Community.sol";

contract InitializeProjectScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address mainAddress = 0xcEB32EaB871B033223a86f0248Ba86cAeeB3BCA3;
        address[] memory proposersAndExecutor = new address[](1);
        proposersAndExecutor[0] = mainAddress;

        address[] memory initialOwners = new address[](1);
        initialOwners[0] = mainAddress;

        Community community = new Community(initialOwners);

        vm.stopBroadcast();
    }
}
