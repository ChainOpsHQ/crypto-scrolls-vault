import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'YOUR_WALLET_CONNECT_PROJECT_ID';

export const config = getDefaultConfig({
  appName: 'Crypto Scrolls Vault',
  projectId,
  chains: [sepolia],
  ssr: false,
});

export const chains = [sepolia];
