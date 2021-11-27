// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "./libraries/String.sol";
import "./interface/IERC20.sol";
import "./interface/IBettingPool.sol";
import "./interface/IPriceContract.sol";
import "./libraries/DateTime.sol";
import "./Ownable.sol";

contract ChainLinkPrice is ChainlinkClient, Ownable, IPriceContract {
    using Chainlink for Chainlink.Request;
    using String for string;
    using DateTime for uint256;

    mapping(bytes32 => bool) public isRequest;
    mapping(bytes32 => bool) public isResponse;
    mapping(bytes32 => Price) public price;

    uint256 public fee;
    bytes32 jobId;

    constructor(
        address _oracle,
        address _linkToken,
        uint256 _fee
    ) public {
        setChainlinkOracle(_oracle);
        if (_linkToken == address(0)) {
            setPublicChainlinkToken();
        } else {
            setChainlinkToken(_linkToken);
        }
        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = _fee;
    }

    function setJobId(bytes32 _jobId, uint256 _fee) public onlyOwner {
        jobId = _jobId;
        fee = _fee;
    }

    function setLinkToken(address _linkToken) public onlyOwner {
        require(_linkToken != address(0));
        setChainlinkToken(_linkToken);
    }

    function updatePrice(
        uint256 _timestamp,
        address _tokens,
        address payable _refund,
        uint8 _priceDecimals,
        address _ownerPool
    ) external payable override returns (bytes32) {
        require(
            IBettingPool(_ownerPool).checkBettingContractExist(msg.sender),
            "You don't have right call updatePrice"
        );
        if (msg.value > 0) {
            _sendValue(_refund, msg.value);
        }
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        string memory symbol = IERC20(_tokens).symbol();
        string memory urlApi = "https://api.pro.coinbase.com/products/";
        urlApi = urlApi
            .append(symbol)
            .append("-USD")
            .append("/candles?start=")
            .append(_timestamp.convertTimestampToDateTime());
        urlApi = urlApi.append("&end=").append(
            (_timestamp + 600).convertTimestampToDateTime()
        );
        request.add("get", urlApi);
        request.add("path", "0.1");
        uint256 decimals = uint256(_priceDecimals);
        int256 times = int256(10**decimals);
        request.addInt("times", times);
        bytes32 requestId = sendChainlinkRequest(request, fee);
        isRequest[requestId] = true;
        price[requestId].decimals = _priceDecimals;
        emit GetPrice(requestId, urlApi, _timestamp);
        return requestId;
    }

    function fulfill(bytes32 _requestId, uint256 _price)
        public
        recordChainlinkFulfillment(_requestId)
    {
        require(
            msg.sender == chainlinkOracleAddress(),
            "ChainLinkContract: Only called by ChainlinkOracle"
        );
        require(
            isRequest[_requestId],
            "ChainLinkContract: Request is not exist"
        );
        require(
            !isResponse[_requestId],
            "ChainLinkContract: Request was received response"
        );
        price[_requestId].value = _price;
        isResponse[_requestId] = true;
        emit ReceivePrice(
            _requestId,
            price[_requestId].value,
            price[_requestId].decimals
        );
    }

    function getPrice(bytes32 _id)
        external
        view
        override
        returns (uint256 value, uint16 decimals)
    {
        require(isRequest[_id], "ChainLinkContract: Cannot request price");
        require(
            isResponse[_id],
            "ChainLinkContract: Have not received any feedback about the price"
        );
        return (price[_id].value, price[_id].decimals);
    }

    function getBalanceLinkToken() public view returns (uint256) {
        return IERC20(chainlinkTokenAddress()).balanceOf(address(this));
    }

    function _sendValue(address payable recipient, uint256 amount) private {
        require(
            address(this).balance >= amount,
            "Address: insufficient balance"
        );

        (bool success, ) = recipient.call{value: amount}("");
        require(
            success,
            "Address: unable to send value, recipient may have reverted"
        );
    }
}
