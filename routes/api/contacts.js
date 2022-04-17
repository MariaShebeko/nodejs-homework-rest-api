const express = require("express");

const { validation, controllerWrapper, auth } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts: controller } = require("../../controllers");

const router = express.Router();

router.get("/", auth, controllerWrapper(controller.listContacts));

router.get("/:contactId", controllerWrapper(controller.getContactById));

router.post(
  "/",
  auth,
  validation(joiSchema),
  controllerWrapper(controller.addContact)
);

router.delete("/:contactId", controllerWrapper(controller.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(controller.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  controllerWrapper(controller.updateFavorite)
);

module.exports = router;
