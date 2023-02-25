import Head from "next/head";
import web3Modal from "web3modal";
 

export default function Home() {
  return (
    <div>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist-Dapp"/>
        <link rel="icon"/>
      </Head>
      <div>
        <div>
          <h1>Welcome to the Breakfast Club</h1>
          <div>
            Its an NFT for collection for Naija Celebs!
          </div>
          <div>
            5 have already joined the Whitelist
          </div>
          <button>Render Button</button>
        </div>
        <div>
          <img src="./NFT.png" alt="" />
        </div>
      </div>
    </div>
  );
}