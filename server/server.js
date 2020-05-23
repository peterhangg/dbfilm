const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const connectMongoDB = require("./config/db");

const app = express();
dotenv.config({ path: "./config/.env"});
app.use(express.json());

connectMongoDB();

if (process.env.ENV === "development") {
  // outputs response status and time
  app.use(morgan("dev"));
};

if (process.env.ENV === "production") {
  // Set static folders
  app.use(express.static("../client/build"));

  // sets page routes index.html
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
};

const PORT = process.env.PORT || 8001;
app.listen(PORT, console.log(`SERVER RUNNING IN ${process.env.ENV} MODE ON PORT ${PORT}`.green.bold));