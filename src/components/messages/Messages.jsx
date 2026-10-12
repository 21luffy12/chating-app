import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
// import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	// useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-8 py-6 flex-1 overflow-y-auto no-scrollbar'>
            {/* Center date label like in design */}
            <div className="flex justify-center mb-6">
                 <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">NOVEMBER 11, 2023</span>
            </div>

      {!loading && messages.length > 0 && messages.map((message)=>(
        <div key={message._id} ref={lastMessageRef}>
			<Message message={message}/>
		</div>
      ))}

      {loading && [Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-gray-400 mt-10">Say hi to start the conversation!</p>
      )}
    </div>
	);
};
export default Messages;