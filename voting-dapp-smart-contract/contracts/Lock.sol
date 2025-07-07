// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Voting {
    struct Candidate {
        string namel;
        uint voteCount;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => bool) public voters;
    bool public votingEnded;

    event Voted(address indexed voter, uint candidateIndex);
    event VotingClosed(uint winningCandidatedIndex);

    modifier onlyOwner() {
        require(msg.sender == owner, "only can perform this action");
        _;
    }

    modifier isVotingActive() {
        require(!votingEnded, "voting has ended");
        _;
    }

    constructor(string[] memory candidateNames) {
        owner = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(
                Candidate({namel: candidateNames[i], voteCount: 0})
            );
        }
    }

    function vote(uint candidatesIndex) external isVotingActive {
        require(!voters[msg.sender], "you already voted");
        require(candidatesIndex < candidates.length, "invalid cadidates");

        voters[msg.sender] = true;
        candidates[candidatesIndex].voteCount++;

        emit Voted(msg.sender, candidatesIndex);
    }

    function endVoting() external onlyOwner isVotingActive {
        votingEnded = true;
        uint winningCandidate = 0;

        for (uint i = 1; i < candidates.length; i++) {
            if (
                candidates[i].voteCount > candidates[winningCandidate].voteCount
            ) {
                winningCandidate = i;
            }
        }

        emit VotingClosed(winningCandidate);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }
}
