const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Bringing in model
const Item = require("../../models/Item");

// @route  GET  /Get all items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST /Post an item to the database
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

// @route DELETE /Delete an item from the database
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id).then((item) =>
    item.remove().then(() => res.json({ success: true }))
  );
});

module.exports = router;
