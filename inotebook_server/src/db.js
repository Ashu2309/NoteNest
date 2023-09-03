const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://ashuinotebook:ashuinotebook#2309!@cluster0.ximv4ax.mongodb.net/?retryWrites=true&w=majority";
const connectToMongo = () => {
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log("Mongo Connected Successfully");
    }
  );
};

module.exports = connectToMongo;
