const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summary");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.post("/createSummary/:id", summaryController.createSummary);

router.delete("/deletePost/:id", summaryController.deletePost);

module.exports = router;
