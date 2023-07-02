// App.js
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import BoredPetsNFT from "./abis/BoredPetsNFT.json";
import Marketplace from "./abis/Marketplace.json";
import Mint from "./components/Mint";
import "./App.css";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [boredPetsNFT, setBoredPetsNFT] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    setWeb3(web3);

    // Load accounts
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);

    // Load contracts
    const networkId = await web3.eth.net.getId();
    const boredPetsNFTData = BoredPetsNFT.networks[networkId];
    if (boredPetsNFTData) {
      const boredPetsNFT = new web3.eth.Contract(BoredPetsNFT.abi, boredPetsNFTData.address);
      setBoredPetsNFT(boredPetsNFT);
    } else {
      window.alert("BoredPetsNFT contract not deployed to detected network.");
    }

    const marketplaceData = Marketplace.networks[networkId];
    if (marketplaceData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, marketplaceData.address);
      setMarketplace(marketplace);
      // Load balance
      const balance = await web3.eth.getBalance(accounts[0]);
      setBalance(balance);
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h1>Bored Pets Yacht Club</h1>
          <p>Your account: {accounts[0]}</p>
          <p>Your balance: {web3.utils.fromWei(balance, "ether")} ETH</p>
        </div>
        <hr />
        <div className="col-lg-4">
          <h2>Mint</h2>
          <Mint web3={web3} accounts={accounts} boredPetsNFT={boredPetsNFT} />
        </div>
      </div>
    </div>
  );
}

export default App;