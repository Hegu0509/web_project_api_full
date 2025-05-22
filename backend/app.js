const express = require("express");
const app = express();
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middleware/auth");
const { celebrate, Joi, errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
const error = require("./middleware/error");
const { login, createUser } = require("./controller/users");
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://localhost:27017/aroundb", {})
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos", error);
  });

app.use(express.json());

var cors = require("cors");
app.use(cors());
app.options("*", cors());

app.use(requestLogger);

app.use(error);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().optional(),
      about: Joi.string().optional(),
      avatar: Joi.string().optional(),
    }),
  }),
  createUser
);

app.use(auth);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errorLogger);

app.use(errors());

app.get("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).send({
    err,
    message:
      statusCode === 500 ? "An internal server error has ocurred" : message,
  });
});
