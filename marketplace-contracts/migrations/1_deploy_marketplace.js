const BinanceUSDToken = artifacts.require("BinanceUSDToken");
// const Art = artifacts.require("Art")
const fs = require("fs");
const path = require('path');
const configFile = '../client/config/config.json';
const config = require(configFile);

module.exports = async (deployer)=> {

  console.log();
  console.log('Deploying Art...')
  // await deployer.deploy(Art);

  // const ArtInstance = await Art.deployed();

  console.log();
  console.log('Deploying MarketPlace...')
  // await deployer.deploy(MarketPlace, ArtInstance.address);
  await deployer.deploy(BinanceUSDToken);

  // const MarketPlaceInstance = await MarketPlace.deployed();

  // config.ART_ADDR = ArtInstance.address;
  // config.MARKETPLACE_ADDR = MarketPlaceInstance.address;
  // fs.writeFileSync(path.join(__dirname,  configFile), JSON.stringify(config, null, 2));
};
