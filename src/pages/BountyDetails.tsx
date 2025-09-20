import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, Coins, Lock, Shield, FileText, User, Calendar } from "lucide-react";

const mockBountyDetails = {
  "0x1a2b3c": {
    id: "0x1a2b3c",
    title: "DeFi Protocol Security Audit",
    reward: "5.2 ETH",
    difficulty: "Expert" as const,
    timeLeft: "3d 12h",
    applicants: 7,
    isEncrypted: false,
    description: "We are seeking an experienced security auditor to conduct a comprehensive audit of our new DeFi lending protocol. The protocol implements innovative yield farming mechanisms and requires thorough security analysis.",
    requirements: [
      "5+ years experience in smart contract auditing",
      "Deep understanding of DeFi protocols",
      "Familiarity with Solidity and common vulnerabilities",
      "Previous audit reports portfolio"
    ],
    deliverables: [
      "Complete security audit report",
      "Vulnerability assessment with severity ratings",
      "Recommendations for improvements",
      "Code review documentation"
    ],
    createdBy: "DeFiVault Protocol",
    createdDate: "2024-01-15",
    deadline: "2024-01-25"
  },
  "0x7g8h9i": {
    id: "0x7g8h9i",
    title: "Frontend dApp Development",
    reward: "3.5 ETH",
    difficulty: "Medium" as const,
    timeLeft: "7d 4h",
    applicants: 23,
    isEncrypted: false,
    description: "Build a modern, responsive React-based frontend for our decentralized voting system. The interface should be intuitive and support Web3 wallet integration.",
    requirements: [
      "3+ years React development experience",
      "Web3 integration expertise",
      "Modern UI/UX design skills",
      "TypeScript proficiency"
    ],
    deliverables: [
      "Complete React application",
      "Web3 wallet integration",
      "Responsive design implementation",
      "Documentation and deployment guide"
    ],
    createdBy: "VoteChain DAO",
    createdDate: "2024-01-10",
    deadline: "2024-01-28"
  },
  "0xm4n5o6": {
    id: "0xm4n5o6",
    title: "Token Economics Design",
    reward: "4.1 ETH",
    difficulty: "Hard" as const,
    timeLeft: "6d 2h",
    applicants: 9,
    isEncrypted: false,
    description: "Design comprehensive tokenomics for our GameFi project. Need expertise in game theory, sustainable token models, and player incentive mechanisms.",
    requirements: [
      "Game theory and economics background",
      "TokenomICS design experience",
      "GameFi project knowledge",
      "Mathematical modeling skills"
    ],
    deliverables: [
      "Complete tokenomics whitepaper",
      "Economic model simulations",
      "Token distribution strategy",
      "Sustainability analysis"
    ],
    createdBy: "PlayToEarn Studios",
    createdDate: "2024-01-12",
    deadline: "2024-01-30"
  }
};

const BountyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEncryptedWarning, setShowEncryptedWarning] = useState(false);

  const bounty = id ? mockBountyDetails[id as keyof typeof mockBountyDetails] : null;

  if (!bounty) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Bounty Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested bounty does not exist or has been removed.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bounties
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-cyber-green text-background";
      case "Medium": return "bg-neon-cyan text-background";
      case "Hard": return "bg-neon-purple text-foreground";
      case "Expert": return "bg-neon-gold text-background";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleClaimBounty = () => {
    if (bounty.isEncrypted) {
      setShowEncryptedWarning(true);
      return;
    }
    navigate(`/claim/${bounty.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bounties
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-cyber border-border/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {bounty.isEncrypted ? "████████████████████" : bounty.title}
                    </h1>
                    <p className="text-sm text-muted-foreground font-mono">
                      Bounty ID: {bounty.id}
                    </p>
                  </div>
                  <Badge className={getDifficultyColor(bounty.difficulty)}>
                    {bounty.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-6 p-4 bg-card/30 rounded-lg border border-border/30">
                  <div className="flex items-center gap-2 text-neon-gold">
                    <Coins className="w-5 h-5" />
                    <span className="font-bold font-mono text-lg">{bounty.reward}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">{bounty.timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="font-mono">{bounty.applicants} applicants</span>
                  </div>
                </div>

                {bounty.isEncrypted ? (
                  <div className="space-y-4 p-6 bg-gradient-encrypted rounded-lg border border-neon-purple/30">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-neon-purple mx-auto mb-4 animate-glow-pulse" />
                      <h3 className="text-xl font-semibold text-neon-purple mb-2">Encrypted Bounty</h3>
                      <p className="text-muted-foreground">
                        This bounty's details are encrypted. Connect your wallet to decrypt and view the full description.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted/20 rounded animate-pulse" />
                      <div className="h-4 bg-muted/20 rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-muted/20 rounded animate-pulse w-1/2" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Description
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {bounty.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Requirements
                      </h3>
                      <ul className="space-y-2">
                        {bounty.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-2 h-2 bg-neon-cyan rounded-full mt-2 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Deliverables
                      </h3>
                      <ul className="space-y-2">
                        {bounty.deliverables.map((deliverable, index) => (
                          <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-2 h-2 bg-neon-gold rounded-full mt-2 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <h3 className="font-semibold text-foreground">Bounty Information</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Created by</p>
                    <p className="font-medium text-foreground">{bounty.createdBy}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="font-medium text-foreground">{bounty.deadline}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {/* Add contact functionality */}}
                  >
                    Contact Creator
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Button 
                  onClick={handleClaimBounty}
                  className="w-full shadow-glow-gold hover:shadow-glow-gold"
                  disabled={bounty.isEncrypted}
                >
                  {bounty.isEncrypted ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Decrypt to Claim
                    </>
                  ) : (
                    "Claim Bounty"
                  )}
                </Button>
                
                {showEncryptedWarning && (
                  <p className="text-xs text-neon-purple mt-2 text-center">
                    Connect wallet to decrypt this bounty
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountyDetails;