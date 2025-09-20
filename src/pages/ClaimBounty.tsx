import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, FileText, Coins, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockBountyData = {
  "0x1a2b3c": {
    title: "DeFi Protocol Security Audit",
    reward: "5.2 ETH",
    difficulty: "Expert" as const,
    timeLeft: "3d 12h"
  },
  "0x7g8h9i": {
    title: "Frontend dApp Development",
    reward: "3.5 ETH", 
    difficulty: "Medium" as const,
    timeLeft: "7d 4h"
  },
  "0xm4n5o6": {
    title: "Token Economics Design",
    reward: "4.1 ETH",
    difficulty: "Hard" as const,
    timeLeft: "6d 2h"
  }
};

const ClaimBounty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    experience: "",
    approach: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bounty = id ? mockBountyData[id as keyof typeof mockBountyData] : null;

  if (!bounty) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Bounty Not Found</h1>
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Application Submitted Successfully!",
      description: "Your bounty claim has been submitted for review. You'll be notified within 24 hours.",
    });

    setIsSubmitting(false);
    navigate(`/details/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/details/${id}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Claim Bounty</h1>
            <p className="text-muted-foreground">
              Submit your application to claim this bounty. Make sure to provide detailed information about your qualifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-cyber border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-foreground">Application Form</h2>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-foreground">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="mt-1 bg-background/50 border-border/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="mt-1 bg-background/50 border-border/50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="portfolio" className="text-foreground">Portfolio/Website</Label>
                      <Input
                        id="portfolio"
                        value={formData.portfolio}
                        onChange={(e) => handleInputChange("portfolio", e.target.value)}
                        placeholder="https://your-portfolio.com"
                        className="mt-1 bg-background/50 border-border/50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience" className="text-foreground">Relevant Experience *</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        required
                        rows={4}
                        placeholder="Describe your relevant experience and qualifications..."
                        className="mt-1 bg-background/50 border-border/50 resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="approach" className="text-foreground">Your Approach *</Label>
                      <Textarea
                        id="approach"
                        value={formData.approach}
                        onChange={(e) => handleInputChange("approach", e.target.value)}
                        required
                        rows={4}
                        placeholder="Explain how you plan to approach this task..."
                        className="mt-1 bg-background/50 border-border/50 resize-none"
                      />
                    </div>

                    <div>
                      <Label htmlFor="timeline" className="text-foreground">Estimated Timeline *</Label>
                      <Input
                        id="timeline"
                        value={formData.timeline}
                        onChange={(e) => handleInputChange("timeline", e.target.value)}
                        required
                        placeholder="e.g., 5-7 business days"
                        className="mt-1 bg-background/50 border-border/50"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-foreground">Supporting Documents</Label>
                      <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-neon-cyan/50 transition-colors">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground text-sm">
                          Drop files here or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, DOC, or image files up to 10MB
                        </p>
                      </div>
                    </div>

                    <div className="bg-card/30 border border-border/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-neon-gold flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">Important Notice</p>
                          <p>
                            By submitting this application, you agree to complete the work according to the specifications. 
                            Payment will be released upon successful delivery and approval.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full shadow-glow-gold hover:shadow-glow-gold"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-background border-t-transparent rounded-full animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Bounty Summary */}
            <div>
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <h3 className="font-semibold text-foreground">Bounty Summary</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">{bounty.title}</h4>
                    <Badge className={getDifficultyColor(bounty.difficulty)}>
                      {bounty.difficulty}
                    </Badge>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reward</span>
                      <div className="flex items-center gap-1 text-neon-gold">
                        <Coins className="w-4 h-4" />
                        <span className="font-bold font-mono">{bounty.reward}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Time Left</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono text-foreground">{bounty.timeLeft}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <FileText className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <p>
                        Review the bounty details carefully before submitting your application. 
                        All requirements must be met for payment approval.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimBounty;