# Governance Proposals dApp - Local Setup Instructions

This project is a governance dApp that allows creating and viewing proposals on the blockchain using Hardhat local network.

## 🚀 Quick Setup

### 1. Install dependencies
```bash
yarn install
```

### 2. Start Hardhat local network
```bash
yarn hardhat node
```
> ⚠️ **Important**: Keep this terminal open. The local network must be running for the dApp to work.

### 3. Deploy the contract (in another terminal)
```bash
yarn hardhat run scripts/deploy.ts --network localhost
```

### 4. Start the frontend
```bash
yarn dev
```

### 5. Configure MetaMask
1. Install MetaMask if you don't have it
2. Add Hardhat local network:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH

3. Import a test account using one of these private keys:
   ```
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

## 📱 Using the dApp

1. Open http://localhost:3000
2. Click "Connect Wallet"
3. MetaMask will ask to connect and switch to local network
4. You can now create and view proposals!

## 🔧 Technical Information

- **Contract**: `contracts/proposal.sol`
- **Contract Address**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **Network**: Hardhat Local (localhost:8545)
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Web3 Library**: Ethers.js v6

## 📋 Features

- ✅ Connect wallet (MetaMask)
- ✅ Create new proposals
- ✅ View all proposals
- ✅ Show proposer details and timestamp
- ✅ Responsive interface with Tailwind CSS

## 🧪 Testing

To test contract functions directly:

```bash
yarn hardhat console --network localhost
```

Then in the console:
```javascript
const contract = await ethers.getContractAt("GovernanceProposals", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
await contract.createProposal("Test Proposal", "This is a test proposal");
await contract.getAllProposals();
```

## 🔍 Troubleshooting

### Error: "Make sure you are connected to Hardhat local network"
- Verify that `yarn hardhat node` is running
- Make sure you're on "Hardhat Local" network in MetaMask
- Refresh the page

### Error: "Transaction reverted"
- Verify you have ETH in your account (Hardhat accounts come pre-funded)
- Make sure the contract is deployed correctly

### Error: "Contract not found"
- Re-deploy the contract: `yarn hardhat run scripts/deploy.ts --network localhost`
- Verify the contract address matches in `app/page.tsx`

## 🎯 Challenge Completed

This project meets all requirements:

1. ✅ **Frontend**: Next.js + TypeScript + simple interface
2. ✅ **Smart Contract**: Solidity with functions to create and get proposals
3. ✅ **Integration**: Ethers.js connecting frontend with contract
4. ✅ **Test network**: Hardhat local (free and fast)
5. ✅ **Full functionality**: Read and write to contract

**Estimated setup time**: ~5 minutes ⚡