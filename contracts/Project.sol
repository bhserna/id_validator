pragma solidity ^0.4.4;

contract Project {
  uint fundingGoal;

  function Project(uint amount) {
    fundingGoal = amount;
  }

  function getFundingGoal() returns(uint) {
    return fundingGoal;
  }
}
