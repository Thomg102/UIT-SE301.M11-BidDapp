require("dotenv").config();
const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
//
// const fs = require('fs');
const mnemonic = process.env.MNEMONIC;

module.exports = {
    contracts_build_directory: path.join(__dirname, "../client/src/contracts"),
    networks: {
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, process.env.WSS_RINKEBY),
            network_id: 4, 
            gas: 8500000, 
            confirmations: 2, 
            timeoutBlocks: 50000, 
            skipDryRun: true, 
            networkCheckTimeout: 999999,
            websocket: true,
        },
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: "0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
            // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
            settings: {          // See the solidity docs for advice about optimization and evmVersion
                optimizer: {
                    enabled: false,
                    runs: 200
                },
            //  evmVersion: "byzantium"
            }
        }
    },

};