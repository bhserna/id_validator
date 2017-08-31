pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Project.sol";

contract TestProject {
  function testProjectCreation() {
    Project project = new Project(500000);
    Assert.equal(project.getFundingGoal(), 500000, "No funding goal");
  }
}
