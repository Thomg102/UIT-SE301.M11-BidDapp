var HDWalletProvider = require("@truffle/hdwallet-provider");
const { MNEMONIC, ETHERSCAN } = require('./config/config.json');
const DEV_NODE = "http://127.0.0.1:8545";
const MAINNET_NODE = "https://mainnet.infura.io/v3/8fff0467522e427c82005a501600f44c";
const ROPSTEN_NODE = "https://ropsten.infura.io/v3/8fff0467522e427c82005a501600f44c";
const RINKEBY_NODE = "https://rinkeby.infura.io/v3/8fff0467522e427c82005a501600f44c";
const GOERLI_NODE = "https://goerli.infura.io/v3/8fff0467522e427c82005a501600f44c";
const KOVAN_NODE = "https://kovan.infura.io/v3/8fff0467522e427c82005a501600f44c";

module.exports =
{
  contracts_directory: "./price-contracts",
  migrations_directory: "./price-migrations",
  plugins: [
    "truffle-plugin-verify"
  ],
  api_keys: {
    etherscan: ETHERSCAN
  },
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", 		// Match any network id,
      gasPrice: 1000000000, 	// 8 Gwei
    },
    localost: {
      provider: () => new HDWalletProvider(MNEMONIC, DEV_NODE),
      network_id: "7777",
      gas: 7700000,
      gasPrice: 20000000000, // 8 Gwei
      skipDryRun: true,
    },
    mainnet: {
      provider: () => new HDWalletProvider(MNEMONIC, MAINNET_NODE),
      network_id: '1',
      gasPrice: 8000000000, // 8 Gwei
    },
    ropsten: {
      provider: () => new HDWalletProvider(MNEMONIC, ROPSTEN_NODE),
      network_id: '3',
      gasPrice: 8000000000, // 8 Gwei
    },
    rinkeby: {
      provider: () => new HDWalletProvider(MNEMONIC, RINKEBY_NODE),
      network_id: '4',
      gasPrice: 8000000000, // 8 Gwei
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, GOERLI_NODE),
      network_id: '5',
      gasPrice: 8000000000, // 8 Gwei
      confirmations: 1,
      skipDryRun: true,
    },
    kovan: {
      provider: () => new HDWalletProvider(MNEMONIC, KOVAN_NODE),
      network_id: '42',
      gasPrice: 8000000000, // 8 Gwei
      confirmations: 1,
      skipDryRun: true,
    }
  },
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: false,
          runs: 200
        }
      }
    }
  },
  mocha: {
    enableTimeouts: false
  }
};
