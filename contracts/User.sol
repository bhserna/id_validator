pragma solidity ^0.4.4;

contract User {
  string private name;
  string private rfc;
  address private registrator;

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
}
