const express = require("express");

const router = express.Router();

const { getAll, store } = require("../controllers/UFValues");
const auth = require("../middleware/auth");

router.get("/", getAll);
router.post("/", store);

module.exports = router;
