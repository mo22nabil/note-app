const endPoint = require("../endPoind/note.endpoint")
const { auth } = require("../middlewear/auth")
const validation = require("../middlewear/validation")
const { addNote, getNotes, updateNote, deleteNote } = require("../services/note.services")
const { addNoteValidator, updateNoteValidator } = require("../validation/note.validation")

const router = require("express").Router()

router.route('/')
.post(validation(addNoteValidator),auth(endPoint.addNote),addNote)
.get(getNotes)
.delete(deleteNote)
router.put('/:id',validation(updateNoteValidator),auth(endPoint.updateNote),updateNote)


module.exports = router