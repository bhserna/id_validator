pragma solidity ^0.4.4;

contract User {
  string private name;
  string private rfc;
  address private registrator;
  mapping (bytes32 => address[]) private emailValidations;

  function User(string _name, string _rfc) {
    name = _name;
    rfc = _rfc;
    registrator = tx.origin;
  }

  function getName() returns(string) {
    return name;
  }

  function getRfc() returns(string) {
    return rfc;
  }

  function hasName(string _name) returns(bool) {
    return sha3(name) == sha3(_name);
  }

  function hasRfc(string _rfc) returns(bool) {
    return sha3(rfc) == sha3(_rfc);
  }

  function getRegistrator() returns(address) {
    return registrator;
  }

  function addEmailValidation(bytes32 email) returns(bool) {
    emailValidations[email].push(tx.origin);
    return true;
  }

  function isEmailValidated(bytes32 email) returns(bool) {
    return emailValidations[email].length > 0;
  }
}
