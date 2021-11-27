// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

library String {
    function append(string memory a, string memory b)
        internal
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(a, b));
    }
}
