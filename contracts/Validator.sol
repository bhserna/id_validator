pragma solidity ^0.4.4;

import "./User.sol";

contract Validator {
  address[] users;

  function registerUser(string name, string rfc) returns(address) {
    User user = new User(name, rfc);
    users.push(address(user));
    return address(user);
  }

  function getUser(string name, string rfc) returns(address) {
    address selectedUser;

    for (uint index = 0; index < users.length; index++) {
      User user = User(users[index]);

      if (user.hasName(name) && user.hasRfc(rfc)) {
        selectedUser = address(user);
        break;
      }
    }

    return address(selectedUser);
  }

  function validateUserEmail(address userAddress, bytes32 email) returns(address) {
    User user = User(userAddress);
    user.addEmailValidation(email);
    return userAddress;
  }

  function isEmailValidatedForUser(address userAddress, bytes32 email) returns(bool) {
    User user = User(userAddress);
    return user.isEmailValidated(email);
  }
}
