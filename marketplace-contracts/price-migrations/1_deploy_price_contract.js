const PriceContract = artifacts.require('ChainLinkPrice')
const fs = require("fs");
const path = require('path');
const configFile = '../config/config.json';
const config = require(configFile);

module.exports = async function (deployer, network, accounts) {
  	//============================
    // Deploy Price Contract
    //============================
    console.log();
    console.log('Deploying Price Contract...')
    await deployer.deploy(PriceContract, 
      "0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8", 
      "0xa36085F69e2889c224210F603D836748e7dC0088",
      "100000000000000000"
    );

    const PriceInstance = await PriceContract.deployed();

    const address = PriceInstance.address;
    config.PRICE = address;
    fs.writeFileSync(path.join(__dirname,  configFile), JSON.stringify(config, null, 2));
};
