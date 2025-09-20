import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { parseEther } from 'viem';

const CONTRACT_ADDRESS = process.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

const CONTRACT_ABI = [
  {
    "inputs": [{"name": "_verifier", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "bountyId", "type": "uint256"},
      {"indexed": true, "name": "creator", "type": "address"},
      {"indexed": false, "name": "title", "type": "string"}
    ],
    "name": "BountyCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "solutionId", "type": "uint256"},
      {"indexed": true, "name": "bountyId", "type": "uint256"},
      {"indexed": true, "name": "solver", "type": "address"}
    ],
    "name": "SolutionSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "name": "bountyId", "type": "uint256"},
      {"indexed": true, "name": "solver", "type": "address"},
      {"indexed": false, "name": "reward", "type": "uint32"}
    ],
    "name": "BountyCompleted",
    "type": "event"
  },
  {
    "inputs": [
      {"name": "_title", "type": "string"},
      {"name": "_description", "type": "string"},
      {"name": "_reward", "type": "uint32"},
      {"name": "_difficulty", "type": "uint32"},
      {"name": "_isEncrypted", "type": "bool"},
      {"name": "_deadline", "type": "uint256"}
    ],
    "name": "createBounty",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "bountyId", "type": "uint256"},
      {"name": "quality", "type": "uint32"},
      {"name": "isAnonymous", "type": "bool"},
      {"name": "solutionHash", "type": "string"}
    ],
    "name": "submitSolution",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "solutionId", "type": "uint256"},
      {"name": "isAccepted", "type": "bool"}
    ],
    "name": "acceptSolution",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "bountyId", "type": "uint256"}],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "bountyId", "type": "uint256"}],
    "name": "getBountyInfo",
    "outputs": [
      {"name": "title", "type": "string"},
      {"name": "description", "type": "string"},
      {"name": "reward", "type": "uint32"},
      {"name": "difficulty", "type": "uint32"},
      {"name": "applicantCount", "type": "uint32"},
      {"name": "isActive", "type": "bool"},
      {"name": "isCompleted", "type": "bool"},
      {"name": "isEncrypted", "type": "bool"},
      {"name": "creator", "type": "address"},
      {"name": "deadline", "type": "uint256"},
      {"name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveBounties",
    "outputs": [{"name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserReputation",
    "outputs": [
      {"name": "reputation", "type": "uint32"},
      {"name": "completedBounties", "type": "uint32"},
      {"name": "totalEarnings", "type": "uint32"},
      {"name": "isVerified", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const useCryptoScrollsVault = () => {
  const { address } = useAccount();
  
  const contract = useContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
  });

  // Read functions
  const { data: activeBounties, refetch: refetchActiveBounties } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getActiveBounties',
  });

  const { data: userReputation } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getUserReputation',
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  // Write functions
  const { writeAsync: createBounty } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'createBounty',
  });

  const { writeAsync: submitSolution } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'submitSolution',
  });

  const { writeAsync: acceptSolution } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'acceptSolution',
  });

  const { writeAsync: claimReward } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'claimReward',
  });

  // Helper functions
  const createBountyWithReward = async (
    title: string,
    description: string,
    reward: number,
    difficulty: number,
    isEncrypted: boolean,
    deadline: number
  ) => {
    if (!createBounty) throw new Error('Contract not initialized');
    
    return await createBounty({
      args: [title, description, reward, difficulty, isEncrypted, deadline],
    });
  };

  const submitSolutionForBounty = async (
    bountyId: number,
    quality: number,
    isAnonymous: boolean,
    solutionHash: string
  ) => {
    if (!submitSolution) throw new Error('Contract not initialized');
    
    return await submitSolution({
      args: [bountyId, quality, isAnonymous, solutionHash],
    });
  };

  const acceptSolutionForBounty = async (
    solutionId: number,
    isAccepted: boolean
  ) => {
    if (!acceptSolution) throw new Error('Contract not initialized');
    
    return await acceptSolution({
      args: [solutionId, isAccepted],
    });
  };

  const claimRewardForBounty = async (bountyId: number) => {
    if (!claimReward) throw new Error('Contract not initialized');
    
    return await claimReward({
      args: [bountyId],
    });
  };

  const getBountyInfo = async (bountyId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    
    return await contract.read.getBountyInfo([bountyId]);
  };

  return {
    // Data
    activeBounties: activeBounties as number[] | undefined,
    userReputation,
    
    // Actions
    createBountyWithReward,
    submitSolutionForBounty,
    acceptSolutionForBounty,
    claimRewardForBounty,
    getBountyInfo,
    refetchActiveBounties,
    
    // Contract
    contract,
    contractAddress: CONTRACT_ADDRESS,
  };
};
