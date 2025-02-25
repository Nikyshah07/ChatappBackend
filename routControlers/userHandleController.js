const { Conversation } = require("../models/conversationModel.js");
const { User } = require("../models/userModel.js");

const getUserBySearch=async(req,res)=>{
    try{
        console.log("getUserBySearch - req.user:", req.user);
        const search=req.query.search || '';
        const currentUserID=req.user._id;
        const user=await User.find({
            $and:[
                {
                $or:[
{username:{$regex:'.*'+search+'.*',$options:'i'}},
{fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                ]
            },
            {
                _id:{$ne:currentUserID}
            }
            ]
        }).select("-password").select("email")
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({
              success:false,
              message:error
          })
          console.log(error);
      }
}



// const getChatters=async(req,res)=>{
//     try{
//         const currentUserID=req.user._id;
//         const currentChatters=await Conversation.find({
//             participants:currentUserID
//         }).sort({updateAt:-1})

//         if(!currentChatters || currentChatters.length===0)
//         {
//             return res.status(200).json([]);

//         }
//         const participantsIDS=currentChatters.reduce((ids,conversation)=>{
//             const otherParticipants=conversation.participants.filter(id=>id!==currentUserID);
//             return [...ids,...otherParticipants]
//         })
// const otherParticipants=participantsIDS.filter(id=>id.toString()!==currentUserID.toString());
// const user=User.find({_id:{$in:otherParticipants}}).select("-password").select('-email');
// const users=otherParticipants.map(id=>user.find(user=>user._id.toString() === id.toString()))
// res.status(200).json(users)
// // console.log(users)
//     } catch(error){
//         res.status(500).json({
//               success:false,
//               message:error
//           })
//         }
// }


const getChatters = async (req, res) => {
    try {
        const currentUserID = req.user._id;
        console.log("getChatters - currentUserID:", currentUserID);

        const currentChatters = await Conversation.find({
            participants: currentUserID
        }).sort({ updatedAt: -1 });
        console.log("getChatters - currentChatters:", currentChatters);


        if (!currentChatters || currentChatters.length === 0) {
            console.log("getChatters - No current chatters found");
            return res.status(200).json([]);
        }

        const participantsIDS = currentChatters.reduce((ids, conversation) => {
            const otherParticipants = conversation.participants.filter(id => id.toString() !== currentUserID.toString());
            return [...ids, ...otherParticipants];
        }, []);
        console.log("getChatters - participantsIDS:", participantsIDS);

        const otherParticipants = participantsIDS.filter(id => id.toString() !== currentUserID.toString());
        console.log("getChatters - otherParticipants:", otherParticipants);

        // Fetch all users in a single query
        const users = await User.find({ _id: { $in: otherParticipants } }).select("-password").select('-email');
        console.log("getChatters - users:", users);

        // Map the IDs to the user objects
        const mappedUsers = otherParticipants.map(id => {
            return users.find(user => user._id.toString() === id.toString());
        });
        console.log("getChatters - mappedUsers:", mappedUsers);

        res.status(200).json(mappedUsers);

    } catch (error) {
        console.error("getChatters - Error:", error); // Use console.error for errors
        res.status(500).json({
            success: false,
            message: error.message // Include the error message
        });
    }
};
module.exports={getUserBySearch,getChatters}


