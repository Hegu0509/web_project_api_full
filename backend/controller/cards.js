const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((cards) => {
      if (!cards) {
        const error = new Error("No data");
        error.status = 404;
        throw error;
      }
      res.send(cards);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => card.populate("owner"))
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ message: "Invalid data" });
    });
};

module.exports.deleteCard = (req, res) => {
  const card = Card.findById(req.params.cardId).then((card) => {
    console.log("card", card);
    if (!card) {
      const error = new Error("");
      error.status = 404;
      throw error;
    }

    if (!card.owner.equals(req.user._id)) {
      const error = new Error("");
      error.status = 403;
      throw error;
    }

    return card;
  });

  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error("Invalid request");
      res.status(400);
      throw error;
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .populate("owner")
    .orFail(() => {
      const error = new Error("Cannot find card");
      error.status = 404;
      throw error;
    })
    .then((card) => {
      res.send(card);
    })

    .catch((err) => {
      console.log("likeCard Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .populate("owner")
    .orFail(() => {
      const error = new Error("Cannot find card");
      error.status = 404;
      throw error;
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log("dislikeCard Error:", err);
      res.status(err.status).send({ error: err.message });
    });
};
