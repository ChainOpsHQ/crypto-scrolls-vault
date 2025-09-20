import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BountyCard from "@/components/BountyCard";
import FloatingScrolls from "@/components/FloatingScrolls";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, TrendingUp, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockBounties = [
  {
    id: "0x1a2b3c",
    title: "DeFi Protocol Security Audit",
    reward: "5.2 ETH",
    difficulty: "Expert" as const,
    timeLeft: "3d 12h",
    applicants: 7,
    isEncrypted: false,
    preview: "Comprehensive security audit for a new DeFi lending protocol. Looking for experienced auditors familiar with Solidity smart contracts."
  },
  {
    id: "0x4d5e6f",
    title: "█████████████████",
    reward: "2.8 ETH",
    difficulty: "Hard" as const,
    timeLeft: "5d 8h",
    applicants: 12,
    isEncrypted: true
  },
  {
    id: "0x7g8h9i",
    title: "Frontend dApp Development",
    reward: "3.5 ETH",
    difficulty: "Medium" as const,
    timeLeft: "7d 4h",
    applicants: 23,
    isEncrypted: false,
    preview: "Build a React-based frontend for a decentralized voting system. Requires experience with Web3 integration and modern UI frameworks."
  },
  {
    id: "0xj1k2l3",
    title: "█████████████████",
    reward: "8.7 ETH",
    difficulty: "Expert" as const,
    timeLeft: "2d 16h",
    applicants: 3,
    isEncrypted: true
  },
  {
    id: "0xm4n5o6",
    title: "Token Economics Design",
    reward: "4.1 ETH",
    difficulty: "Hard" as const,
    timeLeft: "6d 2h",
    applicants: 9,
    isEncrypted: false,
    preview: "Design tokenomics for a new GameFi project. Need expertise in game theory, economics, and sustainable token models."
  },
  {
    id: "0xp7q8r9",
    title: "█████████████████",
    reward: "1.9 ETH",
    difficulty: "Easy" as const,
    timeLeft: "4d 20h",
    applicants: 31,
    isEncrypted: true
  }
];

const Index = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBounties, setFilteredBounties] = useState(mockBounties);

  useEffect(() => {
    let filtered = mockBounties;
    
    if (filter !== "all") {
      filtered = filtered.filter(bounty => 
        filter === "encrypted" ? bounty.isEncrypted : bounty.difficulty.toLowerCase() === filter
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(bounty => 
        bounty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bounty.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredBounties(filtered);
  }, [filter, searchTerm]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">Encrypted</span>{" "}
            <span className="text-neon-cyan animate-neon-flicker">Bounties</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete tasks without revealing your identity. Get paid fairly without competition seeing your work.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm px-4 py-2 bg-cyber-green/20 text-cyber-green border-cyber-green/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              24 Active Bounties
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2 bg-neon-gold/20 text-neon-gold border-neon-gold/30">
              <Zap className="w-4 h-4 mr-2" />
              127.3 ETH Total Rewards
            </Badge>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search bounties or task IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border/50 font-mono"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filter === "encrypted" ? "default" : "outline"}
              onClick={() => setFilter("encrypted")}
              size="sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              Encrypted
            </Button>
            <Button
              variant={filter === "easy" ? "default" : "outline"}
              onClick={() => setFilter("easy")}
              size="sm"
            >
              Easy
            </Button>
            <Button
              variant={filter === "medium" ? "default" : "outline"}
              onClick={() => setFilter("medium")}
              size="sm"
            >
              Medium
            </Button>
            <Button
              variant={filter === "hard" ? "default" : "outline"}
              onClick={() => setFilter("hard")}
              size="sm"
            >
              Hard
            </Button>
            <Button
              variant={filter === "expert" ? "default" : "outline"}
              onClick={() => setFilter("expert")}
              size="sm"
            >
              Expert
            </Button>
          </div>
        </div>

        {/* Bounty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBounties.map((bounty) => (
            <BountyCard key={bounty.id} {...bounty} />
          ))}
        </div>

        {filteredBounties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              No bounties match your current filters
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setFilter("all");
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      <FloatingScrolls />
    </div>
  );
};

export default Index;
