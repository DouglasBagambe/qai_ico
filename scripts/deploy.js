/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/deploy.js
const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance:",
    (await ethers.provider.getBalance(deployer.address)).toString()
  );

  // Deploy QSE Token
  const QSEToken = await ethers.getContractFactory("QSEToken");
  const token = await QSEToken.deploy(deployer.address);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("QSEToken deployed to:", tokenAddress);

  // Set up crowdsale parameters
  const rate = 5000; // 5000 QSE per ETH
  const wallet = deployer.address;
  const startTime = Math.floor(Date.now() / 1000) + 60;
  const endTime = startTime + 30 * 24 * 60 * 60;
  const minPurchase = ethers.parseEther("0.01");
  const maxPurchase = ethers.parseEther("10");

  // Deploy QSE Crowdsale
  const QSECrowdsale = await ethers.getContractFactory("QSECrowdsale");
  const crowdsale = await QSECrowdsale.deploy(
    rate,
    wallet,
    tokenAddress,
    startTime,
    endTime,
    minPurchase,
    maxPurchase
  );
  await crowdsale.waitForDeployment();
  const crowdsaleAddress = await crowdsale.getAddress();
  console.log("QSECrowdsale deployed to:", crowdsaleAddress);

  // Transfer (not approve) tokens to crowdsale
  const transferAmount = ethers.parseUnits("300000000", 18);
  await token.transfer(crowdsaleAddress, transferAmount);
  console.log("Transferred 300M QSE to crowdsale");

  // Save contract addresses
  const contractAddresses = {
    tokenAddress,
    crowdsaleAddress,
    network: hre.network.name,
  };
  fs.writeFileSync(
    "contract-addresses.json",
    JSON.stringify(contractAddresses, null, 2)
  );
  console.log("Contract addresses saved to contract-addresses.json");

  // Create .env.local for Next.js
  const envContent = `NEXT_PUBLIC_QSE_TOKEN_ADDRESS=${tokenAddress}\nNEXT_PUBLIC_QSE_CROWDSALE_ADDRESS=${crowdsaleAddress}`;
  fs.writeFileSync(".env.local", envContent);
  console.log("Environment variables saved to .env.local");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
