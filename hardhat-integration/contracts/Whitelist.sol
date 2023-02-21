// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

contract Whitelist {
    // max number of whitelisted addresses allowed
    // uint8 can only hold unsigned interger values from 0 - 255 using eight 0s and 1s
    uint8 maxWhitelistedAddresses;

    // mapping maps whitelistedAddresses to boolean datatype
    // if an address is whitelisted, it is set to true, otherwise it is set to false by default
    mapping(address => bool) whitelistedAddresses;

    // numAddressesWhitelisted keeps track of the number of addresses that have been whitelisted
    uint8 public numAddressesWhitelisted;

    /* A construtor is executed once in the lifecycle of a smart contract 
        It is a special function that is executed once a smart contract is deployed */
    // Setting the max number of whitelisted addresses 
    // User will put the value at the time of deployment
    constructor(uint8 _maxWhitelistedAddresses){
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }
}