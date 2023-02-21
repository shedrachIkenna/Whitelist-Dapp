// import ethers from hardhat
const { ethers } = require("hardhat");


/* 
  We use an async function because we are calling some functions that will take some time to execute 
  we don't want those function to block or slow down execution
  Async funtions always returns a promise
*/
async function main() {
  /* 
    Before we can deploy our smart constract and integrate it with frontend, we need to create an instance 
    of our smart contract using ethers library

    getContractFactory in ethers js is an abstraction used to create an instance of whitelist contract to be deployed
    Once the whitelist contract instance is gotten, it is stored in the whitelistContract variable 
  */
    const whitelistContract = await ethers.getContractFactory('Whitelist');

    //Deploy the contract
    // 10 is the maximum number of whitelisted addresses that can be deployed
    const deployedWhitelistContract = await whitelistContract.deploy(10);

    // wait for it to finish deploying 
    await deployedWhitelistContract.deployed();

    // Log the address of the deployed contract to the console 
    console.log("Whitelist Contract Address: ", deployedWhitelistContract.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });