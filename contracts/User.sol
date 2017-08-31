pragma solidity ^0.4.4;

contract User {
  string private name;

  function User(string givenName) {
    name = givenName;
  }

  function getName() returns(string) {
    return name;
  }
}
