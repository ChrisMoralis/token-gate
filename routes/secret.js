const Moralis = require("moralis/node");

/**
 * @description
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 */
const secret = async (req, res) => {
  try {
    // Initialize Moralis
    await Moralis.start({
      appId: "uyAKLRxIEZlJBYRpBEH9d5KXZZfWcpff1uVitdOB",
      serverUrl: "https://clcnpidf7osz.usemoralis.com:2053/server",
      masterKey: "l3s7o65q03rhgBZBzTuV0BhjRDI37ZSGPAQbCIpu",
    });

    // Query Session From DB
    const query = new Moralis.Query("_Session");
    const { sessionToken } = req.body;
    query.include("user");
    query.equalTo("sessionToken", sessionToken);
    query.limit(1);
    const result = await query.find({ useMasterKey: true });

    // Check whether user own certain NFT on MATIC
    if (result.length > 0) {
      const _address = result[0].get("user").get("accounts");
      const CONTRACT_ADDRESS = "0x6638cb79f6c1c70b09e8b6efebca3233d3240c74";
      const NFTs = await Moralis.Web3API.token.getNFTOwners({
        address: CONTRACT_ADDRESS,
        chain: "matic",
      });

      // If no NFT found, then return empty array for `NFTdata`
      res.send({
        NFTdata: NFTs.result.find((nft) => nft.owner_of === _address) || [],
        user: _address,
      });
    } else {
      res.send({});
    }
  } catch (error) {
    res.error({ error });
  }
};

module.exports = secret;
