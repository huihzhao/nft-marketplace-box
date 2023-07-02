// MyNfts.js
import React, { useState, useEffect } from "react";

function MyNfts({ web3, accounts, marketplace, reload }) {
  const [myNfts, setMyNfts] = useState([]);

  useEffect(() => {
    async function loadMyNfts() {
      const myNfts = await marketplace.methods.getMyNfts(accounts[0]).call();
      setMyNfts(myNfts);
    }
    loadMyNfts();
  }, [reload]);

  async function listNft(nft) {
    // same as before
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">My NFTs</h5>
        <div className="row">
          {myNfts.map((nft) => (
            <div key={nft.tokenId} className="col-lg-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">NFT #{nft.tokenId}</h5>
                  <p className="card-text">Owner: {nft.owner}</p>
                  <p className="card-text">Price: {web3.utils.fromWei(nft.price, "ether")} ETH</p>
                  {!nft.listed && (
                    <button className="btn btn-primary" onClick={() => listNft(nft)}>
                      List
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyNfts;