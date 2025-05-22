const usersRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controller/users");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

usersRouter.get("/", getUsers);
usersRouter.get("/me", getCurrentUser);
usersRouter.get("/:userId", getUserById);

usersRouter.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(100).required(),
    }),
  }),
  updateProfile
);
usersRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  updateAvatar
);

module.exports = usersRouter;
