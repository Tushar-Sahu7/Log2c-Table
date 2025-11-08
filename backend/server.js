const express = require("express");
const connectDB = require("./config/db");
const User = require("./model/User");
const cors = require("cors")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const app = express();

app.use(express.json())

//enable CORS for frontend request
app.use(cors())


app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT || 7777, () => {
      console.log("Server is listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected..");
  });
