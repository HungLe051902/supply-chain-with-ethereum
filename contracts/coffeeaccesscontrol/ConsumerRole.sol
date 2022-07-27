// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import the library 'Roles'
import "./Roles.sol";

contract ConsumerRole {
    // Define 2 events, one for Adding, and other for Removing
    event ConsumerAdded(address indexed account);
    event ConsumerRemoved(address indexed account);

    using Roles for Roles.Role;
    Roles.Role private consumers;

    constructor() {
        _addConsumer(msg.sender);
    }

    modifier onlyConsumer() {
        require(isConsumer(msg.sender), "Must only be Consumer");
        _;
    }

    function isConsumer(address account) public view returns (bool) {
        return consumers.has(account);
    }

    function addConsumer(address account) public onlyConsumer {
        _addConsumer(account);
    }

    function _addConsumer(address account) internal {
        consumers.add(account);
        emit ConsumerAdded(account);
    }

    function renounceConsumer() public {
        _removeConsumer(msg.sender);
    }

    function _removeConsumer(address account) internal {
        consumers.remove(account);
        emit ConsumerRemoved(account);
    }
}
