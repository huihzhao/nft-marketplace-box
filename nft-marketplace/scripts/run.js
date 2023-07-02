var BoredPetsNFT = artifacts.require("BoredPetsNFT");
var Marketplace = artifacts.require("Marketplace");



// async function logNftLists(marketplace) {
//     let listedNfts = await marketplace.getListedNfts()
//     console.log("Listed NFTs are " + listedNfts)
//     const accounts = await web3.currentProvider.request({
//       method: 'eth_accounts',
//       params: [],
//     });
//     console.log("Accounts are" + accounts)
//     const accountAddress = accounts[0];
//     let myNfts = await marketplace.getMyNfts({from: accountAddress})
//     let myListedNfts = await marketplace.getMyListedNfts({from: accountAddress})
//     console.log(`listedNfts: ${listedNfts.length}`)
//     console.log(`myNfts: ${myNfts.length}`)
//     console.log(`myListedNfts ${myListedNfts.length}\n`)
// }

async function logNftLists(marketplace) {
    let listedNfts = await marketplace.getListedNfts();
    const accounts = await web3.eth.getAccounts();
    const accountAddress = accounts[0];
    console.log(accountAddress)
    let myNfts = await marketplace.getMyNfts({ from: accountAddress });
    let myListedNfts = await marketplace.getMyListedNfts({ from: accountAddress });
    console.log(`listedNfts: ${listedNfts.length}`);
    console.log(`myNfts: ${myNfts.length}`);
    console.log(`myListedNfts ${myListedNfts.length}\n`);
  }
  

const main = async (cb) => {
  try {
    let contractABI = JSON.stringify(BoredPetsNFT.abi);
    console.log(contractABI);

    const boredPets = await BoredPetsNFT.deployed()
    const marketplace = await Marketplace.deployed()

    console.log('MINT AND LIST 3 NFTs')
    let listingFee = await marketplace.LISTING_FEE()
    listingFee = listingFee.toString()

    let txn1 = await boredPets.mint("URI1");
    let tokenId1;
    txn1.logs.forEach((log) => {
    if (log.event === "NFTMinted") {
        console.log(log.args)
        tokenId1 = log.args[0].toNumber();
    }
    });
    console.log("tokenid1 is " + tokenId1)
    await marketplace.listNft(boredPets.address, tokenId1, 1, {value: listingFee})
    console.log(`Minted and listed ${tokenId1}`)


    // let txn2 = await boredPets.mint("URI2")
    // let tokenId2;
    // txn2.logs.forEach((log) => {
    //     if (log.event === "NFTMinted") {
    //         console.log(log.args)
    //         tokenId2 = log.args[0].toNumber();
    //     }
    // });
    // await marketplace.listNft(boredPets.address, tokenId2, 1, {value: listingFee})
    // console.log(`Minted and listed ${tokenId2}`)


    // let txn3 = await boredPets.mint("URI3")
    // let tokenId3;
    // txn3.logs.forEach((log) => {
    //     if (log.event === "NFTMinted") {
    //         console.log(log.args)
    //         tokenId3 = log.args[0].toNumber();
    //     }
    // });
    // await marketplace.listNft(boredPets.address, tokenId3, 1, {value: listingFee})
    // console.log(`Minted and listed ${tokenId3}`)

    console.log("Minted all three NFTs")

    await logNftLists(marketplace)

    

    console.log('BUY 1 NFTs')
    await marketplace.buyNft(boredPets.address, tokenId1, {value: 1})
    //await marketplace.buyNft(boredPets.address, tokenId2, {value: 1})
    await logNftLists(marketplace)

    console.log('RESELL 1 NFT')
    await marketplace.resellNft(boredPets.address, tokenId1, 1, {value: listingFee})
    await logNftLists(marketplace)

  } catch(err) {
    console.log('Doh! ', err);
  }
  cb();
}

module.exports = main;