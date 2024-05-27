require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { API_URL, PRIVATE_KEY1 } = process.env;

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: API_URL,
      //accounts: [`0x${PRIVATE_KEY1}`]
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};