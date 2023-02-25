import Head from "next/head";
import styles from "../styles/Home.module.css";
import web3Modal from "web3modal";
 

export default function Home() {
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