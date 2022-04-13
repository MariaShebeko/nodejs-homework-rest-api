const express = require("express");

const { validation, controllerWrapper, auth } = require("../../middlewares");
const { users: controller } = require("../../controllers");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validation(joiSignupSchema),
  controllerWrapper(controller.signup)
);

router.post(
  "/login",
  validation(joiLoginSchema),
  controllerWrapper(controller.login)
);

router.get("/current", auth, controllerWrapper(controller.getCurrent));

router.get("/logout", auth, controllerWrapper(controller.logout));

module.exports = router;
