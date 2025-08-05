'use client';

interface Proposal {
  id: bigint;
  title: string;
  description: string;
  proposer: string;
  timestamp: bigint;
}

interface ProposalListProps {
  proposals: Proposal[];
}

export default function ProposalList({ proposals }: ProposalListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">All Proposals</h2>
      {proposals.length === 0 ? (
        <p className="text-gray-500">No proposals yet. Create the first one!</p>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div key={proposal.id.toString()} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{proposal.title}</h3>
                <span className="text-sm text-gray-500">
                  #{proposal.id.toString()}
                </span>
              </div>
              <p className="text-gray-700 mb-3">{proposal.description}</p>
              <div className="text-sm text-gray-500">
                <p>Proposer: <span className="font-mono">{proposal.proposer}</span></p>
                <p>Created: {new Date(Number(proposal.timestamp) * 1000).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}