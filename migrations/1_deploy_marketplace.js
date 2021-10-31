const MarketPlace = artifacts.require("MarketPlace");
const fs = require("fs");
const path = require('path');
const configFile = '../client/config/config.json';
const config = require(configFile);

module.exports = async (deployer)=> {

  console.log();
  console.log('Deploying MarketPlace...')
  await deployer.deploy(MarketPlace);

  const MarketPlaceInstance = await MarketPlace.deployed();

  config.MARKETPLACE_ADDR = MarketPlaceInstance.address;
  fs.writeFileSync(path.join(__dirname,  configFile), JSON.stringify(config, null, 2));
};
