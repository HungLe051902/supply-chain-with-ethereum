// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract UserInfo {
    address private owner;
    mapping(address => User) private users;
    address[] private userWallets;

    struct User {
        address wallet;
        string imageCid;
        string name;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be owner to perform the action");
        _;
    }

    function addUser(address wallet, string memory imageCid, string memory name) public onlyOwner {
        require(wallet != address(0), "wallet address must be valid");
        users[wallet].wallet = wallet;
        users[wallet].imageCid = imageCid;
        users[wallet].name = name;

        userWallets.push(wallet);
    }

    function getUserByAddress(address wallet)
        public
        view
        returns (User memory)
    {
        return users[wallet];
    }

    function getAllUser() public view returns (User[] memory) {
        User[] memory ret = new User[](userWallets.length);
        for (uint i = 0; i < userWallets.length; i++) {
            ret[i] = users[userWallets[i]];
        }
        return ret;
    }
}
