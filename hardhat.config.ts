/* eslint-disable @typescript-eslint/no-require-imports */
// hardhat.config.ts
require("@nomicfoundation/hardhat-toolbox");

const config = {
  solidity: "0.8.20", // Match your contracts
  paths: {
    artifacts: "./app/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};

module.exports = config;
