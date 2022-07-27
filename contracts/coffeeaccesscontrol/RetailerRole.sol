// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import the library 'Roles'
import "./Roles.sol";

contract RetailerRole {
    using Roles for Roles.Role;
    Roles.Role private retailers;

    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);

    constructor() {
        _addRetailer(msg.sender);
    }

    modifier onlyRetailer() {
        require(isRetailer(msg.sender), "Must be Retailer");
        _;
    }

    function isRetailer(address account) public view returns (bool) {
        return retailers.has(account);
    }

    function addRetailer(address account) public {
        _addRetailer(account);
    }

    function renounceRetailer(address account) public {
        _removeRetailer(account);
    }

    function _addRetailer(address account) internal {
        retailers.add(account);
        emit RetailerAdded(account);
    }

    function _removeRetailer(address account) internal {
        retailers.remove(account);
        emit RetailerRemoved(account);
    }
}