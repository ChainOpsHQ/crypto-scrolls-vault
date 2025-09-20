const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying CryptoScrollsVault contract...");

  // Get the contract factory
  const CryptoScrollsVault = await ethers.getContractFactory("CryptoScrollsVault");
  
  // Deploy the contract with a verifier address (you can use your own address)
  const verifier = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  const cryptoScrollsVault = await CryptoScrollsVault.deploy(verifier);

  await cryptoScrollsVault.waitForDeployment();

  const contractAddress = await cryptoScrollsVault.getAddress();
  
  console.log("CryptoScrollsVault deployed to:", contractAddress);
  console.log("Contract owner:", await cryptoScrollsVault.owner());
  console.log("Contract verifier:", await cryptoScrollsVault.verifier());
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    network: network.name,
    timestamp: new Date().toISOString(),
    verifier: verifier
  };
  
  console.log("\nDeployment completed successfully!");
  console.log("Contract Address:", contractAddress);
  console.log("\nNext steps:");
  console.log("1. Update VITE_CONTRACT_ADDRESS in your environment variables");
  console.log("2. Verify the contract on Etherscan");
  console.log("3. Test the contract functions");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
