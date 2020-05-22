const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

const app = express();
dotenv.config({ path: "./config/.env"});
app.use(express.json());

app.get("/", (req, res) => res.send("HELLO WORLD"));

if (process.env.ENV === "development") {
  app.use(morgan("dev"));
};

const PORT = process.env.PORT || 8001;
app.listen(PORT, console.log(`SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.yellow.bold));