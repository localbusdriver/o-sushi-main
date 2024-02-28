const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const userController = require("./src/controllers/userController");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

require("dotenv").config();
let fetch;

// Immediately Invoked Function Expression (IIFE) to load fetch
(async () => {
  fetch = await import("node-fetch").then((module) => module.default);
})();

const MONGO_URL = process.env.MONGO_DB || "";
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views", "users"),
  path.join(__dirname, "views", "products"),
]);
app.use(express.static(path.join(__dirname + "./public")));
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// Named exports
module.exports = {
  app: app,
  // server: server
};

app.get("/", (req, res) => {
  try {
    res.render("home");
  } catch {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.get("/menu", async (req, res) => {
  try {
    res.render("menu");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/about", async (req, res) => {
  try {
    res.render("about");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.get("/contact", async (req, res) => {
  try {
    res.render("contact");
  } catch {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.post(
  "/contact",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    check("subject").notEmpty().withMessage("Subject is required"),
    check("message").notEmpty().withMessage("Message is required"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    userController.sendInquiry(req, res);
  }
);

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("tiny"));
