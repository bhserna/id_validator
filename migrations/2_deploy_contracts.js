var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Validator = artifacts.require("./Validator.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin, Validator);
  deployer.deploy(MetaCoin);
  deployer.deploy(Validator);
};
