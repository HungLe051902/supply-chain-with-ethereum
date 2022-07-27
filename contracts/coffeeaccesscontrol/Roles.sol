// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

library Roles {
    struct Role {
        mapping(address => bool) bearer;
    }

    function add(Role storage role, address account) internal {
        require(account != address(0), "account is not valid");
        require(!has(role, account), "Not in role");

        role.bearer[account] = true;
    }

    function remove(Role storage role, address account) internal {
        require(account != address(0), "Error");
        require(has(role, account), "Error");

        role.bearer[account] = false;
    }

    function has(Role storage role, address account)
        internal
        view
        returns (bool)
    {
        require(account != address(0), "account is not valid");
        return role.bearer[account];
    }
}
