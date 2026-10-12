import { useState } from "react"
import { BsSend } from "react-icons/bs"
import { FiPaperclip } from "react-icons/fi"
import { HiOutlineEmojiHappy } from "react-icons/hi"
import useSendMessage from "../../hooks/useSendMessage"

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message)
    setMessage("")
  }
  return (
    <div className="px-8 pb-6 bg-[#F9FAFC] z-10 w-full relative border-t-0">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
        
        {/* Main Input Wrapper */}
        <div className="flex-1 bg-white rounded-full flex items-center px-4 py-3 shadow-[0_2px_15px_rgb(0,0,0,0.04)] border border-gray-100">
            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors p-2">
                <FiPaperclip size={20} />
            </button>
            
            <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none px-3 text-gray-800 placeholder-gray-400 font-medium text-[15px]"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            
            <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors p-2">
                 <HiOutlineEmojiHappy size={22} />
            </button>
        </div>

        {/* Send Button */}
        <button 
            type="submit" 
            className="w-[52px] h-[52px] flex-shrink-0 bg-[#2563EB] hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-colors shadow-[0_4px_15px_rgb(37,99,235,0.3)]"
            disabled={loading}
        >
            {loading ? <div className="loading loading-spinner loading-sm"></div> : <BsSend size={20} className="ml-1" />}
        </button>
        
        </form>
    </div>
  )
}
export default MessageInput
