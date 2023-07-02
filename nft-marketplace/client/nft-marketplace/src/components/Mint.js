// Mint.js
import React, { useState } from "react";

function Mint({ web3, accounts, boredPetsNFT }) {
  const [tokenURI, setTokenURI] = useState("");

  async function mintNft() {
    if (tokenURI) {
      await boredPetsNFT.methods.mint(tokenURI).send({ from: accounts[0] });
      window.alert("NFT minted successfully!");
    } else {
      window.alert("Please enter a valid token URI");
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Mint an NFT</h5>
        <div className="form-group">
          <label htmlFor="tokenURI">Token URI</label>
          <input
            type="text"
            className="form-control"
            id="tokenURI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={mintNft}>
          Mint
        </button>
      </div>
    </div>
  );
}

export default Mint;