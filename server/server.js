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

app.get('/', (req, res) => res.send('Server is up and running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`SERVER RUNNING IN ${process.env.ENV} MODE ON PORT ${PORT}`.green.bold));