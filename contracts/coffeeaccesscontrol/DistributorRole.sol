// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import the library 'Roles'
import "./Roles.sol";

contract DistributorRole {
    using Roles for Roles.Role;

    event DistributorAdded(address indexed account);
    event DistributorRemoved(address indexed account);

    Roles.Role private distributors;

    constructor() {
        _addDistributor(msg.sender);
    }

    modifier onlyDistributor() {
        require(isDistributor(msg.sender), "Must be Distributor");
        _;
    }

    function isDistributor(address account) public view returns (bool) {
        return distributors.has(account);
    }

    function addDistributor(address account) public onlyDistributor {
        _addDistributor(account);
    }

    function renounceDistributor() public {
        _removeDistributor(msg.sender);
    }

    function _addDistributor(address account) internal {
        distributors.add(account);
        emit DistributorAdded(account);
    }

    function _removeDistributor(address account) internal {
        distributors.remove(account);
        emit DistributorRemoved(account);
    }
}