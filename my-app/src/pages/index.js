import Head from "next/head";
import styles from "../styles/Home.module.css";
import web3Modal from "web3modal";
import { useState, useEffect, useRef } from "react";
import { providers, Contract } from "ethers";
import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";
 

export default function Home() {

  const [walletConnected, setWalletConnected] = useState(false);

  const [joinedWhitelist, setJoinedWhitelist] = useState(false);

  const [loading, setLoading] = useState(false);

  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);

  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if(chainId !== 5){
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if(needSigner){
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }

  const connectWallet = async () => {
    console.log('connectWallet')
    try{
      await getProviderOrSigner();
      setWalletConnected(true);
      checkIfAddressInWhitelist();
      getNumberOfWhitelisted();
    } catch (err){
      console.error(err);
    }
  }

  const checkIfAddressInWhitelist = async () => {
    try{
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      )

      const address = await signer.getAddress();
      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
        address
      );
      setJoinedWhitelist(_joinedWhitelist);
    } catch(err){
      console.error(err);
    }
  }

  const getNumberOfWhitelisted = async () => {
    try{
      const provider = await getProviderOrSigner();
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const _numberOfWhitelisted = await whitelistContract.numAddressesWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch(err){
      console.error(err);
    }
  }

  const addAddressToWhitelist = async () => {
    try{
      const signer = await getProviderOrSigner(true);
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      const _addAddressToWhitelist = await whitelistContract.addAddressToWhitelist();
      setLoading(true);
      await _addAddressToWhitelist.wait();
      setLoading(false);
      await getNumberOfWhitelisted();
      setJoinedWhitelist(true);
    } catch(err){
      console.error(err)
    }
  }


  const renderButton = () => {
    if (walletConnected){
      if(joinedWhitelist){
        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist!
          </div>
        )
      } else if (loading){
        return  <button className={styles.button}>Loading...</button>
      } else{
        return (
          <button onClick={addAddressToWhitelist} className={styles.button}>Join the Whitelist</button>
        )
      }
    } else {
      return <button className={styles.button} onClick={connectWallet}>Connect Wallet</button>
    }
  }

  useEffect(() => {
    renderButton()
    if(!walletConnected){
      web3ModalRef.current = new web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [walletConnected])



  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp"/>
        <link rel="icon"/>
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to the Breakfast Club</h1>
          <div className={styles.description}>
            Its an NFT for collection for Naija Celebs!
          </div>
          <div className={styles.description}>
            {numberOfWhitelisted} have already joined the Whitelist
          </div>
          {renderButton()}
        </div>
        <div className={styles.image}>
          <img src="./NFT.png" alt="" />
        </div>
      </div>
      <footer className={styles.footer}>
        Made with &#10084; by Breakfast Club
      </footer>
    </div>
  );
}