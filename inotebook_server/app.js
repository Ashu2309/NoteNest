require("dotenv").config();
// const connectToMongo = require("./src/db");
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
// connectToMongo();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
//available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


// app.get("/api/v1/login", (req, res) => {
//   res.send("Sign in");
// });
// app.get("/api/v1/signup", (req, res) => {
//   res.send("Sign up");
// });
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("inotebookf/build"));
// const path = require("path");
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
// });
// }

const mongoURI = "mongodb+srv://ashuinotebook:" +
  encodeURIComponent("ashuinotebook#2309!") +
  "@cluster0.ximv4ax.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(
  mongoURI,
  () => {
    console.log("Mongo Connected Successfully");
  }
);

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
