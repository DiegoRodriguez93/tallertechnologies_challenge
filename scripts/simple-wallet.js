const { ethers } = require('ethers');

async function main() {
  // Generate a random wallet
  const wallet = ethers.Wallet.createRandom();
  
  console.log("New wallet generated:");
  console.log("Address:", wallet.address);
  console.log("Private Key:", wallet.privateKey);
  console.log("Mnemonic:", wallet.mnemonic?.phrase);
  
  console.log("\n⚠️  IMPORTANT: Save this information securely!");
  console.log("You'll need to:");
  console.log("1. Add the private key to your .env file");
  console.log("2. Get Sepolia ETH from a faucet for this address");
}

main().catch(console.error);