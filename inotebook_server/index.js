require("dotenv").config();
const connectToMongo = require("./src/db");
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
connectToMongo();
const app = express();

const corsOptionForCredentials = {
  origin: process.env['REACT_APP_PORT'],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  credentials: true,
};
app.use(cors(corsOptionForCredentials))
const port = process.env.SERVER_PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
//available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));



app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
