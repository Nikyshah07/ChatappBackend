const { Message } = require("../models/messageModel.js");
const {Conversation}=require('../models/conversationModel.js')
const mongoose=require('mongoose');
const { getReceiverSocketId ,io} = require("../Socket/socket.js");
const sendMessage=async(req,res)=>{
    try{
const {messages}=req.body;
const {id:receiverId}=req.params;
const senderId=req.user._id;
console.log(receiverId);
console.log(senderId);
console.log('hello')
let chats=await Conversation.findOne({
    participants:{$all:[senderId,receiverId]}
})

if(!chats)
{
    chats=await Conversation.create({
        participants:[senderId,receiverId]
    })
}

const newMessages=new Message({
    senderId,receiverId,message:messages,conversationId:chats._id
})

if(newMessages)
{
    chats.messages.push(newMessages._id)

}
await Promise.all([chats.save(),newMessages.save()])


const receiverSocketId=getReceiverSocketId(receiverId);
if(receiverSocketId)
{
    io.to(receiverSocketId).emit("newMessage",newMessages)
}



res.status(201).json(newMessages)
    }catch(error)
    {
        res.status(201).json({success:false,message:error})
        console.log(error)
    }
}








// const getMessages=async(req,res)=>{
//     const {id:receiverId}=req.params;
//     const senderId=req.user._conditions._id;

//     const chats=await Conversation.findOne({
//         participants:{$all:[senderId,receiverId]}
//     }).populate("messages");

//     if(!chats)
//     {
//         return res.status(200).json([])
//     }
//     const message=chats.messages;
//     res.status(200).json(message)
// }



// module.exports={sendMessage,getMessages}



const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Ensure receiverId and senderId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(receiverId) || !mongoose.Types.ObjectId.isValid(senderId)) {
            return res.status(400).json({ message: "Invalid receiverId or senderId " });
        }

        const chats = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!chats) {
            return res.status(200).json([]);
        }
        const message = chats.messages;
        res.status(200).json(message);
    } catch (error) {
        console.error("Error in getMessages:", error);  // Log the error for debugging
        res.status(500).json({ success: false, message: error.message }); // Send error message
    }
}

module.exports = { sendMessage, getMessages }