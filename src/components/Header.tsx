import { WalletConnect } from "@/components/WalletConnect";
import { Shield, Map } from "lucide-react";
import { useAccount } from "wagmi";
import treasureMapLogo from "@/assets/treasure-map-logo.jpg";

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={treasureMapLogo} 
                alt="Treasure Map Logo" 
                className="w-12 h-12 rounded-lg shadow-glow-cyan animate-glow-pulse"
              />
              <Map className="absolute -top-1 -right-1 w-4 h-4 text-neon-cyan animate-neon-flicker" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Confidential<span className="text-neon-cyan">DAO</span>
              </h1>
              <p className="text-sm font-mono text-muted-foreground">
                Work in Privacy. Get Paid Fairly.
              </p>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-neon-purple" />
              <span className="font-mono">
                {isConnected ? "Secure Connection" : "Anonymous Mode"}
              </span>
            </div>
            
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;