const express = require("express");
const Qualities = require("../models/Qualities");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Qualities.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Server Error ty again later" });
  }
});

module.exports = router;
