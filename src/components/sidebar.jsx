import Conversations from "./Conversations";
import Logoutbutton from "./Logoutbutton";
import SearchInput from "./SearchInput";
import { useAuthContext } from "../context/AuthContext";
import { FaBell } from "react-icons/fa";

function Sidebar() {
  const { authUser } = useAuthContext();
  
  return (
    <div className='w-[580px] border-r border-gray-100 p-6 flex flex-col bg-white overflow-hidden max-h-full h-full padding-100'> 
        {/* User Profile Header */}
        <div className=" w-full flex items-center justify-between mb-8">
            <div className=" w- full flex items-center gap-3">
                <div className="avatar w-12 h-12">
                   <img src={authUser?.profilePic || "https://avatar.iran.liara.run/public"} alt="user avatar" className="rounded-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800 text-lg leading-tight">{authUser?.fullname || "User"}</span>
                    <span className="text-sm font-medium text-gray-400">@{authUser?.username || "username"}</span>
                </div>
            </div>
            <button className="text-red-400 hover:text-red-500 relative transition-colors">
                <FaBell size={20} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
        </div>

        <SearchInput/>
        
        <div className="mt-8 flex-1 overflow-y-auto w-full no-scrollbar pr-2 pb-4">
            <Conversations/>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
            <Logoutbutton/>
        </div>
    </div>
  )
}
export default Sidebar;