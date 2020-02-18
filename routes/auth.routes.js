const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = Router();

router.post("/signin", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json("user not found");
    }
    const token = jwt.sign({ userId: user._id }, config.get("jwtSecret"));
    res.status(200).json({ login, token });
  } catch (e) {
    console.log(e);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });
    if (candidate) {
      console.log(candidate);
      return res.json("user exists");
    }
    const hahedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      login,
      password: hahedPassword
    });
    await user.save();
    console.log(user);
    const token = jwt.sign({ userId: user._id }, config.get("jwtSecret"));
    res.status(201).json({ login, token });
  } catch (e) {
    console.log(e);
  }
});

router.get("/autologin", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json("not authorization");
    }
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(401).json("not authorization");
    }
    res.status(200).json({ login: user.login, token });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
