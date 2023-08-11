require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const app = express();

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

connection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // Add this line

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
