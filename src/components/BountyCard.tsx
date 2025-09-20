import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Lock, Coins, Clock, Users } from "lucide-react";

interface BountyCardProps {
  id: string;
  title: string;
  reward: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  timeLeft: string;
  applicants: number;
  isEncrypted: boolean;
  preview?: string;
}

const BountyCard = ({ 
  id, 
  title, 
  reward, 
  difficulty, 
  timeLeft, 
  applicants, 
  isEncrypted,
  preview 
}: BountyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-cyber-green text-background";
      case "Medium": return "bg-neon-cyan text-background";
      case "Hard": return "bg-neon-purple text-foreground";
      case "Expert": return "bg-neon-gold text-background";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card 
      className={`relative overflow-hidden bg-gradient-cyber border-border/50 backdrop-blur-sm transition-all duration-300 hover:shadow-glow-cyan hover:border-neon-cyan/50 group ${
        isHovered ? "animate-encrypt-reveal" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Encrypted overlay */}
      {isEncrypted && (
        <div className="absolute inset-0 bg-gradient-encrypted animate-pulse z-10 flex items-center justify-center">
          <div className="text-center">
            <Lock className="w-8 h-8 text-neon-cyan mx-auto mb-2 animate-glow-pulse" />
            <p className="text-xs font-mono text-muted-foreground">
              Connect wallet to decrypt
            </p>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-neon-cyan transition-colors">
              {isEncrypted ? "████████████" : title}
            </h3>
            <p className="text-sm text-muted-foreground font-mono">
              ID: {id}
            </p>
          </div>
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-3">
        {isEncrypted ? (
          <div className="space-y-2">
            <div className="h-4 bg-muted/30 rounded animate-pulse" />
            <div className="h-4 bg-muted/30 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-muted/30 rounded animate-pulse w-1/2" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {preview || "Detailed task description available after claiming..."}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="font-mono">{timeLeft}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span className="font-mono">{applicants}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-neon-gold">
            <Coins className="w-4 h-4" />
            <span className="font-bold font-mono">{reward}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 border-neon-cyan/30 hover:border-neon-cyan hover:shadow-glow-cyan transition-all"
            onClick={() => navigate(`/details/${id}`)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isEncrypted ? "Decrypt" : "View Details"}
          </Button>
          <Button 
            size="sm"
            className="flex-1 shadow-glow-gold hover:shadow-glow-gold transition-all"
            disabled={isEncrypted}
            onClick={() => navigate(`/claim/${id}`)}
          >
            Claim Bounty
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BountyCard;