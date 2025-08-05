pragma solidity ^0.8.19;

contract GovernanceProposals {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        address proposer;
        uint256 timestamp;
    }
    
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    
    event ProposalCreated(
        uint256 indexed id,
        string title,
        string description,
        address indexed proposer,
        uint256 timestamp
    );
    
    function createProposal(string memory _title, string memory _description) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        
        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            title: _title,
            description: _description,
            proposer: msg.sender,
            timestamp: block.timestamp
        });
        
        emit ProposalCreated(proposalCount, _title, _description, msg.sender, block.timestamp);
    }
    
    function getProposal(uint256 _id) public view returns (
        uint256 id,
        string memory title,
        string memory description,
        address proposer,
        uint256 timestamp
    ) {
        require(_id > 0 && _id <= proposalCount, "Proposal does not exist");
        Proposal memory proposal = proposals[_id];
        return (proposal.id, proposal.title, proposal.description, proposal.proposer, proposal.timestamp);
    }
    
    function getAllProposals() public view returns (Proposal[] memory) {
        Proposal[] memory allProposals = new Proposal[](proposalCount);
        for (uint256 i = 1; i <= proposalCount; i++) {
            allProposals[i - 1] = proposals[i];
        }
        return allProposals;
    }
}