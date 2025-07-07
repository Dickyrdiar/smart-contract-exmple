const hre = require('hardhat');
const { ethers } = hre;

async function main() {
  const candidateNames = ['alice', 'bob', 'charlie'];

  const [deployer] = await ethers.getSigners();
  const balanceBefore = await deployer.provider.getBalance(deployer.address);

  console.log("Deploying contract with account:", deployer.address);
  console.log("Balance before deployment:", ethers.formatEther(balanceBefore), "ETH");

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(candidateNames);
  await voting.waitForDeployment();

  const balanceAfter = await deployer.provider.getBalance(deployer.address);
  const gasUsed = balanceBefore - balanceAfter;

  console.log(`
  =============================================
    Voting contract successfully deployed!
    
    Address: ${await voting.getAddress()}
    Network: ${hre.network.name}
    Candidates: ${candidateNames.join(', ')}

    Deployer Wallet: ${deployer.address}
    Balance Before: ${ethers.formatEther(balanceBefore)} ETH
    Balance After : ${ethers.formatEther(balanceAfter)} ETH
    Gas Used      : ${ethers.formatEther(gasUsed)} ETH
  =============================================
  `);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
