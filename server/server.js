const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const path = require("path");
const connectMongoDB = require("./config/db");

const app = express();
dotenv.config({ path: "./config/.env"});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectMongoDB();

// Use Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/favourite", require("./routes/favourite"));

// if (process.env.ENV === "development") {
//   // logs response status and time
//   app.use(morgan("dev"));
// };

if (process.env.ENV === "production") {
  // Set static folders
  app.use(express.static("../client/build"));

  // sets page routes index.html
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
};

const PORT = process.env.PORT || 8001;
app.listen(PORT, console.log(`SERVER RUNNING IN ${process.env.ENV} MODE ON PORT ${PORT}`.green.bold));