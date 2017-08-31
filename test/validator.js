var Validator = artifacts.require("./Validator.sol");
var User = artifacts.require("./User.sol");

contract('Validator', function(accounts) {
  it("register User", function() {
    var validator, user, userName, userRfc, userRegistrator;

    return Validator.deployed().then(function(instance) {
      validator = instance;
      return validator.registerUser("Benito", "ASD870921R23");
    }).then(function() {
      return validator.getUser.call("Benito", "ASD870921R23");
    }).then(function(userAddress) {
      user = User.at(userAddress);
      return user.getName.call();
    }).then(function(name) {
      userName = name;
      return user.getRfc.call();
    }).then(function(rfc) {
      userRfc = rfc;
      return user.getRegistrator.call();
    }).then(function(registrator) {
      userRegistrator = registrator;
      assert.equal(userName.valueOf(), "Benito", "Should have name");
      assert.equal(userRfc.valueOf(), "ASD870921R23", "Should have RFC");
      assert.equal(userRegistrator.valueOf(), accounts[0], "Should have the registrator");
    });
  });

  it("validate User email", function() {
    var validator;

    return Validator.deployed().then(function(instance) {
      validator = instance;
      return validator.registerUser("Benito", "ASD870921R23");
    }).then(function() {
      return validator.getUser.call("Benito", "ASD870921R23");
    }).then(function(userAddress) {
      return validator.validateUserEmail(userAddress, "bh@example.com");
    }).then(function() {
      return validator.getEmailValidationsForUser.call(userAddress);
    }).then(function(validations) {
      assert.equal(validations.valueOf(), [accounts[0]], "Should return the confirmator id");
    });
  });
});
