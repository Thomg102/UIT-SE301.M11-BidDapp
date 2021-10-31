// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./Art.sol";

contract MarketPlace is Ownable {
    using SafeERC20 for IERC20;
    struct Product {
        uint256 tokenId;
        uint256 price;
        bool listing;
        bool selling;
        address creator;
        uint256 rate;
        uint256 timestamp;
    }

    struct Offer {
        uint256 tokenId;
        uint256 amount;
        address token20;
        address bargainer;
        bool accepted;
        uint256 timeout;
    }

    Art art;

    address[] public sellers;
    mapping(uint256 => Product) public tokenIdToProduct;
    mapping(address => Product[]) public userToProduct; //creator anf their product

    mapping(uint256 => Offer[]) public tokenIdToOffer;
    // mapping(uint256 => address) public askToOwner721;

    event Transfer(
        uint256 indexed _tokenId,
        address indexed _oldOwner,
        address indexed _newOwner
    );
    event NewOffer(
        uint256 indexed _tokenId,
        uint256 _amount,
        address _token20,
        address indexed _bargainer,
        uint256 _timeout
    );
    event ApproveOffer(
        uint256 indexed _tokenId,
        address indexed _oldOwner,
        address indexed _newOwner,
        uint256 _index
    );

    modifier onlyOwnerOfToken(uint256 _tokenId) {
        require(art.ownerOf(_tokenId) == msg.sender);
        _;
    }

    constructor() {
        art = new Art();
    }

    function createNewProduct(string memory _hash, uint256 _price) public {
        uint256 _tokenId = art.createNewNFT(msg.sender, _hash);
        sellers.push(msg.sender);

        Product memory product = Product(
            _tokenId,
            _price,
            true,
            true,
            msg.sender,
            0,
            block.timestamp
        );
        userToProduct[msg.sender].push(product);
        tokenIdToProduct[_tokenId] = product;
        // art.approve(address(this), _tokenId);
        emit Transfer(_tokenId, address(0), msg.sender);
    } //goi kem approve

    function setListOrNot(uint256 _tokenId) public onlyOwnerOfToken(_tokenId) {
        Product storage product = tokenIdToProduct[_tokenId];
        product.listing = !product.listing;
    }

    //neu tu false sang true thi phai goi kem approve
    function setSellOrNot(uint256 _tokenId) public onlyOwnerOfToken(_tokenId) {
        Product storage product = tokenIdToProduct[_tokenId];
        product.selling = !product.selling;
    }

    function setPrice(uint256 _tokenId, uint256 _price)
        public
        onlyOwnerOfToken(_tokenId)
    {
        Product storage product = tokenIdToProduct[_tokenId];
        product.price = _price;
    }

    function getProductListCreated(address _user)
        public
        view
        returns (Product[] memory)
    {
        return userToProduct[_user];
    }

    //Phai approve truoc
    function buy(uint256 _tokenId) public payable {
        Product storage _product = tokenIdToProduct[_tokenId];
        require(_product.selling);
        require(art.getApproved(_tokenId) == address(this));
        require(msg.value == _product.price);
        require(msg.sender != art.ownerOf(_tokenId));

        _product.selling = false;
        art.setOwnerToTokenId(msg.sender, _tokenId);
        address _owner = art.ownerOf(_tokenId);
        art.safeTransferFrom(_owner, msg.sender, _tokenId);
        Address.sendValue(payable(_owner), (msg.value * 98) / 100);

        emit Transfer(_tokenId, _owner, msg.sender);
    }

    //lay ra danh sach cac san pham so huu
    function getProducListOwnable(address _owner)
        public
        view
        returns (Product[] memory)
    {
        uint256[] memory arr = art.getTokenList(_owner);
        Product[] memory productList = new Product[](arr.length);
        for (uint256 i = 0; i < arr.length; i++) {
            productList[i] = tokenIdToProduct[arr[i]];
        }
        return productList;
    }

    //Phai goi kem approve token cho contractt nay
    function offer(
        uint256 _tokenId,
        uint256 _amount,
        address _token20,
        uint256 _timeout
    ) public {
        require(art.ownerOf(_tokenId) != address(0));
        require(_token20 != address(0));
        require(
            IERC20(_token20).allowance(msg.sender, address(this)) >= _amount
        );
        // IERC20(_token20).approve(address(this), _amount);

        tokenIdToOffer[_tokenId].push(
            Offer(
                _tokenId,
                _amount,
                _token20,
                msg.sender,
                false,
                block.timestamp + _timeout
            )
        );
        emit NewOffer(
            _tokenId,
            _amount,
            _token20,
            msg.sender,
            block.timestamp + _timeout
        );
    }

    function restartOffer(
        uint256 _tokenId,
        uint256 _index,
        uint256 _timeout
    ) public {
        require(tokenIdToOffer[_tokenId][_index].bargainer == msg.sender);
        require(tokenIdToOffer[_tokenId][_index].timeout < block.timestamp);
        require(_timeout > block.timestamp);
        tokenIdToOffer[_tokenId][_index].timeout = _timeout;
    }

    function getOffer(uint256 _tokenId, uint256 _index)
        public
        view
        returns (Offer memory)
    {
        // require(art.ownerOf(_tokenId) == msg.sender);
        require(_index <= tokenIdToOffer[_tokenId].length);
        return tokenIdToOffer[_tokenId][_index];
    }

    //chủ sở hữu da approve token721 hay chua
    //manual => not guarantee
    //automation => guarantee.....
    function approveOffer(uint256 _tokenId, uint256 _index) public {
        Product storage _product = tokenIdToProduct[_tokenId];
        Offer memory _offer = getOffer(_tokenId, _index);

        require(_product.selling);
        require(art.getApproved(_tokenId) == address(this));
        require(art.ownerOf(_tokenId) == msg.sender);
        require(_index <= tokenIdToOffer[_tokenId].length);
        require(block.timestamp <= _offer.timeout);

        tokenIdToOffer[_tokenId][_index].accepted = true;
        _product.selling = false;
        art.setOwnerToTokenId(msg.sender, _tokenId);
        address _owner = art.ownerOf(_tokenId);
        art.safeTransferFrom(_owner, _offer.bargainer, _tokenId);
        IERC20(_offer.token20).safeTransferFrom(
            _offer.bargainer,
            _owner,
            (_offer.amount * 95) / 100
        );

        emit ApproveOffer(_tokenId, _owner, msg.sender, _index);
    }
}
