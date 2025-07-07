const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let voting;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(["Alice", "Bob"]);
    await voting.waitForDeployed(); // Changed from waitForDeployment() to deployed()
  });

  describe("Deployment", function () {
    it("Should deploy with correct candidates", async function () {
      const candidates = await voting.getCandidates();
      // Changed from candidates[0].name to candidates[0].namel to match your contract
      expect(candidates[0].namel).to.equal("Alice");
      expect(candidates[1].namel).to.equal("Bob");
    });
  });

  describe("Voting Functionality", function () {
    it("Should allow voting", async function () {
      await voting.connect(addr1).vote(0);
      const candidates = await voting.getCandidates();
      expect(candidates[0].voteCount).to.equal(1);
    });

    it("Should prevent double voting", async function () {
      await voting.connect(addr1).vote(0);
      // Changed error message to match your contract's exact message
      await expect(voting.connect(addr1).vote(0))
        .to.be.revertedWith("you already voted");
    });

    it("Should prevent voting for invalid candidates", async function () {
      await expect(voting.connect(addr1).vote(99))
        .to.be.revertedWith("invalid cadidates");
    });
  });
});