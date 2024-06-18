const { vars } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
const TEST_ACCOUNT_KEY = vars.get("TEST_ACCOUNT_KEY");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.24",

    networks: {
        camptestnet: {
            url: "https://rpc.camp-network-testnet.gelato.digital",
            chainId: 325000,
            accounts: [
                TEST_ACCOUNT_KEY
            ]
        }
    }
};