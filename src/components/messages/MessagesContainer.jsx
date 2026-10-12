import { useEffect } from "react";
import useConverstaion from "../../zustand/useConverstaion";
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { TiMessages } from "react-icons/ti"
import { FaPhoneAlt, FaVideo, FaEllipsisH } from "react-icons/fa";

const MessagesContainer = () => {
  const {selectedConversation, setSelectedConversation} = useConverstaion();

  useEffect(()=>{
    // for cleanup after refresh
    return()=>setSelectedConversation(null);
  }, [setSelectedConversation])
  
  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFC] w-full h-full relative">
      {!selectedConversation ? (
        <NoChatSelected/>
      ):(
        <>
        {/* Header Header */}
        <div className="bg-white px-8 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm z-10 w-full">
            <div className="flex items-center gap-4">
                <div className="avatar w-12 h-12">
						<img src={selectedConversation.profilePic} alt="user avatar" className="rounded-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-900 font-bold text-lg">{selectedConversation.fullname}</span>
                    <div className="flex gap-6 mt-1 text-sm font-semibold">
                        <span className="text-blue-500 border-b-[3px] border-blue-500 pb-1 cursor-pointer inline-block">Conversation</span>
                        <span className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors inline-block">Files</span>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-6 text-blue-500">
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors"><FaPhoneAlt size={18} /></button>
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors"><FaVideo size={20} /></button>
                <button className="hover:bg-blue-50 p-2 rounded-full transition-colors"><FaEllipsisH size={20} /></button>
            </div>
        </div>

        <Messages />
        <MessageInput/>
        </>
      )}
    </div>
  )
};
export default MessagesContainer;

const NoChatSelected = () => {
  return(
    <div className="flex items-center justify-center w-full h-full">
    <div className="px-4 text-center sm:text-lg md:text-xl text-gray-400 font-semibold flex flex-col items-center gap-2">
      <p>Welcome!</p>
      <p>Select a chat to start messaging</p>
      <TiMessages className="text-6xl text-center text-blue-400 opacity-50"/>
    </div>
  </div>
)
}