const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/add_User", async (req, res) => {
  const { name, email, password, role, branchId } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Manager already exists" });
    }
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      branch_id: branchId,
    });

    await user.save();
    res.status(201).json({ msg: "Manager registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    const payload = {
      user: {
        id: user._id,
        role: user.role,
        branch: user.branch,
      },
    };
    jwt.sign(payload, "yourJWTSecret", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload.user });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
