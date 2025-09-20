import { ScrollText, Code, Coins } from "lucide-react";

const scrollTasks = [
  {
    id: 1,
    icon: Code,
    task: "Smart Contract Audit",
    reward: "2.5 ETH",
    delay: "0s"
  },
  {
    id: 2,
    icon: ScrollText,
    task: "Whitepaper Review",
    reward: "1.2 ETH",
    delay: "1s"
  },
  {
    id: 3,
    icon: Coins,
    task: "Token Economics",
    reward: "3.0 ETH",
    delay: "2s"
  }
];

const FloatingScrolls = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none overflow-hidden h-32">
      {scrollTasks.map((scroll, index) => {
        const Icon = scroll.icon;
        return (
          <div
            key={scroll.id}
            className="absolute bottom-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-deep animate-float-scroll hover:shadow-glow-cyan transition-all pointer-events-auto cursor-pointer group"
            style={{
              left: `${20 + index * 30}%`,
              animationDelay: scroll.delay,
              animationDuration: `${3 + index * 0.5}s`
            }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Icon className="w-5 h-5 text-neon-cyan group-hover:text-neon-purple transition-colors" />
              <div>
                <p className="font-semibold text-foreground font-mono">
                  {scroll.task}
                </p>
                <p className="text-xs text-neon-gold font-bold">
                  {scroll.reward}
                </p>
              </div>
            </div>
            
            {/* Encrypted text overlay */}
            <div className="absolute inset-0 bg-gradient-encrypted rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-center">
                <p className="text-xs font-mono text-neon-cyan animate-neon-flicker">
                  01001000 01100101 01101100 01110000
                </p>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Click to decrypt
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingScrolls;