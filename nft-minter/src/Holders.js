import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,

} from "./util/interact.js";

import { Network, initializeAlchemy, getOwnersForNft } from "@alch/alchemy-sdk";

const Holders = (props) => {
    const settings = {
        apiKey: "demo", // Replace with your Alchemy API Key.
        network: Network.POLYGON, // Replace with your network.
        maxRetries: 10,
      };

    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");

    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected();
    
        setWallet(address);
        setStatus(status);
    
        addWalletListener();
      }, []);

      function addWalletListener() {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setWallet(accounts[0]);
              setStatus("👆🏽 Write a message in the text-field above.");
            } else {
              setWallet("");
              setStatus("🦊 Connect to Metamask using the top right button.");
            }
          });
        } else {
          setStatus(
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          );
        }
      }
    
      const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
      };

      const data = {
        "people" :[
        {
            "name":"satoshi",
            "twitter":"swag",
            "checkedin":"False",
        },
        {
            "name":"max",
            "twitter":"smelly_dog",
            "checkedin":"True",
        },
    ]

      }
      return (
        <div className="Holder">
          <button id="walletButton" onClick={connectWalletPressed}>
            {walletAddress.length > 0 ? (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
          <form>  
        <h2>✉️: Message Guests</h2>
        <input
          type="text"
          placeholder="WAGMI"
          //onChange={(event) => setURL("https://gateway.pinata.cloud/ipfs/QmSF4MymNhKBTqBzonkv4ANKQe1fyowejB4zASLBEa2zoW") & setName(event.target.value)}
        />
      </form>
      <button id="mintButton">
        Send Message
      </button>

          <br></br>
          <h1 id="title">ETHCC After Party Guest List </h1>
          <tbody>
          <tr>
            <th>Name</th>
            <th>Twitter Handle</th>
            <th>Checked in?</th>
          </tr>
          {data.people.map((item, i) => (
            <tr key={i}>
              <th>{item.name}</th>
              <th>{item.twitter}</th>
              <th>{item.checkedin}</th>
            </tr>
          ))}
    </tbody>

        </div>
    );

};
export default Holders