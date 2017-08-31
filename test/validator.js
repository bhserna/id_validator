var Validator = artifacts.require("./Validator.sol");
var User = artifacts.require("./User.sol");

contract('Validator', function(accounts) {
  it("register user", function() {
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

  it("ask for email validations for user without validations", function() {
    var validator, userAddress;

    return Validator.deployed().then(function(instance) {
      validator = instance;
      return validator.registerUser("Benito", "ASD870921R23");
    }).then(function() {
      return validator.getUser.call("Benito", "ASD870921R23");
    }).then(function(address) {
      userAddress = address;
      return validator.isEmailValidatedForUser.call(userAddress, "bh@example.com");
    }).then(function(validation) {
      assert.equal(validation.valueOf(), false, "Should have no confirmations");
    });
  });

  it("validate user email and ask if is validated", function() {
    var validator, userAddress;

    return Validator.deployed().then(function(instance) {
      validator = instance;
      return validator.registerUser("Benito", "ASD870921R23");
    }).then(function() {
      return validator.getUser.call("Benito", "ASD870921R23");
    }).then(function(address) {
      userAddress = address;
      return validator.validateUserEmail(userAddress, "bh@example.com");
    }).then(function() {
      return validator.isEmailValidatedForUser.call(userAddress, "bh@example.com");
    }).then(function(validation) {
      assert.equal(validation.valueOf(), true, "Should have the validation");
    });
  });

  it("ask for a non validated email", function() {
    var validator, userAddress;

    return Validator.deployed().then(function(instance) {
      validator = instance;
      return validator.registerUser("Benito", "ASD870921R23");
    }).then(function() {
      return validator.getUser.call("Benito", "ASD870921R23");
    }).then(function(address) {
      userAddress = address;
      return validator.validateUserEmail(userAddress, "bh@example.com");
    }).then(function() {
      return validator.isEmailValidatedForUser.call(userAddress, "other@example.com");
    }).then(function(validation) {
      assert.equal(validation.valueOf(), false, "Should not have the validation");
    });
  });
});
