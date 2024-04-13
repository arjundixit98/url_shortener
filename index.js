const express = require("express");
const path = require("path");
const URL = require("./models/url");
const connectToMongoDB = require("./connection");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", staticRoute);
app.use("/url", urlRoute);

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongo DB connected")
);

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
