
const noteModel = require("../models/note.model")



module.exports.addNote = async (req,res)=>{
    const {title,desc} = req.body;
    // console.log(req.user);
    await noteModel.insertMany({title,desc,userId:req.user._id});
    res.json({message:"success"})
}

module.exports.getNotes = async (req,res)=>{
    // const userId = req.header('userId');
    let page  =req.query.page;
    if (page==undefined||page<=0) {
        page=1;
    }
    let page_limit = 5;
    let Skip  = (page-1)*page_limit;
    let notes =await noteModel.find({}).skip(Skip).limit(page_limit)
    // .populate('userId','name -_id').select('title desc -_id')
    res.json({page ,notes}) 
}

module.exports.updateNote = async(req,res)=>{
    const {title,desc}  = req.body;
    const update =await noteModel.updateOne({_id:req.params.id ,userId:req.user._id },{title,desc},{new:true})
    res.json({message:"updated",update})
}

module.exports.deleteNote = async(req,res)=>{
    const {noteId}  = req.body;
    await noteModel.deleteOne({_id:noteId})
    res.json({message:"deleted"})
}