const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const authroute = require("./routes/auth");
const imageroute = require("./routes/image");
const userroute = require("./routes/users");
const postroute = require("./routes/posts");
const commentroute = require("./routes/comments");
const cors = require("cors");
const upload = require("./middleware/multer");
//database
const dotenv = require("dotenv");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

//image upload

//middlewares
app.use(express.json());
app.use(cors( {  credentials: true, // This allows credentials (cookies, authorization headers, TLS client certificates)  
               }));
app.use(cookieParser());
app.use("/api/upload", imageroute);
app.use("/api/auth", authroute);
app.use("/api/users", userroute);
app.use("/api/posts", postroute);
app.use("/api/comments", commentroute);

dotenv.config();
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`app running on ${process.env.PORT}`);
});
