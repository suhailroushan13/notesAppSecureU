import express from "express";
import mongoose from "mongoose";
import { noteModel } from "../../models/User.js"; // Adjust the path as necessary

const router = express.Router();

// Middleware to authenticate and set user session ID
const authenticate = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ msg: "Unauthorized" });
    }
};

// Get all notes for the logged-in user
router.get("/notes", authenticate, async (req, res) => {
    try {
        const notes = await noteModel.find({ owner: req.session.userId });
        if (notes.length === 0) {
            res.status(200).json({ msg: "No Notes Added" });
        } else {
            res.json(notes);
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

// Get a single note for the logged-in user
router.get("/notes/:noteId", authenticate, async (req, res) => {
    try {
        const note = await noteModel.findOne({ _id: req.params.noteId, owner: req.session.userId });
        if (note) {
            res.json(note);
        } else {
            res.status(404).send("Note not found");
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});


// Add a note for the logged-in user
router.post("/notes", authenticate, async (req, res) => {
    try {
        const newNote = new noteModel({
            ...req.body,
            owner: req.session.userId
        });
        const savedNote = await newNote.save();
        res.status(201).json({ msg: 'Note Added Successfully' });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

// Update a note for the logged-in user
router.put("/notes/:noteId", authenticate, async (req, res) => {
    try {
        const updatedNote = await noteModel.findOneAndUpdate(
            { _id: req.params.noteId, owner: req.session.userId },
            req.body,
            { new: true }
        );
        if (updatedNote) {
            res.status(201).json({ msg: 'Note Update Successfully' });
        } else {
            res.status(404).json({ msg: "Note not found" })
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

// Delete a note for the logged-in user
router.delete("/notes/:noteId", authenticate, async (req, res) => {
    try {
        const deletedNote = await noteModel.findOneAndDelete({ _id: req.params.noteId, owner: req.session.userId });
        if (deletedNote) {
            res.status(201).json({ msg: 'Note Deleted Successfully' });
        } else {
            res.status(404).json({ msg: "Note not found" })
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
});

// Delete all notes for the logged-in user
router.delete("/notes", authenticate, async (req, res) => {
    try {
        const result = await noteModel.deleteMany({ owner: req.session.userId });
        res.json({ message: "All notes deleted", count: result.deletedCount });
    } catch (error) {
        res.status(500).json({ msg: "All Notes Deleted" })
    }
});

export default router;
