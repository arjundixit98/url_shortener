require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectToMongoDB = require("./connection");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");
const app = express();
const PORT = process.env.PORT || 8080;

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", checkAuth, staticRoute);
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);

connectToMongoDB(process.env.MONGODB_URL).then(() =>
  console.log("Mongo DB connected")
);

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
