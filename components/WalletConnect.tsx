'use client';

interface WalletConnectProps {
  onConnect: () => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  return (
    <div className="text-center">
      <button
        onClick={onConnect}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
      >
        Connect Wallet
      </button>
      <p className="text-sm text-gray-500 mt-4">
        Make sure you have MetaMask installed and disable other wallets like Phantom
      </p>
    </div>
  );
}