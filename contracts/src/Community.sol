// SPDX-License-Identifier: MIT

pragma solidity 0.8.21;

import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Checkpoints.sol";
import "./interfaces/ICommunity.sol";
import "./interfaces/ICommunityFactory.sol";

contract Community is ERC721Upgradeable, ICommunity {
    using AddressUpgradeable for address payable;
    using Checkpoints for Checkpoints.Trace224;

    // CONSTANTS

    /// @notice Protocol fee value (numerator)
    uint256 public constant PROTOCOL_FEE = 100;

    /// @notice Shares (fees and thresholds) denominator
    uint256 public constant DENOMINATOR = 1000;

    // STORAGE

    ICommunityFactory public factory;

    string public rulesURI;

    uint256 public membershipDeposit;

    uint256 public membershipVotesThreshold;

    uint256 public votingDuration;

    struct Application {
        string dataURI;
        uint256 blockNumber;
        uint256 votesFor;
    }

    mapping(address => Application) public applications;

    mapping(address => mapping(address => bool)) public hasVoted;

    mapping(address => uint256) public unusedDepositOf;

    uint256 public nextTokenId;

    mapping(address => mapping(address => uint256)) public delegatedFromTo;

    mapping(address => Checkpoints.Trace224) private _delegateCheckpoints;

    Checkpoints.Trace224 private _totalCheckpoints;

    // EVENTS

    /// @notice Event emitted on new application
    event NewApplication(address applicant, string dataURI);

    /// @notice Event emitted on membership application approval by one of the members
    event ApplicatonApproval(address approver, address applicant);

    /// @notice Event emitted on new membership start
    event NewMembership(address member, uint256 tokenId);

    /// @notice Event emitted on deposit withdrawal
    event DepositWithdrawal(address applicant);

    /// @notice Event emitted on member reputation change
    event MemberReputationChange(
        address account,
        uint256 oldValue,
        uint256 newValue
    );

    /// @notice Event emitted on total reputation change
    event TotalReputationChange(uint256 oldValue, uint256 newValue);

    // MODIFIERS

    modifier onlyMember() {
        require(balanceOf(msg.sender) > 0, "Community: sender is not a member");
        _;
    }

    // CONSTRUCTOR AND INITIALIZER

    constructor() {
        _disableInitializers();
    }

    function initialize(
        CommunityInfo calldata info
    ) external payable initializer {
        // Check for correct deposit
        require(
            msg.value == info.membershipDeposit * info.initialMembers.length,
            "Community: incorrect deposit"
        );

        // Initialize ERC721
        __ERC721_init(info.name, info.symbol);

        // Transfer fees
        uint256 fee = (info.membershipDeposit * PROTOCOL_FEE) / DENOMINATOR;
        ICommunityFactory _factory = ICommunityFactory(msg.sender);
        payable(_factory.treasury()).sendValue(
            fee * info.initialMembers.length
        );

        // Create initial memberships
        require(
            info.initialMembers.length == info.initialMembersDatas.length,
            "Community: length mismatch"
        );
        for (uint256 i = 0; i < info.initialMembers.length; i++) {
            // Set datas
            address member = info.initialMembers[i];
            applications[member].dataURI = info.initialMembersDatas[i];

            // Accrue deposit
            unusedDepositOf[member] += info.membershipDeposit - fee;

            // Mint SBT
            _mint(member, i);

            // Emit event
            emit NewMembership(member, i);
        }
        nextTokenId = info.initialMembers.length;

        // Setup other values
        factory = _factory;
        rulesURI = info.rulesURI;
        membershipDeposit = info.membershipDeposit;
        membershipVotesThreshold = info.membershipVotesThreshold;
        votingDuration = info.votingDuration;
    }

    // PUBLIC FUNCTIONS

    /// @notice Function used to apply to community
    function applyForMembership(string calldata dataURI) external payable {
        // Check that sender isn't a member already
        require(balanceOf(msg.sender) == 0, "Community: already a member");

        // Check that sender hasn't yet applied
        require(
            applications[msg.sender].blockNumber == 0,
            "Community: already applied"
        );

        // Check that deposit is correct
        require(msg.value == membershipDeposit, "Community: incorrect deposit");

        // Transfer protocol fee
        uint256 fee = (msg.value * PROTOCOL_FEE) / DENOMINATOR;
        payable(factory.treasury()).sendValue(fee);

        // Accrue deposit
        unusedDepositOf[msg.sender] += msg.value - fee;

        // Save application
        applications[msg.sender] = Application({
            dataURI: dataURI,
            blockNumber: block.number,
            votesFor: 0
        });

        // Emit event
        emit NewApplication(msg.sender, dataURI);
    }

    /// @notice Function for community members to approve acceptance of new member to community
    function approveMembership(address applicant) external onlyMember {
        // Check that applicant isn't a member already
        require(balanceOf(applicant) == 0, "Community: already a member");

        // Check that applicant exists
        uint256 applicationBlock = applications[applicant].blockNumber;
        require(applicationBlock != 0, "Community: applicant does not exist");

        // Check that voting has started (next block after application)
        require(
            clock() > applicationBlock,
            "Community: voting has not started yet"
        );

        // Check that voting has not finished yet
        require(
            clock() <= applicationBlock + votingDuration,
            "Community: voting has finished"
        );

        // Check that sender has not voted yet
        require(!hasVoted[msg.sender][applicant], "Community: already voted");

        // Mark sender as voted for application
        hasVoted[msg.sender][applicant] = true;

        // Accrue votes
        applications[applicant].votesFor += pastReputationOf(
            msg.sender,
            applicationBlock
        );

        // Emit event
        emit ApplicatonApproval(msg.sender, applicant);
    }

    /// @notice Function called by new member to start membership after successful vote
    function startMembership() external {
        // Check that applicant isn't a member already
        require(balanceOf(msg.sender) == 0, "Community: already a member");

        // Check that application is successful
        require(
            applications[msg.sender].votesFor >=
                (totalPastReputation(applications[msg.sender].blockNumber) *
                    membershipVotesThreshold) /
                    DENOMINATOR,
            "Community: not enough votes"
        );

        // Mint SBT
        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);

        // Emit event
        emit NewMembership(msg.sender, tokenId);
    }

    /// @notice Function to delegate reputation to other member
    function delegateReputation(
        address member,
        uint256 amount
    ) external onlyMember {
        // Check that amount is positive
        require(amount > 0, "Community: amount should be positive");

        // Check that receiver is member
        require(balanceOf(member) > 0, "Community: receiver is not a member");

        // Check for unused reputation
        require(
            unusedDepositOf[msg.sender] >= amount,
            "Community: not enough unused reputation"
        );

        // Decrease unused reputation
        unusedDepositOf[msg.sender] -= amount;

        // Store delegated amount
        delegatedFromTo[msg.sender][member] = amount;

        // Create user delegation checkpoint and emit event
        (uint256 oldValue, uint256 newValue) = _push(
            _delegateCheckpoints[member],
            _add,
            SafeCast.toUint224(amount)
        );
        emit MemberReputationChange(member, oldValue, newValue);

        // Create total delegation checkpoint and emit event
        (oldValue, newValue) = _push(
            _totalCheckpoints,
            _add,
            SafeCast.toUint224(amount)
        );
        emit TotalReputationChange(oldValue, newValue);
    }

    /// @notice Function to revoke reputation delegation from member
    function revokeReputation(address member) external onlyMember {
        // Check that there is reputation to undelegate
        uint256 amount = delegatedFromTo[msg.sender][member];
        require(amount > 0, "Community: nothing to revoke");

        // Clear delegated amount
        delegatedFromTo[msg.sender][member] = 0;

        // Add unused deposit
        unusedDepositOf[msg.sender] += amount;

        // Create user delegation checkpoint and emit event
        (uint256 oldValue, uint256 newValue) = _push(
            _delegateCheckpoints[member],
            _subtract,
            SafeCast.toUint224(amount)
        );
        emit MemberReputationChange(member, oldValue, newValue);

        // Create total delegation checkpoint and emit event
        (oldValue, newValue) = _push(
            _totalCheckpoints,
            _subtract,
            SafeCast.toUint224(amount)
        );
        emit TotalReputationChange(oldValue, newValue);
    }

    /// @notice Function for protocol team to withdraw unused membership deposit (in case of refusal)
    function withdrawUnusedDeposit(address applicant) external {
        // Check that applicant isn't a member
        require(
            balanceOf(applicant) > 0,
            "Community: can't withdraw member deposits"
        );

        // Check that application voting has finished
        require(
            clock() > applications[applicant].blockNumber + votingDuration,
            "Community: application voting has not finished yet"
        );

        // Check that application has failed
        require(
            applications[applicant].votesFor <
                (totalPastReputation(applications[applicant].blockNumber) *
                    membershipVotesThreshold) /
                    DENOMINATOR,
            "Community: application voting has not failed"
        );

        // Decrease deposit
        uint256 deposit = unusedDepositOf[applicant];
        unusedDepositOf[applicant] = 0;

        // Transfer deposit
        payable(factory.treasury()).sendValue(deposit);

        // Emit event
        emit DepositWithdrawal(applicant);
    }

    // PUBLIC VIEW FUNCTIONS

    function reputationOf(address member) external view returns (uint256) {
        return _delegateCheckpoints[member].latest();
    }

    function pastReputationOf(
        address member,
        uint256 blockNumber
    ) public view returns (uint256) {
        uint48 currentBlock = clock();
        require(blockNumber < currentBlock, "Community: future lookup");
        return
            _delegateCheckpoints[member].upperLookupRecent(
                SafeCast.toUint32(blockNumber)
            );
    }

    function totalReputation() external view returns (uint256) {
        return _totalCheckpoints.latest();
    }

    function totalPastReputation(
        uint256 blockNumber
    ) public view returns (uint256) {
        uint48 currentBlock = clock();
        require(blockNumber < currentBlock, "Community: future lookup");
        return
            _totalCheckpoints.upperLookupRecent(SafeCast.toUint32(blockNumber));
    }

    /// @notice Clock used for flagging checkpoints.
    function clock() public view virtual returns (uint48) {
        return SafeCast.toUint48(block.number);
    }

    /// @notice Machine-readable description of the clock as specified in EIP-6372.
    // solhint-disable-next-line func-name-mixedcase
    function CLOCK_MODE() public view virtual returns (string memory) {
        return "mode=blocknumber&from=default";
    }

    // INTERNAL FUNCTIONS

    function _transfer(address, address, uint256) internal pure override {
        revert("Community: SBT transfer is forbidden");
    }

    function _push(
        Checkpoints.Trace224 storage store,
        function(uint224, uint224) view returns (uint224) op,
        uint224 delta
    ) private returns (uint224, uint224) {
        return
            store.push(SafeCast.toUint32(clock()), op(store.latest(), delta));
    }

    function _add(uint224 a, uint224 b) private pure returns (uint224) {
        return a + b;
    }

    function _subtract(uint224 a, uint224 b) private pure returns (uint224) {
        return a - b;
    }
}
