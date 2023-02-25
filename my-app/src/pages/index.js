import Head from "next/head";
import styles from "../styles/Home.module.css";
import web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { providers, Contract } from "ethers";
 

export default function Home() {

  const [walletConnect, setWalletConnect] = useState(false);

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
            5 have already joined the Whitelist
          </div>
          <button className={styles.button}>Render Button</button>
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