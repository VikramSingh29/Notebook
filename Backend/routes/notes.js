const express = require("express");
const { validationResult } = require("express-validator");
const fetchuser = require("../middlewares/fetchuser");
const Notes = require("../models/Notes");
const noteValidationRules = require("../validators/noteValidation");
const router = express.Router(); // Router-level middleware

// Route1: Getting all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json({ success: true, notes });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Route 2: Create a Note using: POST "/api/notes/addnote". Login Required

router.post("/addnote", noteValidationRules(), fetchuser, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    // Destructure fields from the request body
    const { title, description, tag, category } = req.body;

      // Validate input
      if (!category) {
        return res.status(400).json({ success: false, error: "Category is required" });
    }

    // Create and save a new note
    const note = new Notes({
        user: req.user.id,
        title,
        description,
        tag,
        category
    });
    const savedNote = await note.save();
    res.json({ success: true, note: savedNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Route 3: Update Note using: Post "/api/notes/updatenote". Login Required
router.put('/updatenote/:id', noteValidationRules(), fetchuser, async (req, res) => {
    try {
        const { title, description, tag, category } = req.body;

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        // Create a newNote object with conditional updates
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
        if (category) newNote.category = category;

        // Find the note to update
        const noteId = req.params.id;
        let note = await Notes.findById(noteId);

        if (!note) {
            return res.status(404).json({ success: false, error: "Note not found" });
        }

        // Check if the note belongs to the logged-in user
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: "Unauthorized access" });
        }

        // Update the note
        note = await Notes.findByIdAndUpdate(
            noteId,
            { $set: newNote },
            { new: true } // Return the updated note
        );

        res.json({ success: true, note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Route 4 : Delete note

router.delete('/deletenote/:id',noteValidationRules(), fetchuser,async(req,res)=>{
    try {
        const { title, description, tag } = req.body;

         // Find the note to delete
         const noteId = req.params.id;
         let note = await Notes.findById(noteId);
         if (!note) {
            return res.status(404).json({ success: false, error: "Note not found" });
        }

         // Check if the note belongs to the logged-in user
         if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: "Unauthorized access" });
        }
 // delete the note
 note = await Notes.findByIdAndDelete(req.params.id);

res.json({ success: true, Status:"Note has been Deleted Succesfully"  });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

//Route 5 : 
router.get('/fetchbycategory/:category', fetchuser, async (req, res) => {
  try {
      const category = req.params.category;

      // Fetch notes by category and user
      const notes = await Notes.find({
          user: req.user.id,
          category: category
      });

      if (!notes || notes.length === 0) {
          return res.status(404).json({ success: false, error: "No notes found for this category" });
      }

      res.json({ success: true, notes });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});



module.exports = router;

