// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "../coffeecore/Ownable.sol";
import "../coffeeaccesscontrol/ConsumerRole.sol";
import "../coffeeaccesscontrol/DistributorRole.sol";
import "../coffeeaccesscontrol/FarmerRole.sol";
import "../coffeeaccesscontrol/RetailerRole.sol";

contract SupplyChain is
    Ownable,
    ConsumerRole,
    DistributorRole,
    FarmerRole,
    RetailerRole
{
    uint upc; // Universal Product Code (UPC)
    uint sku; // Stock Keeping Unit (SKU)

    mapping(uint => Item) items;

    mapping(uint => string[]) itemsHistory;

    enum State {
        Harvested, // 0
        Processed, // 1
        Packed, // 2
        ForSale, // 3
        Sold, // 4
        Shipped, // 5
        Received, // 6
        Purchased // 7
    }

    struct Item {
        uint sku;
        uint upc;
        address ownerID;
        address payable originFarmerID;
        string originFarmName;
        string originFarmInformation;
        string originFarmLatitude;
        string originFarmLongtitude;
        uint productID; // Product ID potentially a combination of upc + sku
        string productNotes;
        uint productPrice;
        State itemState;
        address distributorID;
        address retailerID;
        address payable consumerID;
    }

    State constant defaultState = State.Harvested;

    event Harvested(uint upc);
    event Processed(uint upc);
    event Packed(uint upc);
    event ForSale(uint upc);
    event Sold(uint upc);
    event Shipped(uint upc);
    event Received(uint upc);
    event Purchased(uint upc);

    modifier verifyCaller(address _address) {
        require(msg.sender == _address, "Not a caller");
        _;
    }

    modifier paidEnough(uint _price) {
        require(msg.value > _price, "Not enough money");
        _;
    }

    modifier checkValue(uint _upc) {
        _;
        uint _price = items[_upc].productPrice;
        uint amountToReturn = msg.value - _price;
        items[_upc].consumerID.transfer(amountToReturn);
    }

    modifier harvested(uint _upc) {
        require(
            items[_upc].itemState == State.Harvested,
            "Not in Harvested state"
        );
        _;
    }

    modifier processed(uint _upc) {
        require(
            items[_upc].itemState == State.Processed,
            "Not in Processed state"
        );
        _;
    }

    modifier packed(uint _upc) {
        require(items[_upc].itemState == State.Packed, "Not in Packed state");
        _;
    }

    modifier forSale(uint _upc) {
        require(items[_upc].itemState == State.ForSale, "Not in ForSale state");
        _;
    }

    modifier sold(uint _upc) {
        require(items[_upc].itemState == State.Sold, "Not in Sold state");
        _;
    }

    modifier shipped(uint _upc) {
        require(items[_upc].itemState == State.Shipped, "Not in Shipped state");
        _;
    }

    modifier received(uint _upc) {
        require(
            items[_upc].itemState == State.Received,
            "Not in Received state"
        );
        _;
    }

    modifier purchased(uint _upc) {
        require(
            items[_upc].itemState == State.Purchased,
            "Not in Purchased state"
        );
        _;
    }

    constructor() payable {
        sku = 1;
        upc = 1;
    }

    function harvestItem(
        uint _upc,
        address payable _originFarmerID,
        string memory _originFarmName,
        string memory _originFarmInformation,
        string memory _originFarmLatitude,
        string memory _originFarmLongtitude,
        string memory _productNotes
    ) public {
        items[_upc].sku = sku;
        items[_upc].upc = _upc;
        items[_upc].ownerID = msg.sender;
        items[_upc].originFarmerID = _originFarmerID;
        items[_upc].originFarmName = _originFarmName;
        items[_upc].originFarmInformation = _originFarmInformation;
        items[_upc].originFarmLatitude = _originFarmLatitude;
        items[_upc].originFarmLongtitude = _originFarmLongtitude;
        items[_upc].productID = sku + _upc;
        items[_upc].productNotes = _productNotes;
        items[_upc].itemState = State.Harvested;

        sku = sku + 1;

        emit Harvested(_upc);
    }

    function processItem(uint _upc)
        public
        harvested(_upc)
        verifyCaller(items[_upc].originFarmerID)
    {
        items[_upc].itemState = State.Processed;
        emit Processed(_upc);
    }

    function packItem(uint _upc)
        public
        processed(_upc)
        verifyCaller(items[_upc].originFarmerID)
    {
        items[_upc].itemState = State.Packed;
        emit Packed(_upc);
    }

    function sellItem(uint _upc, uint _price)
        public
        packed(_upc)
        verifyCaller(items[_upc].originFarmerID)
    {
        items[_upc].itemState = State.ForSale;
        items[_upc].productPrice = _price;
        emit ForSale(upc);
        (_upc);
    }

    function buyItem(uint _upc)
        public
        payable
        forSale(_upc)
        paidEnough(items[_upc].productPrice)
        checkValue(_upc)
        onlyDistributor
    {
        items[_upc].ownerID = msg.sender;
        items[_upc].distributorID = msg.sender;
        items[_upc].itemState = State.Sold;

        items[_upc].originFarmerID.transfer(items[_upc].productPrice);

        emit Sold(_upc);
    }

    function shipItem(uint _upc)
        public
        sold(_upc)
        verifyCaller(items[_upc].distributorID)
    {
        items[_upc].itemState = State.Shipped;
        emit Shipped(_upc);
    }

    function receivedItem(uint _upc) public shipped(_upc) onlyRetailer {
        items[_upc].ownerID = msg.sender;
        items[_upc].retailerID = msg.sender;
        items[_upc].itemState = State.Received;

        emit Received(_upc);
    }

    function purchaseItem(uint _upc) public received(_upc) onlyConsumer {
        items[_upc].ownerID = msg.sender;
        items[_upc].consumerID = payable(msg.sender);
        items[_upc].itemState = State.Purchased;

        emit Purchased(_upc);
    }

    function fetchItem(uint _upc)
        public
        view
        returns (
            uint itemSKU,
            uint itemUPC,
            address ownerID,
            address originFarmerID,
            string memory originFarmName,
            string memory originFarmInformation,
            string memory originFarmLatitude,
            string memory originFarmLongitude
        )
    {
        itemSKU = items[_upc].sku;
        itemUPC = items[_upc].upc;
        ownerID = items[_upc].ownerID;
        originFarmerID = items[_upc].originFarmerID;
        originFarmName = items[_upc].originFarmName;
        originFarmInformation = items[_upc].originFarmInformation;
        originFarmLatitude = items[_upc].originFarmLatitude;
        originFarmLongitude = items[_upc].originFarmLongtitude;

        return (
            itemSKU,
            itemUPC,
            ownerID,
            originFarmerID,
            originFarmName,
            originFarmInformation,
            originFarmLatitude,
            originFarmLongitude
        );
    }
}
