'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import Header from '../components/Header';
import WalletConnect from '../components/WalletConnect';
import ProposalForm from '../components/ProposalForm';
import ProposalList from '../components/ProposalList';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      }
    ],
    "name": "createProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllProposals",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "proposer",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct GovernanceProposals.Proposal[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proposalCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

interface Proposal {
  id: bigint;
  title: string;
  description: string;
  proposer: string;
  timestamp: bigint;
}

export default function Home() {
  const [account, setAccount] = useState<string>('');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setConnected(true);
        
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7A69' }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x7A69',
                  chainName: 'Hardhat Local',
                  rpcUrls: ['http://127.0.0.1:8545'],
                  nativeCurrency: {
                    name: 'ETH',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                },
              ],
            });
          }
        }
        
        loadProposals();
      } else if (typeof window.ethereum !== 'undefined') {
        alert('Please use MetaMask for this dApp. Disable other wallets like Phantom temporarily.');
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const loadProposals = async () => {
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const proposalList = await contract.getAllProposals();
      setProposals(proposalList);
    } catch (error) {
      console.error('Error loading proposals:', error);
    }
  };

  const createProposal = async (title: string, description: string) => {
    setLoading(true);
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      const tx = await contract.createProposal(title, description);
      await tx.wait();
      
      loadProposals();
    } catch (error) {
      console.error('Error creating proposal:', error);
      alert('Error creating proposal. Make sure you are connected to Hardhat local network.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Header />

        {!connected ? (
          <WalletConnect onConnect={connectWallet} />
        ) : (
          <div className="space-y-8">
            <ProposalForm 
              account={account} 
              onSubmit={createProposal} 
              loading={loading} 
            />
            <ProposalList proposals={proposals} />
          </div>
        )}
      </div>
    </div>
  );
}