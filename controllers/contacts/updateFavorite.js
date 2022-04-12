const { Contact } = require("../../models");
const createError = require("http-errors");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404, `Product with id=${contactId} not found.`);
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = updateFavorite;