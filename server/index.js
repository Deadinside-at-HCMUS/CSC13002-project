require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const app = express();

const authRouter = require("./routes/auth");

connection();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
