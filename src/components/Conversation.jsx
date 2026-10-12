/* eslint-disable react/prop-types */

import useConverstaion from "../zustand/useConverstaion";

const Conversation = ({conversation,lastIdx}) => {
     const  {selectedConversation, setSelectedConversation} = useConverstaion();
     const isSelected = selectedConversation?._id === conversation._id;
     
     // Generate visual mock elements
     const randomTime = "09:38";
     const randomUnread = Math.floor(Math.random() * 30);
     const showBadge = randomUnread > 15;

    return ( 
    <>
        <div className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-200
        ${isSelected ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02] z-10 relative border border-gray-50" : "hover:bg-gray-50 bg-transparent"}
        `}
      onClick={() => setSelectedConversation(conversation)}
      >
            <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                    src={conversation.profilePic}
                    alt="user avatar"
                    className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                    <p className={`font-bold text-[15px] truncate ${isSelected ? "text-gray-900" : "text-gray-800"}`}>{conversation.fullname}</p>
                    <span className={`text-xs font-medium ${isSelected ? "text-gray-500" : "text-gray-400"}`}>{randomTime}</span>
                </div>
                <div className="flex justify-between items-center">
                    <p className={`text-sm truncate pr-2 ${isSelected ? "text-gray-500" : "text-gray-400"}`}>Lorem Ipsum is simply dummy text.</p>
                    {showBadge && (
                         <div className="w-[22px] h-[22px] flex items-center justify-center bg-[#FF4F4F] rounded-full text-white text-[10px] font-bold flex-shrink-0">
                             {randomUnread}
                         </div>
                    )}
                </div>
            </div>
        </div>
    </>
    )
};
export default Conversation;