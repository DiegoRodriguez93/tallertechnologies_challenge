require('dotenv').config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address)));

  const GovernanceProposals = await hre.ethers.getContractFactory("GovernanceProposals");
  const governanceProposals = await GovernanceProposals.deploy();

  await governanceProposals.waitForDeployment();

  console.log(
    `GovernanceProposals deployed to ${await governanceProposals.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});