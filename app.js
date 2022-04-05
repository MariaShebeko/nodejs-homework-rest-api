// akHrM6XU9YTYrwZG
// mongodb+srv://Maria:akHrM6XU9YTYrwZG@cluster0.p4lfe.mongodb.net/test
const mongoose = require("mongoose");

const { DB_HOST } = require("./config");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
