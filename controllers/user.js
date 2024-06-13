const User = require("../models/user");
const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");

//Adding comment to test git fork
const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const sessionId = uuidv4();

  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });

  if (!user)
    return res.render("login", { error: "Invalid Username or password!" });

  res.cookie("uid", sessionId);
  setUser(sessionId, user);

  return res.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
