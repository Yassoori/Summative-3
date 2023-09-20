require("dotenv").config();
const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const cors = require("cors");

//import routes
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const commentRoutes = require("./routes/comment");

//use CORS
app.use(cors());

//Parse JSON data to convert into a Javascript object
app.use(express.json());

//logged out the path and method of each request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Attach Routes to our app
app.use("/api/users/", userRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/comments", commentRoutes);
app.use("/public/uploads", express.static("public/uploads"));

//Mongo username, password, database
const mongoUsername = process.env.MONGODB_USERNAME;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoDatabase = process.env.MONGO_DATABASE;

//Mongo url
const mongoURL = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.ggo2lnw.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  res.send("Hello, this is your Express server");
});

app.listen(port, () => {
  console.log(`Express sever is running on http://localhost:${port}`);
});

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
