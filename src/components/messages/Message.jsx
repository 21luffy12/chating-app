import { extractTime } from "../../utils/extractTime";
import { useAuthContext } from "../../context/AuthContext";
import useConverstaion from "../../zustand/useConverstaion";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConverstaion();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	
	// Update variables for the new design
	const chatClassName = fromMe ? "items-end" : "items-start";
	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	
	const bubbleBgColor = fromMe ? "bg-[#2563EB] text-white rounded-[20px] rounded-br-[4px]" : "bg-white text-gray-800 rounded-[20px] rounded-tl-[4px] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50";

	return (
		<div className={`flex flex-col w-full mb-6 ${chatClassName}`}>
		    <div className={`flex gap-3 max-w-[75%] ${fromMe ? "flex-row-reverse" : "flex-row"}`}>
                
                {!fromMe && (
                    <div className='w-8 h-8 rounded-full flex-shrink-0 mt-auto mb-1'>
                        <img alt='avatar' src={profilePic} className="w-full h-full rounded-full object-cover box-border border-[1px] border-gray-100"/>
                    </div>
                )}
                
                <div className="flex flex-col">
                    <div className={`px-6 py-3.5 ${bubbleBgColor} text-[15px] leading-relaxed relative`}>
                        {message.message}
                    </div>
                    {/* Time placed below the message */}
                    <span className={`text-[11px] text-gray-400 mt-[6px] font-medium ${fromMe ? "text-right" : "text-left ml-1"}`}>
                        {formattedTime}
                    </span>
                </div>

            </div>
		</div>
	);
};
export default Message;