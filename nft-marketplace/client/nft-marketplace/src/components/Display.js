// Display.js
import React, { useEffect } from "react";

function Display({ web3, accounts, marketplace, listedNfts, reload }) {
  useEffect(() => {
    async function loadListedNfts() {
      const listedNfts = await marketplace.methods.getListedNfts().call();
      setListedNfts(listedNfts);
    }
    loadListedNfts();
  }, [reload]);

  async function buyNft(nft) {
    await marketplace.methods
      .buyNft(nft.nftContract, nft.tokenId)
      .send({ from: accounts[0], value: nft.price });
    window.alert("NFT bought successfully!");
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Display NFTs</h5>
        <div className="row">
          {listedNfts.map((nft) => (
            nft.owner !== accounts[0] && (
              <div key={nft.tokenId} className="col-lg-6">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">NFT #{nft.tokenId}</h5>
                    <p className="card-text">Seller: {nft.seller}</p>
                    <p className="card-text">Price: {web3.utils.fromWei(nft.price, "ether")} ETH</p>
                    <button className="btn btn-primary" onClick={() => buyNft(nft)}>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default Display;