require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  //connect to db
  await mongoose.connect(uri);
};

module.exports = connectDB;
