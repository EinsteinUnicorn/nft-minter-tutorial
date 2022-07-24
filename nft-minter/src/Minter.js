import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,

} from "./util/interact.js";

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

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


/* module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'getTickets':
      return window.ethereum.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Would you like to get a ticket?`,
            description: 'An event ticket nft will be minted to your address',
            textAreaContent: 'You are confirming you will be attending this event',
          },
        ],
      });
       default:
    throw new Error('Method not found.');
}
};

  const onNotifPressed = async () => {
  const snapId = `local:${window.location.href}`;

  const results = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [snapId, { method: 'getTickets'}],
  });
} */

const onNotifPressed = async () => {

  const snapId = `local:${window.location.href}`;

  const tickets = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [snapId, { method: 'hello'}],
  });

    switch (window.ethereum.request.method) {
      case 'hello':
        return 'world!';

      case 'getTickets':
      return walletAddress.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Would you like to get a ticket?`,
            description: 'An event ticket nft will be minted to your address',
            textAreaContent: 'You are confirming you will be attending this event',
          },
        ],
      });

  
      default:
        throw new Error('Method not found.');
    }
 
} 



  const onMintPressed = async () => {
    const { success, status } = await mintNFT(url, name, description);
    setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setURL("");
    }
  };

  const connectSnap = async () => {
    //const snapId = `local:${window.location.href}`;
    await window.ethereum.request({
      method: 'wallet_enable',
      params: [
        {
          wallet_snap: {
            'npm:hello-snap': {},
          },
        },
      ],
    });
    console.log("connected");
  }


  return (
    <div className="Minter">
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

        {/* <button onClick={connectSnap}>connect snap</button> */}
      <br></br>
      <h1 id="title">ETHCC After Party </h1>
      <h2>Hosted by: Zora</h2>
      <h3>Sun, Jul 24, 2022, 8:00 PM –

      Mon, Jul 25, 2022, 2:00 AM CEST</h3>
      <p></p>
      <form>  
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="Satoshi"
          onChange={(event) => setURL("https://gateway.pinata.cloud/ipfs/QmaU8ZeaPqdrNypRrKK8QE7PeSt9Jo7KY7RRJCBxrT6Hgd") & setName(event.target.value)}
        />
        <h2>✍️ Twitter: </h2>
        <input
          type="text"
          placeholder="e.g. @coolperson)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        RSVP to event
      </button>
      <button id="getNotifications" onClick={onNotifPressed}>
        Get Notifications
      </button>
=      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  );
};

export default Minter;
