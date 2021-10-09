const express = require("express");
const auctionsRouter = express.Router();
const authentication = require("../middlewares/authentication");

const {
  createAuction,
  getAllAuctions,
  getAuctionById,
  deleteAuctionById,
  getAuctionsByUserId,
} = require("../controllers/auctionsController");

auctionsRouter.post("/", authentication, createAuction);
auctionsRouter.get("/", getAllAuctions);
auctionsRouter.get("/user_auctions", authentication, getAuctionsByUserId);

auctionsRouter.put("/:auction_id", getAuctionById);
auctionsRouter.delete("/:auction_id", deleteAuctionById);

module.exports = auctionsRouter;