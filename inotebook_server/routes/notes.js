const express = require("express");
const router = express.Router();
const fetchUser = require('../Middleware/fetchUser');
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

router.get("/fetchUser", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal error has been occured");
  }
});

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter Valid title").isLength({ min: 2 }),
    body("description", "Enter valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // check validate and respond accordingly
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal error has been occured");
    }
  }
);

router.put(
  "/updatenote/:id",
  fetchUser,
  [
    body("title", "Enter Valid title").isLength({ min: 2 }),
    body("description", "Enter valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag, date } = req.body;
      // check validate and respond accordingly
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      newNote.date = Date.now();

      //Find note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.send("Not Found").status(401);
      }

      if (note.user.toString() !== req.user.id) {
        return res.send("Not Allowed").status(401);
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal error has been occured");
    }
  }
);

//deletion
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //Find note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.send("Not Found").status(404);
    }

    if (note.user.toString() !== req.user.id) {
      return res.send("Not Allowed").status(401);
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note Deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal error has been occured");
  }
});

module.exports = router;
