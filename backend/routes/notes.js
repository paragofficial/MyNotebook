const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the notes using :GET "/api/auh/getuser". login required 
router.get('/fetchallnotes', fetchuser,async (req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
    res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server occured");
    }
})

// Route 2: Add a new note using :POST "/api/auh/addnote". login required 
router.post('/addnote', fetchuser,[
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),], async (req,res)=>{
        try {
    const {title, description , tag }= req.body;
    // If there are errors, return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title, description, tag, user: req.user.id
      })
      const savedNotes = await note.save()
    res.json(savedNotes);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server occured");
}
})

// Route 3: Update a existing note using :PUT "/api/notes/updatenote". login required 
router.put('/updatenote/:id', fetchuser, async (req,res)=>{
    const {title, description, tag}= req.body;
    try {
        
   
    // Create a newNote object 
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated and update it 
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server occured");
}
    })


// Route 4: Delete a existing note using :DELETE "/api/notes/deletenote". login required 
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    try {
    // Find the note to be updated and delete it 
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    // allow deletion only if user owns this note 
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleated sucessfully", note: note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server occured");
}
    })
    

module.exports = router