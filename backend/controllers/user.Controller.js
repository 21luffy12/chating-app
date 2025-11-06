import User from "../models/user.model.js"

export const getUserForSidebar = async (req,res) =>{
    try{
        const loggedInUserId = req.user._id
        
        const fillterUsers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password") //{_id: {$ne: loggedInUserId}} :-this help to not to show loginuser on the chating area
        
        res.status(200).json(fillterUsers)
    }catch(error){
        console.log("Error in getUersForSidebar:", error)
        res.status(500).json({error:"Internal server error"})
    }
}