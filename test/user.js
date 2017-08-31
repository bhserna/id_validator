var User = artifacts.require("./User.sol");

contract('User', function(accounts) {
  it("create User", function() {
    return User.new("Benito").then(function(instance) {
      return instance.getName.call();
    }).then(function(name) {
      assert.equal(name.valueOf(), "Benito", "Should have name");
    });
  });
});
