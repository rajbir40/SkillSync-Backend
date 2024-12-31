import Notes from "../models/Notes.js";
import User from "../models/User.js";
import Session from "../models/Session.js";

// Create and save a note
export const createAndSaveNote = async (req, res) => {
    const { userID, sessionID, description } = req.body;

    if (!userID || !sessionID || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const session = await Session.findById(sessionID);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      const note = new Notes({
        userID,
        sessionID,
        description,
      });

      await note.save();

      res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating the note",
        error: error.message,
    })
      }
    }

// Get all notes
export const getAllNotes = async (req, res) => {
    try {
      const notes = await Notes.find();
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching notes",
        error: error.message,
      });
    }
  };


// Delete a note
  export const deleteNote = async (req, res) => {
    const { id } = req.params; // Get the note ID from the request
  
    try {
      const note = await Notes.findByIdAndDelete(id);
  
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
  
      res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while deleting the note",
        error: error.message,
      });
    }
  };