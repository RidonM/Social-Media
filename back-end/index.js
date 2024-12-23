const express = require("express");
const cors = require("cors");
const userController = require("./controllers/userController");
const postsController = require("./controllers/postsController");
const likesController = require("./controllers/likesController");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    preflightContinue: true,
  })
);
app.options("*", cors());

app.use(express.json());

app.use("/users", userController);
app.use("/posts", postsController);
app.use("/likes", likesController);

app.listen(8585);
