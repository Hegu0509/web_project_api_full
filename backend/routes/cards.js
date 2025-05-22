const cardsRouter = require("express").Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controller/cards");

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCard);
cardsRouter.delete("/:cardId", deleteCard);
cardsRouter.put("/likes/:cardId", likeCard);
cardsRouter.delete("/likes/:cardId", dislikeCard);
module.exports = cardsRouter;
