pragma solidity ^0.6.12;

interface IPriceContract {
    struct Price {
        uint256 value;
        uint8 decimals;
    }

    event GetPrice(bytes32 _id, string _query, uint256 _timestamp);
    event ReceivePrice(bytes32 _id, uint256 _value, uint8 decimals);

    function updatePrice(
        uint256 _time,
        address _tokens,
        address payable _refund,
        uint8 _priceDecimals,
        address _ownerPool
    ) external payable returns (bytes32);

    function getPrice(bytes32 _id)
        external
        view
        returns (uint256 value, uint16 decimals);
}
