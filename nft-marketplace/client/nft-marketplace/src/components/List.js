// List.js
import React, { useState, useEffect } from "react";

function List({ web3, accounts, marketplace, myNfts, reload }) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function loadMyNfts() {
      const myNfts = await marketplace.methods.getMyNfts(accounts[0]).call();
      setMyNfts(myNfts);
    }
    loadMyNfts();
  }, [reload]);

  async function listNft(nft) {
    if (price > 0) {
      await marketplace.methods
        .listNft(nft.nftContract, nft.tokenId, web3.utils.toWei(price.toString(), "ether"))
        .send({ from: accounts[0], value: web3.utils.toWei("0.0001", "ether") });
      window.alert("NFT listed successfully!");
    } else {
      window.alert("Please enter a valid price");
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">List an NFT</h5>
        <div className="form-group">
          <label htmlFor="price">Price (in ETH)</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nft">Select an NFT</label>
          <select className="form-control" id="nft">
            {myNfts.map((nft) => (
              !nft.listed && (
                <option key={nft.tokenId} value={JSON.stringify(nft)}>
                  {nft.tokenId}
                </option>
              )
            ))}
          </select>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => listNft(JSON.parse(document.getElementById("nft").value))}
        >
          List
        </button>
      </div>
    </div>
  );
}

export default List;