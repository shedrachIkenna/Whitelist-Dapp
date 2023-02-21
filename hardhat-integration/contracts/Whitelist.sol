// SPDX-License-Identifier: Unlicense

// Deployed contract address - 0x6410566cAb7a526feE7a871d471e851E23Ebbd8e

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

    // This function adds the address of the sender of the transaction(msg.sender) to the whitelist
    function addAddressToWhitelist() public {

        // checks if the user is already whitelisted
        require(!whitelistedAddresses[msg.sender], "Sender has already been whitelisted");

        // checks if numAddressesWhitelisted < maxWhitelistedAddresses, if not then throw an error 
        require(numAddressesWhitelisted < maxWhitelistedAddresses, "More addresses can't be added, Limit reached!");
        
        // adds the address of the sender to whitelistedAddresses array
        whitelistedAddresses[msg.sender] = true;

        //Increase the number of whitelisted addresses by 1
        numAddressesWhitelisted += 1;
    }
}