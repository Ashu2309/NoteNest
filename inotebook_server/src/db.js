const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://ashuinotebook:" +
  encodeURIComponent("ashuinotebook#2309!") +
  "@cluster0.ximv4ax.mongodb.net/?retryWrites=true&w=majority";
// const mongoURI = "mongodb://localhost:27017";

const connectToMongo = () => {
  mongoose.connect(
    mongoURI,
    () => {
      console.log("Mongo Connected Successfully");
    }
  );
};

module.exports = connectToMongo;
