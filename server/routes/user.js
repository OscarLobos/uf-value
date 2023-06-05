const express = require("express");

const router = express.Router();

const { login, logout } = require("../controllers/User");

router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
