# Vercel Deployment Guide for Crypto Scrolls Vault

This guide provides step-by-step instructions for deploying the Crypto Scrolls Vault application to Vercel.

## Prerequisites

- GitHub account
- Vercel account
- Deployed smart contract address (optional for initial deployment)

## Step-by-Step Deployment

### 1. Fork the Repository

1. Go to [https://github.com/ChainOpsHQ/crypto-scrolls-vault](https://github.com/ChainOpsHQ/crypto-scrolls-vault)
2. Click the "Fork" button in the top-right corner
3. Select your GitHub account as the destination
4. Wait for the fork to complete

### 2. Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import the forked repository: `your-username/crypto-scrolls-vault`

### 3. Configure Project Settings

#### Framework Preset
- **Framework**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```env
# Network Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration (Add after contract deployment)
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
```

### 4. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your application will be available at `https://your-project-name.vercel.app`

### 5. Custom Domain (Optional)

1. Go to your project dashboard in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed by Vercel

## Environment Variables Configuration

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_CHAIN_ID` | `11155111` | Sepolia testnet chain ID |
| `NEXT_PUBLIC_RPC_URL` | `https://sepolia.infura.io/v3/YOUR_INFURA_KEY` | RPC endpoint for Sepolia |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | `YOUR_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID |

### Optional Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_INFURA_API_KEY` | `YOUR_INFURA_API_KEY` | Infura API key for additional RPC |
| `VITE_CONTRACT_ADDRESS` | `0x...` | Deployed smart contract address |

## Smart Contract Deployment

### 1. Deploy to Sepolia Testnet

```bash
# Install dependencies
npm install -g @nomicfoundation/hardhat-toolbox

# Deploy contract
npx hardhat run scripts/deploy.js --network sepolia
```

### 2. Update Environment Variables

After contract deployment, update the `VITE_CONTRACT_ADDRESS` variable in Vercel with the deployed contract address.

## Troubleshooting

### Common Issues

#### Build Failures
- **Issue**: Build fails with dependency errors
- **Solution**: Ensure all dependencies are properly installed and compatible versions are used

#### Wallet Connection Issues
- **Issue**: Wallet connection not working
- **Solution**: Verify `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` is correctly set

#### Contract Interaction Issues
- **Issue**: Contract calls failing
- **Solution**: Verify `VITE_CONTRACT_ADDRESS` is set and contract is deployed

#### RPC Connection Issues
- **Issue**: Network connection errors
- **Solution**: Check `NEXT_PUBLIC_RPC_URL` and ensure RPC endpoint is accessible

### Performance Optimization

1. **Enable Vercel Analytics**: Monitor performance and user behavior
2. **Configure Caching**: Set appropriate cache headers for static assets
3. **Optimize Images**: Use Vercel's image optimization features
4. **Enable Edge Functions**: For better global performance

## Security Considerations

### Environment Variables
- Never commit sensitive keys to version control
- Use Vercel's environment variable encryption
- Rotate API keys regularly

### Smart Contract Security
- Deploy to testnet first for testing
- Audit contract code before mainnet deployment
- Use multi-signature wallets for contract ownership

## Monitoring and Analytics

### Vercel Analytics
1. Enable Vercel Analytics in project settings
2. Monitor page views, performance metrics
3. Set up alerts for errors and performance issues

### Custom Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor smart contract events
- Track user engagement metrics

## Updates and Maintenance

### Automatic Deployments
- Vercel automatically deploys on every push to main branch
- Use feature branches for testing before merging
- Set up preview deployments for pull requests

### Manual Updates
1. Make changes to your forked repository
2. Push changes to GitHub
3. Vercel will automatically trigger a new deployment
4. Monitor deployment status in Vercel dashboard

## Support

- **Vercel Documentation**: [https://vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: [https://github.com/ChainOpsHQ/crypto-scrolls-vault/issues](https://github.com/ChainOpsHQ/crypto-scrolls-vault/issues)
- **Project Documentation**: See README.md for detailed project information

---

**Deployment Status**: ✅ Ready for Production
**Last Updated**: January 2025
**Maintainer**: ChainOpsHQ
